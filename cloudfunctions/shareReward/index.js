const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  
  const openid = wxContext.OPENID;
  const DAILY_MAX = 5;
  const SHARE_BONUS = 1;
  
  try {
    const userRes = await db.collection('users').where({ openid }).get();
    if (userRes.data.length === 0) {
      return { success: false, error: 'User not found' };
    }
    
    const user = userRes.data[0];
    const current_times = user.free_times || 0;
    
    // 检查是否已达上限
    if (current_times >= DAILY_MAX) {
      return {
        success: true,
        free_times: current_times,
        message: '今日次数已达上限'
      };
    }
    
    // 增加次数
    const new_times = Math.min(current_times + SHARE_BONUS, DAILY_MAX);
    await db.collection('users').where({ openid }).update({
      data: {
        free_times: new_times,
        updated_at: new Date()
      }
    });
    
    return {
      success: true,
      free_times: new_times,
      bonus: new_times - current_times,
      message: '分享成功，获得' + (new_times - current_times) + '次测试机会'
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
