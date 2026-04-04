Page({
  data: {
    testInfo: {
      mbti: {
        title: 'MBTI人格测试',
        keywords: ['MBTI测试', 'MBTI人格测试', '性格测试', '十六型人格', '人格测试', '职业性格测试', 'INFJ', 'INTJ', 'ENFP', 'ENTP', '免费MBTI测试', '在线MBTI测试', '性格分析', '自我认知'],
        description: 'MBTI是最受欢迎的性格测试之一，通过四个维度分析你的性格特征，帮助你了解真实的自己，适合职业规划和自我成长。'
      },
      love_brain: {
        title: '恋爱脑测试',
        keywords: ['恋爱脑测试', '恋爱脑检测', '爱情心理测试', '恋爱智商', '恋爱程度测试', '恋爱心理分析', '免费恋爱脑测试', '在线恋爱脑测试', '恋爱分析'],
        description: '测试你在恋爱中的理性程度，了解自己是否容易"恋爱脑"，帮助你建立健康的恋爱关系。'
      },
      animal_persona: {
        title: '性格动物测试',
        keywords: ['性格动物测试', '动物性格测试', '动物人格测试', '狮子型性格', '孔雀型性格', '考拉型性格', '猫头鹰型性格', '性格像什么动物', '动物人格分析'],
        description: '通过动物性格分类，快速了解你的性格特点，狮子型代表领导力，孔雀型代表魅力，考拉型代表温和，猫头鹰型代表智慧。'
      },
      attachment_style: {
        title: '恋爱依恋类型',
        keywords: ['恋爱依恋类型', '依恋风格测试', '依恋类型测试', '安全型依恋', '焦虑型依恋', '回避型依恋', '恐惧型依恋', '情感模式分析', '恋爱心理测试'],
        description: '了解你在亲密关系中的依恋风格，认识自己的情感模式，有助于建立更健康的恋爱关系。'
      },
      emotion_stress: {
        title: '情绪压力自评',
        keywords: ['情绪压力测试', '心理压力测试', '焦虑测试', '抑郁测试', '抑郁自评', '心理健康测试', '情绪管理', '压力指数', '心理亚健康', '免费心理健康测试'],
        description: '专业心理测评量表，帮助你评估当前的心理健康状态，了解自己的情绪和压力水平，及时调整身心状态。'
      }
    }
  },

  onLoad: function (options) {
    // 设置页面标题
    if (options.test_id) {
      const info = this.data.testInfo[options.test_id];
      if (info) {
        wx.setNavigationBarTitle({ title: info.title });
      }
    }
  },

  goToTest: function (e) {
    const testId = e.currentTarget.dataset.id;
    if (testId) {
      wx.navigateTo({
        url: `/pages/test/test?test_id=${testId}`
      });
    }
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '型格记 - 免费在线心理测试',
      path: '/pages/seo/seo',
      imageUrl: ''
    };
  }
});
