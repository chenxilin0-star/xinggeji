// 云端数据库初始化脚本
// 在微信开发者工具的云开发控制台中运行此脚本
// 或上传为云函数 initDatabase 后调用一次

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const tests = [
    {
      test_id: 'mbti',
      title: 'MBTI人格测试',
      emoji: '🎭',
      description: '发现你的性格密码，了解真实的自己',
      question_count: 20,
      tag: '十六型人格',
      color: '#F5A623',
      dimensions: ['外向(E)/内向(I)', '实感(S)/直觉(N)', '理性(T)/情感(F)', '判断(J)/感知(P)']
    },
    {
      test_id: 'love_brain',
      title: '恋爱脑测试',
      emoji: '💕',
      description: '测试你在恋爱中的理性程度',
      question_count: 15,
      tag: '爱情心理',
      color: '#FF6B9D',
      dimensions: ['沉没成本', '理想化', '情绪依赖', '失去理性']
    },
    {
      test_id: 'animal_persona',
      title: '性格动物测试',
      emoji: '🦁',
      description: '你是哪种动物性格？狮子/孔雀/考拉/猫头鹰',
      question_count: 15,
      tag: '趣味性格',
      color: '#F2994A',
      dimensions: ['狮子型', '孔雀型', '考拉型', '猫头鹰型']
    },
    {
      test_id: 'attachment_style',
      title: '恋爱依恋类型',
      emoji: '💞',
      description: '了解你的依恋风格和情感模式',
      question_count: 18,
      tag: '亲密关系',
      color: '#9B59B6',
      dimensions: ['焦虑程度', '回避程度']
    },
    {
      test_id: 'emotion_stress',
      title: '情绪压力自评',
      emoji: '🌊',
      description: '评估你的心理健康状态',
      question_count: 21,
      tag: '心理健康',
      color: '#2D9CDB',
      dimensions: ['抑郁', '焦虑', '压力']
    }
  ];

  const results = [];
  for (const test of tests) {
    // 检查是否已存在
    const existing = await db.collection('tests').where({ test_id: test.test_id }).count();
    if (existing.total > 0) {
      // 更新
      const doc = await db.collection('tests').where({ test_id: test.test_id }).get();
      if (doc.data.length > 0) {
        await db.collection('tests').doc(doc.data[0]._id).update({ data: test });
        results.push({ test_id: test.test_id, action: 'updated' });
      }
    } else {
      // 新增
      await db.collection('tests').add({ data: test });
      results.push({ test_id: test.test_id, action: 'created' });
    }
  }

  return { success: true, results };
};
