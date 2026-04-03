const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const { page = 1, pageSize = 10 } = event;
  
  try {
    const openid = wxContext.OPENID;
    
    // 获取用户信息
    const userRes = await db.collection('users').where({ openid }).get();
    const userInfo = userRes.data[0] || { free_times: 0 };
    
    // 获取测试记录
    const recordsRes = await db.collection('user_records')
      .where({ openid })
      .orderBy('completed_at', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    
    // 获取测试元数据用于显示名称
    const testsRes = await db.collection('tests').field({
      test_id: true,
      title: true,
      emoji: true
    }).get();
    
    const testsMap = {};
    testsRes.data.forEach(t => {
      testsMap[t.test_id] = t;
    });
    
    // 组合记录和测试信息
    const records = recordsRes.data.map(record => ({
      ...record,
      test_title: testsMap[record.test_id]?.title || record.test_id,
      test_emoji: testsMap[record.test_id]?.emoji || '📝'
    }));
    
    // 获取总数
    const countRes = await db.collection('user_records').where({ openid }).count();
    
    return {
      success: true,
      records,
      total: countRes.total,
      page,
      pageSize,
      free_times: userInfo.free_times,
      total_times: userInfo.total_times || 0
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
};
