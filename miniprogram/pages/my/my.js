const app = getApp();

Page({
  data: {
    openid: '',
    free_times: 2,
    daily_max: 5,
    version: '1.0.0'
  },

  onLoad: function () {
    const ft = app.globalData.free_times;
    this.setData({
      openid: app.globalData.openid || '',
      free_times: ft !== undefined && ft !== '' ? ft : 2,
      daily_max: app.globalData.daily_max || 5
    });
  },

  onShow: function () {
    const ft = app.globalData.free_times;
    this.setData({
      openid: app.globalData.openid || '',
      free_times: ft !== undefined && ft !== '' ? ft : 2,
      daily_max: app.globalData.daily_max || 5
    });
  },

  showAbout: function () {
    wx.showModal({
      title: '关于型格记',
      content: '型格记是一款专业的心理测试小程序，帮助你探索内心，发现真实的自己。\n\n支持MBTI人格测试、恋爱脑测试、性格动物测试、恋爱依恋类型、情绪压力自评等多种心理测试。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  showHelp: function () {
    wx.showModal({
      title: '使用说明',
      content: '✅ 每天免费2次测试机会\n📤 分享给好友/朋友圈 +1次\n📈 每天最多5次\n🔄 次数每天0点自动重置',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  onShareAppMessage: function () {
    app.claimShareReward();
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      path: '/pages/index/index'
    };
  }
});
