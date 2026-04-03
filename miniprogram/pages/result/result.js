const app = getApp();

Page({
  data: {
    testId: '',
    resultData: {},
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    },
    testEmojis: {
      mbti: '🎭',
      love_brain: '💕',
      animal_persona: '🦁',
      attachment_style: '💞',
      emotion_stress: '🌊'
    }
  },

  onLoad: function (options) {
    const { test_id, result_data } = options;
    if (result_data) {
      try {
        const resultData = JSON.parse(decodeURIComponent(result_data));
        this.setData({
          testId: test_id,
          resultData
        });
      } catch (e) {
        console.error('Parse result data failed:', e);
        wx.showToast({ title: '数据解析失败', icon: 'none' });
        wx.navigateBack();
      }
    } else {
      wx.navigateBack();
    }
  },

  shareResult: function () {
    const { testId, resultData } = this.data;
    const title = this.data.testTitles[testId] || '心理测试';
    const result = resultData.result;
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage: function () {
    const { testId, resultData } = this.data;
    const title = this.data.testTitles[testId] || '心理测试';
    const result = resultData.result;
    
    return {
      title: `我在${title}中测出了${result.type_name}，你也来试试吧！`,
      path: `/pages/index/index`,
      imageUrl: ''
    };
  },

  retakeTest: function () {
    wx.navigateBack();
  },

  backToHome: function () {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
