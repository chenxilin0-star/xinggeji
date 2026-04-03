/**
 * 数据库初始化脚本
 * 运行方式：在微信开发者工具中打开云开发控制台，导入此JSON数据
 */

// tests集合数据
const testsData = [
  {
    test_id: 'mbti',
    title: 'MBTI人格测试',
    emoji: '🎭',
    description: '发现你的性格密码，了解真实的自己',
    question_count: 20,
    dimensions: {
      EI: '内外向',
      SN: '感觉直觉',
      TF: '思考情感',
      JP: '判断知觉'
    },
    radar_config: {
      label: ['E-I', 'S-N', 'T-F', 'J-P'],
      color: '#6C5CE7'
    }
  },
  {
    test_id: 'love_brain',
    title: '恋爱脑测试',
    emoji: '💕',
    description: '测试你在恋爱中的理性程度',
    question_count: 15,
    dimensions: {
      sunk_cost: '沉没成本',
      idealization: '理想化',
      emotional_dependency: '情绪依赖',
      irrational: '失去理性'
    },
    radar_config: {
      label: ['沉没成本', '理想化', '情绪依赖', '失去理性'],
      color: '#fd79a8'
    }
  },
  {
    test_id: 'animal_persona',
    title: '性格动物测试',
    emoji: '🦁',
    description: '你是哪种动物性格？',
    question_count: 15,
    dimensions: {
      lion: '狮子型',
      peacock: '孔雀型',
      koala: '考拉型',
      owl: '猫头鹰型'
    },
    radar_config: {
      label: ['狮子', '孔雀', '考拉', '猫头鹰'],
      color: '#00b894'
    }
  },
  {
    test_id: 'attachment_style',
    title: '恋爱依恋类型',
    emoji: '💞',
    description: '了解你的依恋风格和情感模式',
    question_count: 18,
    dimensions: {
      anxiety: '焦虑程度',
      avoidance: '回避程度'
    },
    radar_config: {
      label: ['焦虑', '回避'],
      color: '#e17055'
    }
  },
  {
    test_id: 'emotion_stress',
    title: '情绪压力自评',
    emoji: '🌊',
    description: '评估你的心理健康状态',
    question_count: 21,
    dimensions: {
      depression: '抑郁',
      anxiety: '焦虑',
      stress: '压力'
    },
    radar_config: {
      label: ['抑郁', '焦虑', '压力'],
      color: '#0984e3'
    }
  }
];

console.log('请在云开发控制台中手动创建以下集合并导入数据：');
console.log('1. tests - 测试元数据');
console.log('2. questions - 题目数据');
console.log('3. results - 结果类型');
console.log('4. user_records - 用户记录');
console.log('5. users - 用户信息');

console.log('\ntests集合数据：');
console.log(JSON.stringify(testsData, null, 2));
