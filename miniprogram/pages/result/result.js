const app = getApp();

Page({
  data: {
    testId: '',
    resultData: {},
    dimensions: [],
    radarColor: '#6C5CE7',
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    },
    testEmojis: {
      mbti: '🎭',
      love_brain: '💕',
      animal_persona: '🦁',
      attachment_style: '💞',
      emotion_stress: '🌊'
    }
  },

  onLoad: function (options) {
    const { test_id, result_data } = options;
    if (result_data) {
      try {
        const resultData = JSON.parse(decodeURIComponent(result_data));
        const dimensions = this.calculateDimensions(test_id, resultData.scores);
        
        this.setData({
          testId: test_id,
          resultData,
          dimensions
        });
        
        setTimeout(() => {
          this.drawRadar();
        }, 100);
      } catch (e) {
        console.error('Parse result data failed:', e);
        wx.showToast({ title: '数据解析失败', icon: 'none' });
        wx.navigateBack();
      }
    } else {
      wx.navigateBack();
    }
  },

  calculateDimensions: function (testId, scores) {
    if (!scores) return [];
    
    switch (testId) {
      case 'mbti': {
        const E = scores.E || 0, I = scores.I || 0;
        const S = scores.S || 0, N = scores.N || 0;
        const T = scores.T || 0, F = scores.F || 0;
        const J = scores.J || 0, P = scores.P || 0;
        return [
          { name: '外向 E', value: Math.min(100, Math.round((E / (E + I || 1)) * 100)) || 50 },
          { name: '实感 S', value: Math.min(100, Math.round((S / (S + N || 1)) * 100)) || 50 },
          { name: '理性 T', value: Math.min(100, Math.round((T / (T + F || 1)) * 100)) || 50 },
          { name: '判断 J', value: Math.min(100, Math.round((J / (J + P || 1)) * 100)) || 50 }
        ];
      }
      case 'love_brain':
        return [
          { name: '沉没成本', value: Math.min(100, Math.round((scores.sunk_cost / 4) * 100)) || 0 },
          { name: '理想化', value: Math.min(100, Math.round((scores.idealization / 4) * 100)) || 0 },
          { name: '情绪依赖', value: Math.min(100, Math.round((scores.emotional_dependency / 4) * 100)) || 0 },
          { name: '失去理性', value: Math.min(100, Math.round((scores.irrational / 3) * 100)) || 0 }
        ];
      case 'animal_persona': {
        const animalTotal = Math.max(1, (scores.lion || 0) + (scores.peacock || 0) + (scores.koala || 0) + (scores.owl || 0));
        return [
          { name: '狮子型', value: Math.round((scores.lion / animalTotal) * 100) || 25 },
          { name: '孔雀型', value: Math.round((scores.peacock / animalTotal) * 100) || 25 },
          { name: '考拉型', value: Math.round((scores.koala / animalTotal) * 100) || 25 },
          { name: '猫头鹰型', value: Math.round((scores.owl / animalTotal) * 100) || 25 }
        ];
      }
      case 'attachment_style':
        return [
          { name: '焦虑程度', value: Math.min(100, Math.round((scores.anxiety / 27) * 100)) || 50 },
          { name: '回避程度', value: Math.min(100, Math.round((scores.avoidance / 27) * 100)) || 50 },
          { name: '安全程度', value: Math.max(0, 100 - Math.min(100, Math.round(((scores.anxiety + scores.avoidance) / 54) * 100))) || 50 },
          { name: '信任程度', value: Math.max(0, 100 - Math.round((scores.avoidance / 27) * 100)) || 50 }
        ];
      case 'emotion_stress':
        return [
          { name: '抑郁指数', value: Math.min(100, Math.round((scores.depression / 21) * 100)) || 30 },
          { name: '焦虑指数', value: Math.min(100, Math.round((scores.anxiety / 21) * 100)) || 30 },
          { name: '压力指数', value: Math.min(100, Math.round((scores.stress / 21) * 100)) || 30 },
          { name: '心理健康', value: Math.max(0, 100 - Math.min(100, Math.round(((scores.depression + scores.anxiety + scores.stress) / 63) * 100))) || 70 }
        ];
      default:
        return [];
    }
  },

  drawRadar: function () {
    const { dimensions } = this.data;
    if (!dimensions || dimensions.length < 3) return;

    const query = wx.createSelectorQuery();
    query.select('#radarCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) return;
        
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;
        
        const width = res[0].width;
        const height = res[0].height;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;
        const sides = dimensions.length;
        const angle = (2 * Math.PI) / sides;
        const levels = 5;

        ctx.clearRect(0, 0, width, height);

        // 背景网格
        ctx.strokeStyle = '#e8e6f5';
        ctx.lineWidth = 1;
        for (let level = 1; level <= levels; level++) {
          const levelRadius = (radius / levels) * level;
          ctx.beginPath();
          for (let i = 0; i <= sides; i++) {
            const x = centerX + levelRadius * Math.cos(angle * i - Math.PI / 2);
            const y = centerY + levelRadius * Math.sin(angle * i - Math.PI / 2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // 轴线
        ctx.strokeStyle = '#e8e6f5';
        for (let i = 0; i < sides; i++) {
          const x = centerX + radius * Math.cos(angle * i - Math.PI / 2);
          const y = centerY + radius * Math.sin(angle * i - Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // 数据区域
        ctx.beginPath();
        ctx.fillStyle = 'rgba(108, 92, 231, 0.25)';
        ctx.strokeStyle = '#6C5CE7';
        ctx.lineWidth = 2;
        dimensions.forEach((dim, i) => {
          const value = Math.min(100, Math.max(0, dim.value)) / 100;
          const x = centerX + radius * value * Math.cos(angle * i - Math.PI / 2);
          const y = centerY + radius * value * Math.sin(angle * i - Math.PI / 2);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 数据点
        dimensions.forEach((dim, i) => {
          const value = Math.min(100, Math.max(0, dim.value)) / 100;
          const x = centerX + radius * value * Math.cos(angle * i - Math.PI / 2);
          const y = centerY + radius * value * Math.sin(angle * i - Math.PI / 2);
          
          ctx.beginPath();
          ctx.fillStyle = '#6C5CE7';
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.beginPath();
          ctx.fillStyle = '#fff';
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });

        // 标签
        ctx.fillStyle = '#666';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        dimensions.forEach((dim, i) => {
          const labelRadius = radius + 25;
          const x = centerX + labelRadius * Math.cos(angle * i - Math.PI / 2);
          const y = centerY + labelRadius * Math.sin(angle * i - Math.PI / 2);
          
          let offsetX = 0, offsetY = 0;
          if (i === 0) offsetY = -5;
          else if (i === sides - 1) offsetY = -5;
          else if (i === Math.floor(sides / 2)) offsetY = 12;
          
          ctx.fillText(dim.name, x + offsetX, y + offsetY);
        });
      });
  },

  onCanvasTouch: function(e) {},

  shareResult: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage: function () {
    const { testId, resultData } = this.data;
    const title = this.data.testTitles[testId] || '心理测试';
    const result = resultData.result || {};
    
    return {
      title: `我在${title}中测出了${result.type_name || '心理测试'}，你也来试试吧！`,
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function () {
    const { testId, resultData } = this.data;
    const title = this.data.testTitles[testId] || '心理测试';
    const result = resultData.result || {};
    
    return {
      title: `我在${title}中测出了${result.type_name || '心理测试'}！`,
      query: ''
    };
  },

  retakeTest: function () {
    wx.navigateBack();
  },

  backToHome: function () {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
