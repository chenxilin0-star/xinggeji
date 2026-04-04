const app = getApp();

Page({
  data: {
    testId: '',
    resultData: {},
    dimensions: [],
    mbtiScores: {},
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
        const mbtiScores = this.calculateMbtiScores(result_data, resultData.scores);
        
        this.setData({
          testId: test_id,
          resultData,
          dimensions,
          mbtiScores
        });
      } catch (e) {
        console.error('Parse result data failed:', e);
        wx.showToast({ title: '数据解析失败', icon: 'none' });
        wx.navigateBack();
      }
    } else {
      wx.navigateBack();
    }
  },

  // 计算维度数据
  calculateDimensions: function (testId, scores) {
    if (!scores) return [];
    
    switch (testId) {
      case 'mbti':
        return [];
        
      case 'love_brain':
        return [
          { name: '沉没成本', value: Math.round((scores.sunk_cost / 4) * 100) || 0 },
          { name: '理想化', value: Math.round((scores.idealization / 4) * 100) || 0 },
          { name: '情绪依赖', value: Math.round((scores.emotional_dependency / 4) * 100) || 0 },
          { name: '失去理性', value: Math.round((scores.irrational / 3) * 100) || 0 }
        ];
        
      case 'animal_persona':
        const animalTotal = (scores.lion || 0) + (scores.peacock || 0) + (scores.koala || 0) + (scores.owl || 0);
        return [
          { name: '狮子型', value: animalTotal > 0 ? Math.round((scores.lion / animalTotal) * 100) : 25 },
          { name: '孔雀型', value: animalTotal > 0 ? Math.round((scores.peacock / animalTotal) * 100) : 25 },
          { name: '考拉型', value: animalTotal > 0 ? Math.round((scores.koala / animalTotal) * 100) : 25 },
          { name: '猫头鹰型', value: animalTotal > 0 ? Math.round((scores.owl / animalTotal) * 100) : 25 }
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

  // 计算MBTI四个维度的百分比
  calculateMbtiScores: function (testId, scores) {
    if (testId !== 'mbti' || !scores) return {};
    
    const E = scores.E || 0;
    const I = scores.I || 0;
    const S = scores.S || 0;
    const N = scores.N || 0;
    const T = scores.T || 0;
    const F = scores.F || 0;
    const J = scores.J || 0;
    const P = scores.P || 0;
    
    const ETotal = E + I;
    const STotal = S + N;
    const TTotal = T + F;
    const JTotal = J + P;
    
    return {
      EP: ETotal > 0 ? Math.round((E / ETotal) * 100) : 50,
      IP: ETotal > 0 ? Math.round((I / ETotal) * 100) : 50,
      SP: STotal > 0 ? Math.round((S / STotal) * 100) : 50,
      NP: STotal > 0 ? Math.round((N / STotal) * 100) : 50,
      TP: TTotal > 0 ? Math.round((T / TTotal) * 100) : 50,
      FP: TTotal > 0 ? Math.round((F / TTotal) * 100) : 50,
      JP: JTotal > 0 ? Math.round((J / JTotal) * 100) : 50,
      PP: JTotal > 0 ? Math.round((P / JTotal) * 100) : 50
    };
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
