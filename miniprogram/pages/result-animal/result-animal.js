const app = getApp();

const ANIMAL_DATA = {
  lion: {
    name: '狮子型', emoji: '🦁', tagline: '天生的领导者',
    color: '#F5A623',
    description: '你是一个果断、自信、有魄力的人。面对挑战时你会主动出击，在团队中自然成为领导者。',
    keywords: ['果断决策', '自信勇敢', '目标导向', '行动力强', '掌控全局'],
    strengths: [
      { name: '天生领导力', desc: '善于带领团队，做出决策' },
      { name: '果断行动', desc: '不犹豫，抓住机会就出手' },
      { name: '目标感强', desc: '清楚自己想要什么并为之奋斗' }
    ],
    blindSpots: [
      { name: '可能忽视他人感受', desc: '在追求目标时可能显得强势' },
      { name: '控制欲较强', desc: '可能难以放权给他人' }
    ],
    advice: {
      career: '适合管理岗、创业、销售、项目管理',
      social: '注意倾听他人意见，学会放权',
      love: '给伴侣更多参与决策的空间'
    }
  },
  peacock: {
    name: '孔雀型', emoji: '🦚', tagline: '魅力四射的社交家',
    color: '#3498DB',
    description: '你热情、乐观、善于表达。在任何场合你都能成为焦点，用你的魅力感染周围的人。',
    keywords: ['热情开朗', '善于表达', '富有魅力', '创意丰富', '乐观积极'],
    strengths: [
      { name: '社交达人', desc: '善于与各种人建立联系' },
      { name: '表达能力', desc: '能生动有趣地传达想法' },
      { name: '感染力强', desc: '你的热情能带动整个团队' }
    ],
    blindSpots: [
      { name: '可能过于在意关注', desc: '有时会为了表现而忽视深度' },
      { name: '注意力容易分散', desc: '可能同时做太多事' }
    ],
    advice: {
      career: '适合公关、营销、媒体、活动策划',
      social: '学会在热闹之外也享受深度的交流',
      love: '关注伴侣内在的需求，而非只制造浪漫'
    }
  },
  koala: {
    name: '考拉型', emoji: '🐨', tagline: '温暖可靠的守护者',
    color: '#2ECC71',
    description: '你温和、耐心、善解人意。你是朋友圈中最可靠的人，总能给身边的人带来安全感。',
    keywords: ['温和体贴', '忠诚可靠', '耐心倾听', '注重和谐', '稳定踏实'],
    strengths: [
      { name: '忠诚可靠', desc: '是朋友和团队中最值得信赖的人' },
      { name: '善于倾听', desc: '能耐心倾听并理解他人' },
      { name: '团队粘合剂', desc: '善于维护团队和谐与稳定' }
    ],
    blindSpots: [
      { name: '可能过于保守', desc: '面对变化可能犹豫不决' },
      { name: '不善拒绝', desc: '可能因为不想伤害他人而承担太多' }
    ],
    advice: {
      career: '适合人力资源、客户服务、教育、护理',
      social: '学会主动表达自己的需求和想法',
      love: '勇敢表达爱意，不要总是默默付出'
    }
  },
  owl: {
    name: '猫头鹰型', emoji: '🦉', tagline: '睿智谨慎的分析师',
    color: '#8B6914',
    description: '你理性、严谨、注重细节。你善于分析和思考，总能在复杂的局面中找到最优解。',
    keywords: ['逻辑严密', '注重细节', '深思熟虑', '追求精确', '独立思考'],
    strengths: [
      { name: '分析能力强', desc: '善于从数据和信息中找到规律' },
      { name: '注重质量', desc: '对工作质量有极高的标准' },
      { name: '独立思考', desc: '不随波逐流，有自己的判断' }
    ],
    blindSpots: [
      { name: '可能过于完美主义', desc: '对细节的苛求可能影响效率' },
      { name: '社交偏弱', desc: '可能不擅长处理人际关系' }
    ],
    advice: {
      career: '适合数据分析、科研、审计、工程',
      social: '尝试更开放地与人交流，不必事事完美',
      love: '学会用情感表达爱，而非只用行动'
    }
  }
};

Page({
  data: {
    scores: {},
    mainAnimal: '',
    animalData: null,
    percentages: [],
    loading: true
  },

  onLoad: function (options) {
    const { result_data } = options;
    if (!result_data) { wx.navigateBack(); return; }
    try {
      const resultData = JSON.parse(decodeURIComponent(result_data));
      const scores = resultData.scores || {};
      const total = Math.max(1, (scores.lion || 0) + (scores.peacock || 0) + (scores.koala || 0) + (scores.owl || 0));
      
      const resultCode = resultData.result?.resultCode || 'lion';
      const animalData = ANIMAL_DATA[resultCode] || ANIMAL_DATA.lion;

      const percentages = [
        { name: '狮子', emoji: '🦁', key: 'lion', percent: Math.round((scores.lion || 0) / total * 100), color: '#F5A623' },
        { name: '孔雀', emoji: '🦚', key: 'peacock', percent: Math.round((scores.peacock || 0) / total * 100), color: '#3498DB' },
        { name: '考拉', emoji: '🐨', key: 'koala', percent: Math.round((scores.koala || 0) / total * 100), color: '#2ECC71' },
        { name: '猫头鹰', emoji: '🦉', key: 'owl', percent: Math.round((scores.owl || 0) / total * 100), color: '#8B6914' }
      ];

      this.setData({ scores, mainAnimal: resultCode, animalData, percentages, loading: false });

      // 设置导航栏颜色为橙色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#F2994A',
        animation: { duration: 300, timingFunc: 'easeIn' }
      });
    } catch (e) {
      console.error('Parse failed:', e);
      wx.navigateBack();
    }
  },

  onReady: function () {
    if (!this.data.loading) {
      setTimeout(() => this.drawDonut(), 300);
    }
  },

  drawDonut: function () {
    const query = wx.createSelectorQuery();
    query.select('#donutCanvas').fields({ node: true, size: true }).exec((res) => {
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
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;
      const innerRadius = radius * 0.55;
      const lineWidth = radius - innerRadius;
      
      let startAngle = -Math.PI / 2;
      this.data.percentages.forEach(item => {
        const sliceAngle = (item.percent / 100) * Math.PI * 2;
        if (sliceAngle > 0.01) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius - lineWidth / 2, startAngle, startAngle + sliceAngle);
          ctx.strokeStyle = item.color;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'butt';
          ctx.stroke();
        }
        startAngle += sliceAngle;
      });

      // 中心文字
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const mainEmoji = this.data.animalData.emoji;
      ctx.font = '28px sans-serif';
      ctx.fillText(mainEmoji, cx, cy - 8);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText(this.data.animalData.name, cx, cy + 18);
    });
  },

  onShareAppMessage: function () {
    return {
      title: `我的灵魂动物是${this.data.animalData.emoji}${this.data.animalData.name}，你也来测测吧！`,
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function () {
    return {
      title: `我的灵魂动物是${this.data.animalData.emoji}${this.data.animalData.name}！`,
      query: ''
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
    wx.redirectTo({ url: '/pages/test/test?test_id=animal_persona' });
  },
  backToHome: function () { wx.switchTab({ url: '/pages/index/index' }); },

  generatePoster: function () {
    const resultData = {
      test_id: 'animal_persona',
      result: { type_name: this.data.animalData.name, emoji: this.data.animalData.emoji, description: this.data.animalData.tagline }
    };
    wx.navigateTo({
      url: `/pages/share/share?test_id=animal_persona&result_data=${encodeURIComponent(JSON.stringify(resultData))}`
    });
  }
});
