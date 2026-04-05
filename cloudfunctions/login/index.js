const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const DAILY_FREE = 2;
const DAILY_MAX = 5;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const openid = wxContext.OPENID;
  
  const today = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
  const todayStr = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
  
  try {
    const userRes = await db.collection('users').where({ openid }).get();
    
    if (userRes.data.length === 0) {
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
    
    // 日期变更 → 重置
    const last_reset = user.last_reset_date || '';
    if (last_reset !== todayStr) {
      await db.collection('users').where({ openid }).update({
        data: {
          free_times: DAILY_FREE,
          last_reset_date: todayStr,
          share_count_today: 0,
          updated_at: new Date()
        }
      });
      return {
        success: true,
        openid,
        free_times: DAILY_FREE,
        daily_max: DAILY_MAX,
        daily_free: DAILY_FREE,
        isNew: false
      };
    }
    
    // 同一天 → 返回当前值
    const currentFree = user.free_times !== undefined && user.free_times !== null ? user.free_times : DAILY_FREE;
    return {
      success: true,
      openid,
      free_times: currentFree,
      daily_max: DAILY_MAX,
      daily_free: DAILY_FREE,
      isNew: false
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
