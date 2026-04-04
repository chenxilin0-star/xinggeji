const app = getApp();

Page({
  data: {
    openid: '',
    free_times: 5,
    total_times: 5,
    version: '1.0.0'
  },

  onLoad: function () {
    this.setData({
      openid: app.globalData.openid || '',
      free_times: app.globalData.free_times || 5
    });
  },

  onShow: function () {
    this.setData({
      openid: app.globalData.openid || '',
      free_times: app.globalData.free_times || 5
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
      title: '帮助与反馈',
      content: '1. 每个测试免费5次\n2. 测试完成后可以分享给好友\n3. 分享可获得额外测试次数\n4. 如有问题请联系客服',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  onShareAppMessage: function () {
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      path: '/pages/index/index',
      imageUrl: ''
    };
  }
});
