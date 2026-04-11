const app = getApp();

Page({
  data: {
    modeLabel: '',
    typeData: null,
    matchInfo: null,
    dimensions: [],
    loading: true,
    isDrunk: false
  },

  onLoad: function (options) {
    const { result_data } = options;
    if (!result_data) {
      wx.navigateBack();
      return;
    }
    try {
      const data = JSON.parse(decodeURIComponent(result_data));
      this.setData({
        modeLabel: data.modeLabel || '你的主类型',
        typeData: data.typeData || {},
        matchInfo: data.matchInfo || { similarity: 0, exact: 0 },
        dimensions: data.dimensions || [],
        isDrunk: data.isDrunk || false,
        loading: false
      });

      var title = (data.typeData && data.typeData.code) + ' - ' + (data.typeData && data.typeData.cn);
      wx.setNavigationBarTitle({ title: title + ' | SBTI测试结果' });
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#2ECC71',
        animation: { duration: 300, timingFunc: 'easeIn' }
      });
    } catch (e) {
      console.error('Parse SBTI result failed:', e);
      wx.showToast({ title: '数据解析失败', icon: 'none' });
      wx.navigateBack();
    }
  },

  onShareAppMessage: function () {
    var td = this.data.typeData || {};
    return {
      title: '我是' + (td.code || '') + '（' + (td.cn || '') + '）！SBTI人格测试，比MBTI更有趣！',
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function () {
    var td = this.data.typeData || {};
    return {
      title: '我是' + (td.code || '') + '（' + (td.cn || '') + '）！SBTI人格测试',
      query: ''
    };
  },

  retakeTest: function () {
    var ft = app.globalData.free_times;
    var freeTimes = ft !== undefined ? ft : 2;
    if (freeTimes <= 0) {
      wx.showModal({
        title: '今日次数已用完',
        content: '每天2次免费测试机会\n分享给好友可获得+1次\n每天最多5次',
        confirmText: '去分享',
        cancelText: '知道了',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/share/share?from=unlock' });
          }
        }
      });
      return;
    }
    wx.redirectTo({ url: '/pages/test/test?test_id=sbti' });
  },

  backToHome: function () {
    wx.switchTab({ url: '/pages/index/index' });
  },

  generatePoster: function () {
    var td = this.data.typeData || {};
    var resultData = {
      test_id: 'sbti',
      result: {
        resultCode: td.code || '',
        type_name: td.cn || '',
        emoji: '🔥',
        description: td.intro || ''
      }
    };
    wx.navigateTo({
      url: '/pages/share/share?test_id=sbti&result_data=' + encodeURIComponent(JSON.stringify(resultData))
    });
  }
});
