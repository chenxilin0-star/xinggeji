const app = getApp();

Page({
  data: {
    records: [],
    loading: true,
    free_times: 5,
    testEmojis: {
      mbti: '🎭',
      love_brain: '💕',
      animal_persona: '🦁',
      attachment_style: '💞',
      emotion_stress: '🌊'
    },
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    }
  },

  onLoad: function () {
    this.setData({ free_times: app.globalData.free_times || 5 });
  },

  onShow: function () {
    this.loadRecords();
  },

  loadRecords: function () {
    this.setData({ loading: true });
    
    wx.cloud.callFunction({
      name: 'getMyRecords',
      success: res => {
        if (res.result && res.result.success) {
          this.setData({
            records: res.result.records || [],
            loading: false
          });
        } else {
          // 使用本地记录
          this.setData({
            records: this.getLocalRecords(),
            loading: false
          });
        }
      },
      fail: err => {
        console.error('Load records failed:', err);
        this.setData({
          records: this.getLocalRecords(),
          loading: false
        });
      }
    });
  },

  // 获取本地记录（当云端不可用时）
  getLocalRecords: function () {
    try {
      const localRecords = wx.getStorageSync('local_records') || [];
      return localRecords.map(r => ({
        ...r,
        completed_at: r.completed_at || '刚刚'
      }));
    } catch (e) {
      return [];
    }
  },

  viewRecord: function (e) {
    const { id } = e.currentTarget.dataset;
    const record = this.data.records.find(r => r._id === id);
    
    if (record) {
      wx.navigateTo({
        url: `/pages/result/result?test_id=${record.test_id}&result_data=${encodeURIComponent(JSON.stringify(record))}&from_record=true`
      });
    }
  },

  // 删除记录
  deleteRecord: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: res => {
        if (res.confirm) {
          this.doDeleteRecord(id);
        }
      }
    });
  },

  doDeleteRecord: function (id) {
    // 如果是本地记录，从本地存储删除
    const records = this.data.records.filter(r => r._id !== id);
    this.setData({ records });
    
    try {
      wx.setStorageSync('local_records', records);
    } catch (e) {}
    
    wx.showToast({ title: '已删除', icon: 'success' });
  }
});
