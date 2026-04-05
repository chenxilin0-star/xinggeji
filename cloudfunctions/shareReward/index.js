const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const DAILY_MAX = 5;
const SHARE_BONUS = 1;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const openid = wxContext.OPENID;
  
  try {
    const userRes = await db.collection('users').where({ openid }).get();
    
    if (userRes.data.length === 0) {
      return { success: false, error: 'User not found' };
    }
    
    const user = userRes.data[0];
    const current = user.free_times !== undefined && user.free_times !== null ? user.free_times : 0;
    
    if (current >= DAILY_MAX) {
      return {
        success: true,
        free_times: current,
        bonus: 0,
        message: '今日次数已达上限'
      };
    }
    
    const newTimes = Math.min(current + SHARE_BONUS, DAILY_MAX);
    
    await db.collection('users').where({ openid }).update({
      data: {
        free_times: newTimes,
        updated_at: new Date()
      }
    });
    
    return {
      success: true,
      free_times: newTimes,
      bonus: newTimes - current,
      message: '分享奖励+1次'
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
