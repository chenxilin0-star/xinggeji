const app = getApp();

Page({
  data: {
    scores: {},
    depression: 0, anxiety: 0, stress: 0,
    depLevel: '', anxLevel: '', strLevel: '',
    depColor: '', anxColor: '', strColor: '',
    totalScore: 0,
    overallLevel: '',
    overallEmoji: '',
    overallColor: '',
    bars: [],
    loading: true
  },

  onLoad: function (options) {
    const { result_data } = options;
    if (!result_data) { wx.navigateBack(); return; }
    try {
      const resultData = JSON.parse(decodeURIComponent(result_data));
      const scores = resultData.scores || {};
      const depression = scores.depression || 0;
      const anxiety = scores.anxiety || 0;
      const stress = scores.stress || 0;
      const totalScore = depression + anxiety + stress;

      // DASS-21 分级标准（每维度0-21）
      const getLevel = (score) => {
        if (score <= 7) return { level: '正常', color: '#2ECC71', emoji: '🟢' };
        if (score <= 14) return { level: '轻度', color: '#F39C12', emoji: '🟡' };
        if (score <= 21) return { level: '中度', color: '#E67E22', emoji: '🟠' };
        return { level: '重度', color: '#E74C3C', emoji: '🔴' };
      };

      const dep = getLevel(depression);
      const anx = getLevel(anxiety);
      const str = getLevel(stress);

      // 综合评估
      let overallLevel = '正常', overallEmoji = '😊', overallColor = '#2ECC71';
      if (totalScore >= 42) { overallLevel = '需要关注'; overallEmoji = '😢'; overallColor = '#E74C3C'; }
      else if (totalScore >= 28) { overallLevel = '中度困扰'; overallEmoji = '😟'; overallColor = '#E67E22'; }
      else if (totalScore >= 14) { overallLevel = '轻度困扰'; overallEmoji = '😌'; overallColor = '#F39C12'; }

      // 柱状图数据（CSS渲染，这里计算百分比高度）
      const maxScore = 21;
      const bars = [
        { name: '抑郁', score: depression, max: maxScore, percent: Math.round(depression / maxScore * 100), level: dep.level, color: dep.color, emoji: dep.emoji },
        { name: '焦虑', score: anxiety, max: maxScore, percent: Math.round(anxiety / maxScore * 100), level: anx.level, color: anx.color, emoji: anx.emoji },
        { name: '压力', score: stress, max: maxScore, percent: Math.round(stress / maxScore * 100), level: str.level, color: str.color, emoji: str.emoji }
      ];

      this.setData({
        scores, depression, anxiety, stress, totalScore,
        depLevel: dep.level, depColor: dep.color,
        anxLevel: anx.level, anxColor: anx.color,
        strLevel: str.level, strColor: str.color,
        overallLevel, overallEmoji, overallColor,
        bars, loading: false
      });

      // 设置导航栏颜色为蓝色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#2D9CDB',
        animation: { duration: 300, timingFunc: 'easeIn' }
      });
    } catch (e) {
      console.error('Parse failed:', e);
      wx.navigateBack();
    }
  },

  onShareAppMessage: function () {
    return {
      title: `我的心理健康评估：${this.data.overallLevel}，你也来关注自己的心理健康吧！`,
      path: '/pages/index/index'
    };
  },

  retakeTest: function () {
    const app = getApp();
    const ft = app.globalData.free_times;
    const freeTimes = ft !== undefined ? ft : 2;
    if (freeTimes <= 0) {
      wx.showModal({
        title: '今日次数已用完',
        content: '每天2次免费测试机会\n分享给好友可获得+1次\n每天最多5次',
        confirmText: '去分享',
        cancelText: '知道了',
        success: res => { if (res.confirm) wx.navigateTo({ url: '/pages/share/share?from=unlock' }); }
      });
      return;
    }
    wx.redirectTo({ url: '/pages/test/test?test_id=emotion_stress' });
  },
  backToHome: function () { wx.switchTab({ url: '/pages/index/index' }); },

  generatePoster: function () {
    const resultData = {
      test_id: 'emotion_stress',
      result: { type_name: this.data.overallLevel, emoji: this.data.overallEmoji, description: '综合指数' + this.data.totalScore + '/63' }
    };
    wx.navigateTo({
      url: `/pages/share/share?test_id=emotion_stress&result_data=${encodeURIComponent(JSON.stringify(resultData))}`
    });
  }
});
