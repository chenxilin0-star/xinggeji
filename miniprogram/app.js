App({
  globalData: {
    openid: '',
    free_times: 2,
    daily_max: 5,
    daily_free: 2,
    env: 'cloudbase-0gfz6a1mf0af3d53'
  },

  onLaunch: function () {
    wx.cloud.init({
      env: this.globalData.env,
      traceUser: true
    });
    
    // 读取本地缓存
    try {
      const openid = wx.getStorageSync('openid');
      const free_times = wx.getStorageSync('free_times');
      if (openid) this.globalData.openid = openid;
      if (free_times !== '' && free_times !== undefined) this.globalData.free_times = free_times;
    } catch (e) {}
  },

  // 更新全局次数并缓存
  updateFreeTimes: function (times) {
    this.globalData.free_times = times;
    try { wx.setStorageSync('free_times', times); } catch (e) {}
  },

  // 分享奖励：调用云函数+1次
  claimShareReward: function () {
    wx.cloud.callFunction({
      name: 'shareReward',
      success: res => {
        if (res.result && res.result.success) {
          const newTimes = res.result.free_times;
          this.updateFreeTimes(newTimes);
          
          if (res.result.bonus > 0) {
            wx.showToast({
              title: '分享奖励+1次',
              icon: 'success',
              duration: 2000
            });
          } else {
            wx.showToast({
              title: '今日已达上限',
              icon: 'none',
              duration: 1500
            });
          }
        }
      },
      fail: () => {
        // 静默失败，不打扰用户
      }
    });
  }
});
