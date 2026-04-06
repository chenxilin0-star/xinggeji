const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const { test_id, answers, scores, result } = event;
  
  if (!test_id || !answers || !Array.isArray(answers)) {
    return { success: false, error: '参数错误' };
  }
  
  const openid = wxContext.OPENID;
  
  try {
    // 1. 查用户
    const userRes = await db.collection('users').where({ openid }).get();
    
    let user;
    if (userRes.data.length === 0) {
      // 自动创建用户
      const today = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
      const todayStr = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
      await db.collection('users').add({
        data: {
          openid,
          free_times: 2,
          last_reset_date: todayStr,
          created_at: new Date(),
          updated_at: new Date()
        }
      });
      user = { free_times: 2 };
    } else {
      user = userRes.data[0];
    }
    
    const currentFree = user.free_times !== undefined && user.free_times !== null ? user.free_times : 2;
    
    if (currentFree <= 0) {
      return { success: false, error: '今日次数已用完，分享给好友可+1次' };
    }
    
    // 2. 先扣减次数（最重要，必须在保存记录之前）
    await db.collection('users').where({ openid }).update({
      data: {
        free_times: db.command.inc(-1),
        updated_at: new Date()
      }
    });
    
    // 3. 尝试保存记录（失败不影响次数扣减）
    try {
      const recordData = {
        openid,
        test_id,
        answers,
        completed_at: new Date()
      };
      // 如果前端传了 scores 和 result，一并保存
      if (scores) recordData.scores = scores;
      if (result) recordData.result = result;
      
      await db.collection('user_records').add({ data: recordData });
    } catch (recordErr) {
      console.error('Save record failed:', recordErr);
    }
    
    return {
      success: true,
      remaining_times: currentFree - 1
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
