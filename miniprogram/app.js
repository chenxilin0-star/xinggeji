App({
  globalData: {
    openid: '',
    free_times: 5,
    total_times: 5,
    env: 'your-env-id' // 需要替换为实际的云开发环境ID
  },

  onLaunch: function () {
    // 初始化云开发
    wx.cloud.init({
      env: this.globalData.env,
      traceUser: true
    });
    
    // 尝试获取本地存储的用户数据
    try {
      const openid = wx.getStorageSync('openid');
      const free_times = wx.getStorageSync('free_times');
      if (openid) this.globalData.openid = openid;
      if (free_times) this.globalData.free_times = free_times;
    } catch (e) {}
  },

  // 更新全局次数
  updateFreeTimes: function (times) {
    this.globalData.free_times = times;
    try {
      wx.setStorageSync('free_times', times);
    } catch (e) {}
  }
});
