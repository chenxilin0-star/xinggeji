const app = getApp();

const ATTACH_DATA = {
  secure: {
    code: 'secure', name: '安全型', emoji: '💚',
    tagline: '信任与亲密的健康平衡者',
    color: '#2ECC71',
    description: '你能够在亲密关系中保持健康的平衡。你既信任伴侣，也能保持自我；既渴望亲密，也不会因距离而焦虑。',
    advice: {
      self: ['你善于表达情感需求', '能建立健康的亲密关系', '在亲密与独立间游刃有余'],
      tips: ['继续保持对伴侣的信任和开放', '注意给伴侣足够的空间', '遇到问题及时沟通']
    },
    withOthers: {
      anxious: '对方需要更多安全感，主动给予确认和回应',
      avoidant: '不要追得太紧，给对方足够的独处时间',
      fearful: '耐心等待，用稳定的陪伴建立信任'
    }
  },
  anxious: {
    code: 'anxious', name: '焦虑型', emoji: '💛',
    tagline: '渴望亲密但担心失去',
    color: '#F39C12',
    description: '你渴望深度的亲密关系，但常常担心伴侣不够爱你或会离开你。你可能需要更多的确认和安全感。',
    advice: {
      self: ['你对感情非常投入和真诚', '你有强烈的情感需求，这是正常的', '你的敏感也是一种天赋'],
      tips: ['学会自我安抚，不要完全依赖伴侣的确认', '练习独立活动，培养自己的兴趣', '表达需求时用"我"开头，而非指责对方']
    },
    withOthers: {
      secure: '对方的稳定能帮助你获得安全感',
      avoidant: '对方的疏离会激发你的焦虑，需要互相理解',
      fearful: '你们可能互相触发不安全感，需要耐心沟通'
    }
  },
  avoidant: {
    code: 'avoidant', name: '回避型', emoji: '💙',
    tagline: '重视独立，偏好情感距离',
    color: '#3498DB',
    description: '你重视个人独立和自主，倾向于保持一定的情感距离。亲密关系可能让你感到不适或有压力。',
    advice: {
      self: ['你的独立性是一种优势', '你擅长理性思考和处理问题', '你不需要为此感到内疚'],
      tips: ['尝试逐步敞开心扉，分享内心感受', '亲密不等于失去自我', '学会识别并表达自己的情感需求']
    },
    withOthers: {
      secure: '对方的稳定能让你逐渐放下防备',
      anxious: '对方的黏人会让你想逃跑，试着理解对方的不安全感',
      fearful: '你们可能形成"追-逃"模式，需要打破这个循环'
    }
  },
  fearful: {
    code: 'fearful', name: '恐惧型', emoji: '❤️',
    tagline: '既渴望亲密又害怕受伤',
    color: '#E74C3C',
    description: '你既渴望亲密关系，又害怕被伤害。这种矛盾让你在关系中充满挣扎——想要靠近，却本能地后退。',
    advice: {
      self: ['你的矛盾感受是可以理解的', '你同时拥有敏感和力量', '这并不意味着你无法拥有健康的关系'],
      tips: ['学会识别自己的情绪触发点', '尝试在安全的关系中逐步建立信任', '考虑专业心理咨询来疗愈过去的创伤']
    },
    withOthers: {
      secure: '对方的稳定是你最好的疗愈，允许自己被爱',
      anxious: '你们可能互相触发焦虑，需要共同建立安全感',
      avoidant: '你们可能同时回避，需要有人主动打破沉默'
    }
  }
};

Page({
  data: {
    resultCode: '',
    attachData: null,
    anxietyPercent: 0,
    avoidancePercent: 0,
    loading: true
  },

  onLoad: function (options) {
    const { result_data } = options;
    if (!result_data) { wx.navigateBack(); return; }
    try {
      const resultData = JSON.parse(decodeURIComponent(result_data));
      const scores = resultData.scores || {};
      const resultCode = resultData.result?.resultCode || 'secure';
      const attachData = ATTACH_DATA[resultCode] || ATTACH_DATA.secure;

      const anxietyPercent = Math.min(100, Math.round(Math.max(0, scores.anxiety - 9) / 27 * 100));
      const avoidancePercent = Math.min(100, Math.round(Math.max(0, scores.avoidance - 9) / 27 * 100));

      this.setData({
        resultCode, attachData, anxietyPercent, avoidancePercent, loading: false
      });

      // 设置导航栏颜色为紫色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#9B59B6',
        animation: { duration: 300, timingFunc: 'easeIn' }
      });
    } catch (e) {
      console.error('Parse failed:', e);
      wx.navigateBack();
    }
  },

  onShareAppMessage: function () {
    return {
      title: `我的依恋类型是${this.data.attachData.emoji}${this.data.attachData.name}，你也来测测吧！`,
      path: '/pages/index/index'
    };
  },

  retakeTest: function () {
    wx.redirectTo({ url: '/pages/test/test?test_id=attachment_style' });
  },
  backToHome: function () { wx.switchTab({ url: '/pages/index/index' }); },

  generatePoster: function () {
    const resultData = {
      test_id: 'attachment_style',
      result: { type_name: this.data.attachData.name, emoji: this.data.attachData.emoji, description: this.data.attachData.tagline }
    };
    wx.navigateTo({
      url: `/pages/share/share?test_id=attachment_style&result_data=${encodeURIComponent(JSON.stringify(resultData))}`
    });
  }
});
