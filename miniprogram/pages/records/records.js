const app = getApp();

Page({
  data: {
    records: [],
    loading: true,
    page: 1,
    pageSize: 10,
    hasMore: true,
    free_times: 5
  },

  onLoad: function () {
    this.loadRecords();
  },

  onShow: function () {
    this.refreshRecords();
  },

  onReachBottom: function () {
    if (this.data.hasMore) {
      this.loadMoreRecords();
    }
  },

  loadRecords: function () {
    wx.showLoading({ title: '加载中...' });
    
    wx.cloud.callFunction({
      name: 'getMyRecords',
      data: { page: this.data.page, pageSize: this.data.pageSize },
      success: res => {
        wx.hideLoading();
        if (res.result.success) {
          this.setData({
            records: res.result.records,
            hasMore: this.data.page * this.data.pageSize < res.result.total,
            free_times: res.result.free_times,
            loading: false
          });
        } else {
          this.loadLocalRecords();
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('Load records failed:', err);
        this.loadLocalRecords();
      }
    });
  },

  loadMoreRecords: function () {
    const page = this.data.page + 1;
    wx.cloud.callFunction({
      name: 'getMyRecords',
      data: { page, pageSize: this.data.pageSize },
      success: res => {
        if (res.result.success) {
          this.setData({
            records: [...this.data.records, ...res.result.records],
            page,
            hasMore: page * this.data.pageSize < res.result.total
          });
        }
      }
    });
  },

  refreshRecords: function () {
    this.setData({ page: 1, records: [] });
    this.loadRecords();
  },

  loadLocalRecords: function () {
    // 本地记录（示例数据）
    const localRecords = [
      { _id: '1', test_id: 'mbti', test_title: 'MBTI人格测试', test_emoji: '🎭', result: { type_name: 'INTJ', emoji: '🏗️' }, completed_at: new Date() },
      { _id: '2', test_id: 'love_brain', test_title: '恋爱脑测试', test_emoji: '💕', result: { type_name: '轻度恋爱脑', emoji: '💭' }, completed_at: new Date() }
    ];
    this.setData({
      records: localRecords,
      hasMore: false,
      loading: false
    });
  },

  viewRecord: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.showToast({ title: '查看报告功能开发中', icon: 'none' });
  }
});
