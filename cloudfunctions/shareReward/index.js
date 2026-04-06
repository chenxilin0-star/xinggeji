const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const DAILY_MAX = 5;
const DAILY_FREE = 2;
const SHARE_BONUS = 1;
const MAX_SHARE_PER_DAY = 3; // 每天最多通过分享获得3次（2免费+3分享=5上限）

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const openid = wxContext.OPENID;
  
  // 计算今天日期字符串（UTC+8）
  const today = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
  const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  
  try {
    const userRes = await db.collection('users').where({ openid }).get();
    
    if (userRes.data.length === 0) {
      return { success: false, error: 'User not found' };
    }
    
    const user = userRes.data[0];
    const current = user.free_times !== undefined && user.free_times !== null ? user.free_times : 0;
    
    // 检查是否已达每日上限
    if (current >= DAILY_MAX) {
      return {
        success: true,
        free_times: current,
        bonus: 0,
        message: '今日次数已达上限'
      };
    }
    
    // 检查今日分享次数
    const lastReset = user.last_reset_date || '';
    let shareCountToday = 0;
    
    if (lastReset === todayStr) {
      // 同一天，用已有的分享计数
      shareCountToday = user.share_count_today || 0;
    }
    // 如果日期不同，shareCountToday 保持 0（login 云函数会在日期变更时重置）
    
    if (shareCountToday >= MAX_SHARE_PER_DAY) {
      return {
        success: true,
        free_times: current,
        bonus: 0,
        message: '今日分享奖励已领完'
      };
    }
    
    // 发放奖励
    const newTimes = Math.min(current + SHARE_BONUS, DAILY_MAX);
    const newShareCount = shareCountToday + 1;
    
    await db.collection('users').where({ openid }).update({
      data: {
        free_times: newTimes,
        share_count_today: newShareCount,
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
