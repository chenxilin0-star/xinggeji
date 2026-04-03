const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const db = cloud.database();
  
  try {
    const testsRes = await db.collection('tests').field({
      _id: true,
      test_id: true,
      title: true,
      emoji: true,
      description: true,
      question_count: true,
      dimensions: true
    }).get();
    
    return {
      success: true,
      tests: testsRes.data
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
};
