const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  
  try {
    // 获取用户openid
    const openid = wxContext.OPENID;
    
    // 查询用户是否已存在
    const userRes = await db.collection('users').where({ openid }).get();
    
    if (userRes.data.length === 0) {
      // 新用户，创建记录
      await db.collection('users').add({
        data: {
          openid,
          free_times: 5, // 初始免费次数
          total_times: 5,
          created_at: new Date(),
          updated_at: new Date()
        }
      });
      return {
        success: true,
        openid,
        free_times: 5,
        isNew: true
      };
    } else {
      // 老用户
      return {
        success: true,
        openid,
        free_times: userRes.data[0].free_times,
        total_times: userRes.data[0].total_times,
        isNew: false
      };
    }
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
};
