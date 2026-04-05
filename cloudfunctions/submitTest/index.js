const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const { test_id, answers } = event;
  
  if (!test_id || !answers || !Array.isArray(answers)) {
    return { success: false, error: '参数错误' };
  }
  
  const openid = wxContext.OPENID;
  
  try {
    // 检查用户次数
    const userRes = await db.collection('users').where({ openid }).get();
    
    // 用户不存在则自动创建
    let user;
    if (userRes.data.length === 0) {
      const today = new Date();
      const todayStr = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
      await db.collection('users').add({
        data: {
          openid,
          free_times: 2,
          last_reset_date: todayStr,
          share_count_today: 0,
          created_at: new Date(),
          updated_at: new Date()
        }
      });
      user = { free_times: 2 };
    } else {
      user = userRes.data[0];
    }
    
    if (user.free_times <= 0) {
      return { success: false, error: '今日次数已用完，分享给好友可+1次' };
    }
    
    // 保存记录（前端已计算好分数和结果，直接存储）
    const record = {
      openid,
      test_id,
      answers,
      completed_at: new Date()
    };
    
    await db.collection('user_records').add({ data: record });
    
    // 扣减次数
    await db.collection('users').where({ openid }).update({
      data: {
        free_times: db.command.inc(-1),
        updated_at: new Date()
      }
    });
    
    return {
      success: true,
      remaining_times: user.free_times - 1
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
