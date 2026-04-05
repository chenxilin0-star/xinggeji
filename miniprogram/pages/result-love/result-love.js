const app = getApp();

Page({
  data: {
    resultData: {},
    scores: {},
    totalScore: 0,
    maxScore: 15,
    percent: 0,
    level: '',
    levelEmoji: '',
    loveTag: '',
    dimensions: [],
    loading: true
  },

  onLoad: function (options) {
    const { result_data } = options;
    if (!result_data) { wx.navigateBack(); return; }
    try {
      const resultData = JSON.parse(decodeURIComponent(result_data));
      const scores = resultData.scores || {};
      const total = (scores.sunk_cost || 0) + (scores.idealization || 0) + (scores.emotional_dependency || 0) + (scores.irrational || 0);
      const percent = Math.round((total / 15) * 100);

      let level = '', levelEmoji = '', loveTag = '';
      if (percent >= 70) { level = '重度恋爱脑'; levelEmoji = '💔'; loveTag = '飞蛾扑火型'; }
      else if (percent >= 50) { level = '中度恋爱脑'; levelEmoji = '💕'; loveTag = '义无反顾型'; }
      else if (percent >= 30) { level = '轻度恋爱脑'; levelEmoji = '💭'; loveTag = '心动小鹿型'; }
      else { level = '理性恋人'; levelEmoji = '🧠'; loveTag = '清醒独立型'; }

      const dimensions = [
        { name: '沉没成本', key: 'sunk_cost', score: scores.sunk_cost || 0, max: 4,
          percent: Math.round(((scores.sunk_cost || 0) / 4) * 100),
          desc: scores.sunk_cost >= 3 ? '容易因为已投入的感情而难以抽身' : scores.sunk_cost >= 2 ? '有时会因为不舍而犹豫' : '能理性看待过去的投入' },
        { name: '理想化', key: 'idealization', score: scores.idealization || 0, max: 4,
          percent: Math.round(((scores.idealization || 0) / 4) * 100),
          desc: scores.idealization >= 3 ? '容易把对方想象成完美的人' : scores.idealization >= 2 ? '偶尔会美化对方的形象' : '能客观看待对方' },
        { name: '情绪依赖', key: 'emotional_dependency', score: scores.emotional_dependency || 0, max: 4,
          percent: Math.round(((scores.emotional_dependency || 0) / 4) * 100),
          desc: scores.emotional_dependency >= 3 ? '非常依赖对方的情感回应' : scores.emotional_dependency >= 2 ? '有时需要对方的确认' : '能保持情感独立' },
        { name: '失去理性', key: 'irrational', score: scores.irrational || 0, max: 3,
          percent: Math.round(((scores.irrational || 0) / 3) * 100),
          desc: scores.irrational >= 3 ? '恋爱中容易做出非理性决定' : scores.irrational >= 2 ? '有时会因感情冲昏头脑' : '能保持理性判断' }
      ];

      this.setData({
        resultData, scores, totalScore: total, percent, level, levelEmoji, loveTag, dimensions, loading: false
      });
    } catch (e) {
      console.error('Parse failed:', e);
      wx.showToast({ title: '数据解析失败', icon: 'none' });
      wx.navigateBack();
    }
  },

  onReady: function () {
    if (!this.data.loading) {
      setTimeout(() => this.drawGauge(), 300);
    }
  },

  drawGauge: function () {
    const query = wx.createSelectorQuery();
    query.select('#gaugeCanvas').fields({ node: true, size: true }).exec((res) => {
      if (!res[0] || !res[0].node) return;
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      const dpr = wx.getSystemInfoSync().pixelRatio;
      const w = res[0].width;
      const h = res[0].height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      const cx = w / 2;
      const cy = h * 0.6;
      const radius = Math.min(w, h) * 0.38;
      const lineWidth = 18;
      const startAngle = Math.PI * 0.8;
      const endAngle = Math.PI * 2.2;
      const totalAngle = endAngle - startAngle;
      const valueAngle = startAngle + totalAngle * (this.data.percent / 100);

      // 背景弧
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.strokeStyle = '#FFE0EB';
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 值弧 - 渐变色
      const gradient = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      gradient.addColorStop(0, '#FF6B9D');
      gradient.addColorStop(0.5, '#FF8FB1');
      gradient.addColorStop(1, '#FFB3C6');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, valueAngle);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // 刻度标记
      const marks = [0, 25, 50, 75, 100];
      ctx.fillStyle = '#ccc';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      marks.forEach(mark => {
        const angle = startAngle + totalAngle * (mark / 100);
        const x = cx + (radius + 20) * Math.cos(angle);
        const y = cy + (radius + 20) * Math.sin(angle);
        ctx.fillText(mark, x, y + 4);
      });
    });
  },

  onShareAppMessage: function () {
    return {
      title: `我的恋爱脑指数是${this.data.percent}%，${this.data.loveTag}，你也来测测吧！`,
      path: '/pages/index/index'
    };
  },

  retakeTest: function () {
    wx.redirectTo({ url: '/pages/test/test?test_id=love_brain' });
  },
  backToHome: function () { wx.switchTab({ url: '/pages/index/index' }); }
});
