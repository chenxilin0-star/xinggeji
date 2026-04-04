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
        // 等页面渲染完成后绘制雷达图
        setTimeout(() => {
          this.drawRadar();
        }, 300);
      } catch (e) {
        console.error('Parse result data failed:', e);
        wx.showToast({ title: '数据解析失败', icon: 'none' });
        wx.navigateBack();
      }
    } else {
      wx.navigateBack();
    }
  },

  // 计算维度数据用于雷达图和列表展示
  calculateDimensions: function (testId, scores) {
    const dimensions = [];
    const maxScore = 100;
    
    switch (testId) {
      case 'mbti':
        // MBTI 四个维度
        const mbtiDims = [
          { name: '外向 E', value: Math.round((scores.E / (scores.E + scores.I)) * 100) || 50 },
          { name: '实感 S', value: Math.round((scores.S / (scores.S + scores.N)) * 100) || 50 },
          { name: '理性 T', value: Math.round((scores.T / (scores.F + scores.T)) * 100) || 50 },
          { name: '判断 J', value: Math.round((scores.J / (scores.P + scores.J)) * 100) || 50 }
        ];
        return mbtiDims;
        
      case 'love_brain':
        return [
          { name: '沉没成本', value: Math.round((scores.sunk_cost / 4) * 100) || 0 },
          { name: '理想化', value: Math.round((scores.idealization / 4) * 100) || 0 },
          { name: '情绪依赖', value: Math.round((scores.emotional_dependency / 4) * 100) || 0 },
          { name: '失去理性', value: Math.round((scores.irrational / 3) * 100) || 0 }
        ];
        
      case 'animal_persona':
        const animalTotal = scores.lion + scores.peacock + scores.koala + scores.owl;
        return [
          { name: '狮子型', value: Math.round((scores.lion / animalTotal) * 100) || 25 },
          { name: '孔雀型', value: Math.round((scores.peacock / animalTotal) * 100) || 25 },
          { name: '考拉型', value: Math.round((scores.koala / animalTotal) * 100) || 25 },
          { name: '猫头鹰型', value: Math.round((scores.owl / animalTotal) * 100) || 25 }
        ];
        
      case 'attachment_style':
        return [
          { name: '焦虑程度', value: Math.round((scores.anxiety / 27) * 100) || 50 },
          { name: '回避程度', value: Math.round((scores.avoidance / 27) * 100) || 50 }
        ];
        
      case 'emotion_stress':
        return [
          { name: '抑郁指数', value: Math.round((scores.depression / 21) * 100) || 30 },
          { name: '焦虑指数', value: Math.round((scores.anxiety / 21) * 100) || 30 },
          { name: '压力指数', value: Math.round((scores.stress / 21) * 100) || 30 }
        ];
        
      default:
        return [];
    }
  },

  // 绘制雷达图
  drawRadar: function () {
    const { dimensions } = this.data;
    if (!dimensions || dimensions.length < 3) return;

    const ctx = wx.createCanvasContext('radarCanvas', this);
    const canvasWidth = 300;
    const canvasHeight = 300;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(canvasWidth, canvasHeight) / 2 - 40;
    const sides = dimensions.length;
    const angle = (2 * Math.PI) / sides;

    // 绘制背景网格
    ctx.setStrokeStyle('#f0f0f0');
    ctx.setLineWidth(1);
    
    // 绘制多个正多边形背景
    for (let level = 1; level <= 5; level++) {
      const levelRadius = (radius / 5) * level;
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const x = centerX + levelRadius * Math.cos(angle * i - Math.PI / 2);
        const y = centerY + levelRadius * Math.sin(angle * i - Math.PI / 2);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 绘制数据区域
    ctx.beginPath();
    ctx.setFillStyle('rgba(108, 92, 231, 0.3)');
    ctx.setStrokeStyle('#6C5CE7');
    ctx.setLineWidth(2);
    
    dimensions.forEach((dim, i) => {
      const value = Math.min(dim.value, 100) / 100;
      const x = centerX + radius * value * Math.cos(angle * i - Math.PI / 2);
      const y = centerY + radius * value * Math.sin(angle * i - Math.PI / 2);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 绘制数据点
    dimensions.forEach((dim, i) => {
      const value = Math.min(dim.value, 100) / 100;
      const x = centerX + radius * value * Math.cos(angle * i - Math.PI / 2);
      const y = centerY + radius * value * Math.sin(angle * i - Math.PI / 2);
      
      ctx.beginPath();
      ctx.setFillStyle('#6C5CE7');
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.beginPath();
      ctx.setFillStyle('#fff');
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    // 绘制标签
    ctx.setFillStyle('#666');
    ctx.setFontSize(12);
    ctx.setTextAlign('center');
    
    dimensions.forEach((dim, i) => {
      const labelRadius = radius + 25;
      const x = centerX + labelRadius * Math.cos(angle * i - Math.PI / 2);
      const y = centerY + labelRadius * Math.sin(angle * i - Math.PI / 2);
      
      // 调整标签位置避免重叠
      let offsetY = 0;
      if (i === 0) offsetY = -8;
      else if (i === sides - 1) offsetY = -8;
      else if (i === sides / 2) offsetY = 12;
      
      ctx.fillText(dim.name, x, y + offsetY);
    });

    ctx.draw();
  },

  shareResult: function () {
    const { testId, resultData } = this.data;
    const title = this.data.testTitles[testId] || '心理测试';
    const result = resultData.result;
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage: function () {
    const { testId, resultData } = this.data;
    const title = this.data.testTitles[testId] || '心理测试';
    const result = resultData.result;
    
    return {
      title: `我在${title}中测出了${result.type_name}，你也来试试吧！`,
      path: `/pages/index/index`,
      imageUrl: ''
    };
  },

  retakeTest: function () {
    wx.navigateBack();
  },

  backToHome: function () {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
