const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    tests: [],
    loading: true
  },

  onLoad: function () {
    this.loginAndLoadTests();
  },

  onShow: function () {
    // 每次显示页面时刷新测试列表
    this.loadTests();
  },

  loginAndLoadTests: function () {
    wx.showLoading({ title: '加载中...' });
    
    // 调用login云函数
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        if (res.result.success) {
          app.globalData.openid = res.result.openid;
          app.globalData.free_times = res.result.free_times;
          this.loadTests();
        }
      },
      fail: err => {
        console.error('Login failed:', err);
        this.loadTests();
      }
    });
  },

  loadTests: function () {
    wx.cloud.callFunction({
      name: 'getTestList',
      success: res => {
        wx.hideLoading();
        if (res.result.success) {
          this.setData({
            tests: res.result.tests,
            loading: false
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('Load tests failed:', err);
        // 如果云函数失败，使用本地数据
        this.setData({
          tests: this.getLocalTests(),
          loading: false
        });
      }
    });
  },

  getLocalTests: function () {
    return [
      { test_id: 'mbti', title: 'MBTI人格测试', emoji: '🎭', description: '发现你的性格密码，了解真实的自己', question_count: 20 },
      { test_id: 'love_brain', title: '恋爱脑测试', emoji: '💕', description: '测试你在恋爱中的理性程度', question_count: 15 },
      { test_id: 'animal_persona', title: '性格动物测试', emoji: '🦁', description: '你是哪种动物性格？', question_count: 15 },
      { test_id: 'attachment_style', title: '恋爱依恋类型', emoji: '💞', description: '了解你的依恋风格和情感模式', question_count: 18 },
      { test_id: 'emotion_stress', title: '情绪压力自评', emoji: '🌊', description: '评估你的心理健康状态', question_count: 21 }
    ];
  },

  startTest: function (e) {
    const testId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/test/test?test_id=${testId}`
    });
  }
});
