const app = getApp();

Page({
  data: {
    userInfo: null,
    free_times: 5,
    total_times: 5
  },

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      free_times: app.globalData.free_times || 5,
      total_times: app.globalData.total_times || 5
    });
  },

  onShow: function () {
    // 每次显示页面时刷新用户信息
    this.refreshUserInfo();
  },

  refreshUserInfo: function () {
    const that = this;
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        if (res.result.success) {
          app.globalData.openid = res.result.openid;
          app.globalData.free_times = res.result.free_times;
          that.setData({
            free_times: res.result.free_times,
            total_times: res.result.total_times
          });
        }
      }
    });
  },

  onShareAppMessage: function () {
    return {
      title: '型格记 - 发现真实的自己',
      path: '/pages/index/index',
      imageUrl: ''
    };
  }
});
