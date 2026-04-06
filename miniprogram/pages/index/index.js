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
    showShareSheet: false,
    testColors: {
      mbti: '#F5A623',
      love_brain: '#FF6B9D',
      animal_persona: '#F2994A',
      attachment_style: '#9B59B6',
      emotion_stress: '#2D9CDB'
    }
  },

  onLoad: function () {
    const ft = app.globalData.free_times;
    this.setData({ free_times: ft !== undefined && ft !== '' ? ft : 2 });
    this.silentLogin();
  },

  onShow: function () {
    const ft = app.globalData.free_times;
    this.setData({ free_times: ft !== undefined && ft !== '' ? ft : 2 });
  },

  silentLogin: function () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        if (res.result && res.result.success) {
          app.globalData.openid = res.result.openid;
          // 如果login返回了daily_free说明是新版本云函数
          const isNewLogic = res.result.daily_free !== undefined;
          const freeTimes = isNewLogic ? res.result.free_times : 2; // 旧版云函数默认给2次
          app.updateFreeTimes(freeTimes);
          if (res.result.daily_max) app.globalData.daily_max = res.result.daily_max;
          this.setData({ 
            free_times: freeTimes,
            daily_max: res.result.daily_max || 5
          });
        }
      },
      fail: () => {}
    });
  },

  startTest: function (e) {
    const testId = e.currentTarget.dataset.id;
    // 优先用页面data中的次数（login云函数返回的），其次用全局缓存，最后默认2
    const freeTimes = this.data.free_times !== undefined ? this.data.free_times : (app.globalData.free_times !== undefined ? app.globalData.free_times : 2);
    
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
    // 分享后显示领取浮层
    this.setData({ showShareSheet: true });
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function () {
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      query: ''
    };
  },

  // 主动分享赚次数
  shareForTimes: function () {
    const ft = app.globalData.free_times;
    const freeTimes = ft !== undefined ? ft : 2;
    if (freeTimes >= 5) {
      wx.showToast({ title: '今日已达上限', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '分享赚次数',
      content: '分享给好友后，点击"已分享，领取奖励"按钮获得+1次测试机会',
      confirmText: '去分享',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          // 触发微信分享
          this.setData({ showShareSheet: true });
        }
      }
    });
  },

  // 分享完成后领取奖励
  claimReward: function () {
    wx.showLoading({ title: '领取中...' });
    wx.cloud.callFunction({
      name: 'shareReward',
      success: res => {
        wx.hideLoading();
        console.log('shareReward result:', JSON.stringify(res.result));
        if (res.result && res.result.success) {
          const newTimes = res.result.free_times;
          app.updateFreeTimes(newTimes);
          this.setData({ free_times: newTimes, showShareSheet: false });
          if (res.result.bonus && res.result.bonus > 0) {
            wx.showToast({ title: '奖励+1次！', icon: 'success' });
          } else {
            wx.showToast({ title: '今日已达上限', icon: 'none' });
          }
        } else {
          // 云函数返回失败 → 本地+1（信任用户已分享）
          console.warn('shareReward failed:', res.result);
          const ft = app.globalData.free_times;
          const current = ft !== undefined ? ft : 2;
          if (current < 5) {
            app.updateFreeTimes(current + 1);
            this.setData({ free_times: current + 1, showShareSheet: false });
            wx.showToast({ title: '奖励+1次！', icon: 'success' });
          } else {
            this.setData({ showShareSheet: false });
            wx.showToast({ title: '今日已达上限', icon: 'none' });
          }
        }
      },
      fail: () => {
        wx.hideLoading();
        // 云函数调用失败 → 本地+1（信任用户）
        const ft = app.globalData.free_times;
        const current = ft !== undefined ? ft : 2;
        if (current < 5) {
          app.updateFreeTimes(current + 1);
          this.setData({ free_times: current + 1, showShareSheet: false });
          wx.showToast({ title: '奖励+1次！', icon: 'success' });
        } else {
          this.setData({ showShareSheet: false });
          wx.showToast({ title: '今日已达上限', icon: 'none' });
        }
      }
    });
  }
});
