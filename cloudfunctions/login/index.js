const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const _ = db.command;
  
  const openid = wxContext.OPENID;
  const today = new Date();
  const todayStr = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
  
  const DAILY_FREE = 2;   // 每天免费次数
  const DAILY_MAX = 5;    // 每天上限
  const SHARE_BONUS = 1;  // 每次分享奖励
  
  try {
    const userRes = await db.collection('users').where({ openid }).get();
    
    if (userRes.data.length === 0) {
      // 新用户
      await db.collection('users').add({
        data: {
          openid,
          free_times: DAILY_FREE,
          last_reset_date: todayStr,
          share_count_today: 0,
          created_at: new Date(),
          updated_at: new Date()
        }
      });
      return {
        success: true,
        openid,
        free_times: DAILY_FREE,
        daily_max: DAILY_MAX,
        daily_free: DAILY_FREE,
        isNew: true
      };
    }
    
    const user = userRes.data[0];
    let free_times = user.free_times || 0;
    const last_reset = user.last_reset_date || '';
    
    // 日期变更 → 重置每日次数
    if (last_reset !== todayStr) {
      free_times = DAILY_FREE;
      await db.collection('users').where({ openid }).update({
        data: {
          free_times: DAILY_FREE,
          last_reset_date: todayStr,
          share_count_today: 0,
          updated_at: new Date()
        }
      });
    }
    
    return {
      success: true,
      openid,
      free_times: free_times,
      daily_max: DAILY_MAX,
      daily_free: DAILY_FREE,
      isNew: false
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
};
