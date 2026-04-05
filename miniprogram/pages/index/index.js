const app = getApp();

const LOCAL_TESTS = [
  { test_id: 'mbti', title: 'MBTI人格测试', emoji: '🎭', description: '发现你的性格密码，了解真实的自己', question_count: 20, tag: '十六型人格' },
  { test_id: 'love_brain', title: '恋爱脑测试', emoji: '💕', description: '测试你在恋爱中的理性程度', question_count: 15, tag: '爱情心理' },
  { test_id: 'animal_persona', title: '性格动物测试', emoji: '🦁', description: '你是哪种动物性格？狮子/孔雀/考拉/猫头鹰', question_count: 15, tag: '趣味性格' },
  { test_id: 'attachment_style', title: '恋爱依恋类型', emoji: '💞', description: '了解你的依恋风格和情感模式', question_count: 18, tag: '亲密关系' },
  { test_id: 'emotion_stress', title: '情绪压力自评', emoji: '🌊', description: '评估你的心理健康状态', question_count: 21, tag: '心理健康' }
];

Page({
  data: {
    tests: LOCAL_TESTS,
    free_times: 2,
    daily_max: 5,
    testColors: {
      mbti: '#F5A623',
      love_brain: '#FF6B9D',
      animal_persona: '#F2994A',
      attachment_style: '#9B59B6',
      emotion_stress: '#2D9CDB'
    }
  },

  onLoad: function () {
    this.setData({ free_times: app.globalData.free_times || 2 });
    this.silentLogin();
  },

  onShow: function () {
    this.setData({ free_times: app.globalData.free_times || 2 });
  },

  silentLogin: function () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        if (res.result && res.result.success) {
          app.globalData.openid = res.result.openid;
          app.updateFreeTimes(res.result.free_times);
          if (res.result.daily_max) app.globalData.daily_max = res.result.daily_max;
          this.setData({ 
            free_times: res.result.free_times,
            daily_max: res.result.daily_max || 5
          });
        }
      },
      fail: () => {}
    });
  },

  startTest: function (e) {
    const testId = e.currentTarget.dataset.id;
    const freeTimes = app.globalData.free_times || 0;
    
    if (freeTimes <= 0) {
      wx.showModal({
        title: '今日次数已用完',
        content: '每天2次免费测试机会\n分享给好友可获得+1次\n每天最多5次',
        confirmText: '去分享',
        cancelText: '知道了',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/share/share?from=unlock'
            });
          }
        }
      });
      return;
    }
    
    wx.navigateTo({
      url: `/pages/test/test?test_id=${testId}`
    });
  },

  onShareAppMessage: function () {
    // 分享成功后奖励+1次
    app.claimShareReward();
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      path: '/pages/index/index'
    };
  }
});
