const app = getApp();

Page({
  data: {
    tests: [],
    loading: true,
    testColors: {
      mbti: '#F5A623',
      love_brain: '#FF6B9D',
      animal_persona: '#F2994A',
      attachment_style: '#9B59B6',
      emotion_stress: '#2D9CDB'
    }
  },

  onLoad: function () {
    this.loginAndLoadTests();
  },

  onShow: function () {
    // 只刷新次数，不重新加载测试列表
    this.setData({ free_times: app.globalData.free_times || 5 });
  },

  loginAndLoadTests: function () {
    // 先用本地数据渲染，再尝试云端
    this.setData({
      tests: this.getLocalTests(),
      loading: false
    });

    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        if (res.result.success) {
          app.globalData.openid = res.result.openid;
          app.globalData.free_times = res.result.free_times;
          this.setData({ free_times: res.result.free_times });
        }
        this.loadTestsFromCloud();
      },
      fail: err => {
        console.error('Login failed:', err);
      }
    });
  },

  loadTestsFromCloud: function () {
    wx.cloud.callFunction({
      name: 'getTestList',
      success: res => {
        if (res.result.success && res.result.tests && res.result.tests.length > 0) {
          this.setData({ tests: res.result.tests });
        }
      },
      fail: err => {
        console.error('Load tests failed:', err);
      }
    });
  },

  getLocalTests: function () {
    return [
      { test_id: 'mbti', title: 'MBTI人格测试', emoji: '🎭', description: '发现你的性格密码，了解真实的自己', question_count: 20, tag: '十六型人格' },
      { test_id: 'love_brain', title: '恋爱脑测试', emoji: '💕', description: '测试你在恋爱中的理性程度', question_count: 15, tag: '爱情心理' },
      { test_id: 'animal_persona', title: '性格动物测试', emoji: '🦁', description: '你是哪种动物性格？狮子/孔雀/考拉/猫头鹰', question_count: 15, tag: '趣味性格' },
      { test_id: 'attachment_style', title: '恋爱依恋类型', emoji: '💞', description: '了解你的依恋风格和情感模式', question_count: 18, tag: '亲密关系' },
      { test_id: 'emotion_stress', title: '情绪压力自评', emoji: '🌊', description: '评估你的心理健康状态', question_count: 21, tag: '心理健康' }
    ];
  },

  startTest: function (e) {
    const testId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/test/test?test_id=${testId}`
    });
  }
});
