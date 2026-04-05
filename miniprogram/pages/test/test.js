const app = getApp();

// 结果页路由映射
const RESULT_ROUTES = {
  mbti: '/pages/result-mbti/result-mbti',
  love_brain: '/pages/result-love/result-love',
  animal_persona: '/pages/result-animal/result-animal',
  attachment_style: '/pages/result-attach/result-attach',
  emotion_stress: '/pages/result-stress/result-stress'
};

Page({
  data: {
    testId: '',
    testInfo: {},
    questions: [],
    currentIndex: 0,
    answers: [],
    loading: true,
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    }
  },

  onLoad: function (options) {
    const { test_id } = options;
    if (!test_id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      wx.navigateBack();
      return;
    }
    this.setData({ testId: test_id });
    this.loadTestDetail();
  },

  loadTestDetail: function () {
    wx.showLoading({ title: '加载题目...' });
    
    wx.cloud.callFunction({
      name: 'getTestDetail',
      data: { test_id: this.data.testId },
      success: res => {
        wx.hideLoading();
        if (res.result.success) {
          this.setData({
            testInfo: res.result,
            questions: res.result.questions,
            answers: new Array(res.result.questions.length).fill(null),
            loading: false
          });
        } else {
          this.loadLocalQuestions();
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('Load test detail failed:', err);
        this.loadLocalQuestions();
      }
    });
  },

  loadLocalQuestions: function () {
    const testId = this.data.testId;
    const questions = this.getLocalQuestions(testId);
    this.setData({
      questions,
      answers: new Array(questions.length).fill(null),
      loading: false
    });
  },

  getLocalQuestions: function (testId) {
    const questionsMap = {
      mbti: [
        { q_no: 1, q_text: '在社交聚会中，你通常是：', options: [{ o_no: 'A', o_text: '主动和很多人交流' }, { o_no: 'B', o_text: '只和熟悉的人聊天' }] },
        { q_no: 2, q_text: '你更倾向于：', options: [{ o_no: 'A', o_text: '现实可行' }, { o_no: 'B', o_text: '富有想象力' }] },
        { q_no: 3, q_text: '做决定时，你更看重：', options: [{ o_no: 'A', o_text: '事实和逻辑' }, { o_no: 'B', o_text: '情感和价值观' }] },
        { q_no: 4, q_text: '你更喜欢：', options: [{ o_no: 'A', o_text: '有计划有安排' }, { o_no: 'B', o_text: '随性灵活' }] },
        { q_no: 5, q_text: '独处时，你通常会：', options: [{ o_no: 'A', o_text: '感到精力充沛' }, { o_no: 'B', o_text: '需要社交来充电' }] },
        { q_no: 6, q_text: '面对问题时，你喜欢：', options: [{ o_no: 'A', o_text: '关注具体细节' }, { o_no: 'B', o_text: '思考可能性' }] },
        { q_no: 7, q_text: '在与他人争论时，你更在意：', options: [{ o_no: 'A', o_text: '客观真相' }, { o_no: 'B', o_text: '对方感受' }] },
        { q_no: 8, q_text: '你的生活节奏：', options: [{ o_no: 'A', o_text: '按计划进行' }, { o_no: 'B', o_text: '随机应变' }] },
        { q_no: 9, q_text: '你更喜欢的工作环境：', options: [{ o_no: 'A', o_text: '热闹活跃' }, { o_no: 'B', o_text: '安静独立' }] },
        { q_no: 10, q_text: '学习新事物时，你更关注：', options: [{ o_no: 'A', o_text: '实际操作' }, { o_no: 'B', o_text: '理论概念' }] },
        { q_no: 11, q_text: '你容易被什么打动：', options: [{ o_no: 'A', o_text: '有力的论证' }, { o_no: 'B', o_text: '感人的故事' }] },
        { q_no: 12, q_text: '面对约定，你会：', options: [{ o_no: 'A', o_text: '提前规划' }, { o_no: 'B', o_text: '看情况' }] },
        { q_no: 13, q_text: '空闲时间，你更喜欢：', options: [{ o_no: 'A', o_text: '阅读或思考' }, { o_no: 'B', o_text: '参加活动' }] },
        { q_no: 14, q_text: '你解决问题的方式：', options: [{ o_no: 'A', o_text: '按步骤分析' }, { o_no: 'B', o_text: '凭直觉' }] },
        { q_no: 15, q_text: '你的沟通风格：', options: [{ o_no: 'A', o_text: '直接明了' }, { o_no: 'B', o_text: '委婉温和' }] },
        { q_no: 16, q_text: '你更喜欢的生活：', options: [{ o_no: 'A', o_text: '结构化' }, { o_no: 'B', o_text: '自由开放' }] },
        { q_no: 17, q_text: '当认识新朋友时，你通常是：', options: [{ o_no: 'A', o_text: '主动开口' }, { o_no: 'B', o_text: '等待对方' }] },
        { q_no: 18, q_text: '你更相信：', options: [{ o_no: 'A', o_text: '经验' }, { o_no: 'B', o_text: '灵感' }] },
        { q_no: 19, q_text: '做选择时，你会被：', options: [{ o_no: 'A', o_text: '逻辑分析吸引' }, { o_no: 'B', o_text: '价值认同吸引' }] },
        { q_no: 20, q_text: '你更喜欢：', options: [{ o_no: 'A', o_text: '确定性' }, { o_no: 'B', o_text: '可能性' }] }
      ],
      love_brain: [
        { q_no: 1, q_text: '分手后，你会反复查看前任的社交动态吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 2, q_text: '恋爱中，你会为对方放弃自己的爱好吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 3, q_text: '对方没有及时回复，你会胡思乱想吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 4, q_text: '你会为了维系感情而委屈自己吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 5, q_text: '吵架后，你会先低头认错吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 6, q_text: '你会把对方理想化，觉得对方完美无缺吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 7, q_text: '恋爱后，你的朋友社交减少了吗？', options: [{ o_no: 'A', o_text: '没有' }, { o_no: 'B', o_text: '减少了' }] },
        { q_no: 8, q_text: '你会无条件原谅对方的错误吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 9, q_text: '对方提出分手，你会纠缠吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 10, q_text: '你会因为恋爱而影响工作/学习吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 11, q_text: '你会经常幻想和对方的未来吗？', options: [{ o_no: 'A', o_text: '偶尔' }, { o_no: 'B', o_text: '经常' }] },
        { q_no: 12, q_text: '恋爱中，你会失去自我吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 13, q_text: '你会为了对方改变自己的原则吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] },
        { q_no: 14, q_text: '对方的需求总是优先于自己的需求吗？', options: [{ o_no: 'A', o_text: '不是' }, { o_no: 'B', o_text: '是的' }] },
        { q_no: 15, q_text: '分手后，你会很长时间走不出来吗？', options: [{ o_no: 'A', o_text: '不会' }, { o_no: 'B', o_text: '会的' }] }
      ],
      animal_persona: [
        { q_no: 1, q_text: '面对挑战时，你的第一反应是？', options: [{ o_no: 'A', o_text: '主动出击' }, { o_no: 'B', o_text: '优雅展示' }, { o_no: 'C', o_text: '耐心等待' }, { o_no: 'D', o_text: '分析形势' }] },
        { q_no: 2, q_text: '你在团队中通常扮演什么角色？', options: [{ o_no: 'A', o_text: '领导者' }, { o_no: 'B', o_text: '气氛制造者' }, { o_no: 'C', o_text: '协调者' }, { o_no: 'D', o_text: '分析师' }] },
        { q_no: 3, q_text: '你更喜欢什么样的工作环境？', options: [{ o_no: 'A', o_text: '竞争激烈' }, { o_no: 'B', o_text: '受人关注' }, { o_no: 'C', o_text: '和谐友好' }, { o_no: 'D', o_text: '安静有序' }] },
        { q_no: 4, q_text: '做决策时，你更依赖？', options: [{ o_no: 'A', o_text: '果断直觉' }, { o_no: 'B', o_text: '他人反馈' }, { o_no: 'C', o_text: '过往经验' }, { o_no: 'D', o_text: '深度思考' }] },
        { q_no: 5, q_text: '你理想的周末是？', options: [{ o_no: 'A', o_text: '完成重要任务' }, { o_no: 'B', o_text: '社交派对' }, { o_no: 'C', o_text: '安静休息' }, { o_no: 'D', o_text: '阅读学习' }] },
        { q_no: 6, q_text: '与陌生人交流时，你通常是？', options: [{ o_no: 'A', o_text: '主动握手' }, { o_no: 'B', o_text: '热情寒暄' }, { o_no: 'C', o_text: '友好微笑' }, { o_no: 'D', o_text: '点头示意' }] },
        { q_no: 7, q_text: '你更喜欢什么样的朋友？', options: [{ o_no: 'A', o_text: '有魄力的' }, { o_no: 'B', o_text: '有趣的' }, { o_no: 'C', o_text: '忠诚的' }, { o_no: 'D', o_text: '聪明的' }] },
        { q_no: 8, q_text: '面对压力时，你倾向于？', options: [{ o_no: 'A', o_text: '迎难而上' }, { o_no: 'B', o_text: '倾诉发泄' }, { o_no: 'C', o_text: '默默承受' }, { o_no: 'D', o_text: '分析原因' }] },
        { q_no: 9, q_text: '你更看重什么品质？', options: [{ o_no: 'A', o_text: '勇气和力量' }, { o_no: 'B', o_text: '魅力和表现' }, { o_no: 'C', o_text: '耐心和稳定' }, { o_no: 'D', o_text: '智慧和谨慎' }] },
        { q_no: 10, q_text: '你的表达风格是？', options: [{ o_no: 'A', o_text: '简洁有力' }, { o_no: 'B', o_text: '生动活泼' }, { o_no: 'C', o_text: '温和细腻' }, { o_no: 'D', o_text: '严谨准确' }] },
        { q_no: 11, q_text: '你如何处理冲突？', options: [{ o_no: 'A', o_text: '直面解决' }, { o_no: 'B', o_text: '用幽默化解' }, { o_no: 'C', o_text: '保持和谐' }, { o_no: 'D', o_text: '找规律解决' }] },
        { q_no: 12, q_text: '你更喜欢什么样的生活方式？', options: [{ o_no: 'A', o_text: '充满挑战' }, { o_no: 'B', o_text: '精彩多样' }, { o_no: 'C', o_text: '平静安稳' }, { o_no: 'D', o_text: '井井有条' }] },
        { q_no: 13, q_text: '你在公众场合的表现？', options: [{ o_no: 'A', o_text: '充满自信' }, { o_no: 'B', o_text: '魅力四射' }, { o_no: 'C', o_text: '低调谦逊' }, { o_no: 'D', o_text: '沉稳内敛' }] },
        { q_no: 14, q_text: '你如何对待规则？', options: [{ o_no: 'A', o_text: '制定规则' }, { o_no: 'B', o_text: '灵活运用' }, { o_no: 'C', o_text: '遵守规则' }, { o_no: 'D', o_text: '质疑完善' }] },
        { q_no: 15, q_text: '你理想中的成功是？', options: [{ o_no: 'A', o_text: '掌控全局' }, { o_no: 'B', o_text: '万众瞩目' }, { o_no: 'C', o_text: '受人信赖' }, { o_no: 'D', o_text: '洞察一切' }] }
      ],
      attachment_style: [
        { q_no: 1, q_text: '恋爱中，我常常担心对方是否真的爱我', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 2, q_text: '我担心伴侣会离开我', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 3, q_text: '我想亲近伴侣，但有时会吓跑对方', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 4, q_text: '我经常担心感情不会长久', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 5, q_text: '当伴侣与我太亲近时，我会感到不适', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 6, q_text: '我很难完全信任伴侣', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 7, q_text: '我担心如果和伴侣太亲近，会伤害到自己', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 8, q_text: '我经常幻想我的伴侣会抛弃我', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 9, q_text: '当伴侣不像我期待的那样亲密时，我会感到沮丧', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 10, q_text: '我更喜欢保持一定的情感距离', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 11, q_text: '我不太习惯太亲近的关系', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 12, q_text: '当伴侣对我太好时，我会感到不自在', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 13, q_text: '我享受独立自主的感觉', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 14, q_text: '我不喜欢依赖别人，也不喜欢被别人依赖', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 15, q_text: '恋爱关系中，保持自我空间很重要', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 16, q_text: '我会压抑自己的情感需求', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 17, q_text: '我很难向伴侣敞开心扉', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] },
        { q_no: 18, q_text: '我觉得自己可以不需要恋爱也能过得很好', options: [{ o_no: 'A', o_text: '非常不符合' }, { o_no: 'B', o_text: '不太符合' }, { o_no: 'C', o_text: '比较符合' }, { o_no: 'D', o_text: '非常符合' }] }
      ],
      emotion_stress: [
        { q_no: 1, q_text: '我感到心情愉快', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 2, q_text: '我对未来充满希望', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 3, q_text: '我感到自己是有价值的人', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 4, q_text: '我能够集中注意力', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 5, q_text: '我感到不安和紧张', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 6, q_text: '我能够享受生活', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 7, q_text: '我感到失落和沮丧', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 8, q_text: '我对自己失去信心', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 9, q_text: '我觉得所有事情都会好起来的', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 10, q_text: '我感到恐慌和害怕', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 11, q_text: '我觉得生活是有意义的', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 12, q_text: '我感到心慌和呼吸困难', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 13, q_text: '我能够理性地处理问题', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 14, q_text: '我因为一些小事而烦恼', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 15, q_text: '我能够睡个好觉', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 16, q_text: '我感到无法掌控自己的生活', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 17, q_text: '我能够应对日常压力', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 18, q_text: '我感到情绪低落', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 19, q_text: '我感到莫名的担忧', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 20, q_text: '我感到人生很美好', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] },
        { q_no: 21, q_text: '我感到疲惫不堪', options: [{ o_no: 'A', o_text: '从未' }, { o_no: 'B', o_text: '偶尔' }, { o_no: 'C', o_text: '有时' }, { o_no: 'D', o_text: '经常' }] }
      ]
    };
    return questionsMap[testId] || [];
  },

  selectOption: function (e) {
    const qIndex = parseInt(e.currentTarget.dataset.qindex);
    const optIdx = parseInt(e.currentTarget.dataset.optionindex);
    const question = this.data.questions[qIndex];
    
    // 防御性检查
    if (!question || !question.options || !question.options[optIdx]) {
      console.error('Option not found:', { qIndex, optIdx, question });
      return;
    }
    
    const option = question.options[optIdx];
    let score = 0;
    
    // 计算分数
    if (this.data.testId === 'love_brain') {
      score = option.o_no === 'B' ? 1 : 0;
    } else if (this.data.testId === 'attachment_style' || this.data.testId === 'emotion_stress' || this.data.testId === 'animal_persona') {
      score = optIdx + 1;
    } else {
      score = optIdx;
    }
    
    // 创建新的answers数组
    const newAnswers = [...this.data.answers];
    newAnswers[qIndex] = {
      selected: optIdx,
      o_no: option.o_no,
      score: score
    };
    
    this.setData({ answers: newAnswers });
    
    // 自动跳转到下一题
    if (qIndex < this.data.questions.length - 1) {
      setTimeout(() => {
        this.setData({ currentIndex: qIndex + 1 });
      }, 300);
    }
  },

  nextQuestion: function () {
    const { currentIndex, answers, questions } = this.data;
    
    if (currentIndex < questions.length - 1) {
      this.setData({ currentIndex: currentIndex + 1 });
    }
  },

  prevQuestion: function () {
    const { currentIndex } = this.data;
    if (currentIndex > 0) {
      this.setData({ currentIndex: currentIndex - 1 });
    }
  },

  submitTest: function () {
    const { currentIndex, answers } = this.data;
    
    if (answers[currentIndex] === null) {
      wx.showToast({ title: '请先选择答案', icon: 'none' });
      return;
    }
    
    // 检查是否所有题目都已作答
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      wx.showModal({
        title: '提示',
        content: `还有${unanswered}道题目未作答，是否提交？`,
        success: res => {
          if (res.confirm) {
            this.doSubmit();
          }
        }
      });
    } else {
      this.doSubmit();
    }
  },

  doSubmit: function () {
    wx.showLoading({ title: '提交中...' });
    
    // 先尝试提交到云端
    wx.cloud.callFunction({
      name: 'submitTest',
      data: {
        test_id: this.data.testId,
        answers: this.data.answers
      },
      success: res => {
        wx.hideLoading();
        if (res.result && res.result.success) {
          // 云端保存成功，使用云端结果
          const result = res.result;
          const resultRoute = RESULT_ROUTES[this.data.testId] || `/pages/result/result`;
          wx.navigateTo({
            url: `${resultRoute}?test_id=${this.data.testId}&result_data=${encodeURIComponent(JSON.stringify(result))}&record_id=${result.record_id || ''}`
          });
        } else {
          // 云端失败，使用本地计算结果
          const result = this.calculateLocalResult();
          const resultRoute = RESULT_ROUTES[this.data.testId] || `/pages/result/result`;
          wx.navigateTo({
            url: `${resultRoute}?test_id=${this.data.testId}&result_data=${encodeURIComponent(JSON.stringify(result))}`
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('Submit failed:', err);
        // 使用本地计算结果
        const result = this.calculateLocalResult();
        const resultRoute = RESULT_ROUTES[this.data.testId] || `/pages/result/result`;
        wx.navigateTo({
          url: `${resultRoute}?test_id=${this.data.testId}&result_data=${encodeURIComponent(JSON.stringify(result))}`
        });
      }
    });
  },

  calculateLocalResult: function () {
    const { testId, answers } = this.data;
    
    let result = { test_id: testId, scores: {}, result: {} };
    
    switch (testId) {
      case 'mbti': {
        let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
        answers.forEach((answer, index) => {
          if (!answer) return;
          const isRight = answer.score === 1; // 选B=1表示右维度
          const dimIndex = index % 4;
          if (dimIndex === 0) isRight ? I++ : E++;
          if (dimIndex === 1) isRight ? N++ : S++;
          if (dimIndex === 2) isRight ? F++ : T++;
          if (dimIndex === 3) isRight ? P++ : J++;
        });
        result.scores = { E, I, S, N, T, F, J, P };
        let mbti = '';
        mbti += E >= I ? 'E' : 'I';
        mbti += S >= N ? 'S' : 'N';
        mbti += T >= F ? 'T' : 'F';
        mbti += J >= P ? 'J' : 'P';
        result.result = { resultCode: mbti, type_name: mbti, emoji: '🎭', description: '你的MBTI人格类型是' + mbti };
        break;
      }
      case 'love_brain': {
        let sunk_cost = 0, idealization = 0, emotional_dependency = 0, irrational = 0;
        answers.forEach((answer, index) => {
          if (answer.score === 1) {
            const dimIndex = index % 4;
            if (dimIndex === 0) sunk_cost++;
            if (dimIndex === 1) idealization++;
            if (dimIndex === 2) emotional_dependency++;
            if (dimIndex === 3) irrational++;
          }
        });
        result.scores = { sunk_cost, idealization, emotional_dependency, irrational };
        const total = sunk_cost + idealization + emotional_dependency + irrational;
        let level = '正常', emoji = '🧠', desc = '你能够在恋爱中保持理性';
        if (total >= 10) { level = '重度恋爱脑'; emoji = '💔'; desc = '你很容易在恋爱中失去理性，需要重新找回自我'; }
        else if (total >= 5) { level = '中度恋爱脑'; emoji = '💕'; desc = '你在恋爱中比较容易上头，需要学会更多关注自己'; }
        else if (total >= 2) { level = '轻度恋爱脑'; emoji = '💭'; desc = '你偶尔会有些恋爱脑倾向，但总体可控'; }
        result.result = { resultCode: level, type_name: level, emoji, description: desc };
        break;
      }
      case 'animal_persona': {
        let lion = 0, peacock = 0, koala = 0, owl = 0;
        answers.forEach(answer => {
          if (!answer) return;
          // 直接根据选项字母分配：A=lion, B=peacock, C=koala, D=owl
          if (answer.o_no === 'A') lion++;
          else if (answer.o_no === 'B') peacock++;
          else if (answer.o_no === 'C') koala++;
          else if (answer.o_no === 'D') owl++;
        });
        result.scores = { lion, peacock, koala, owl };
        const max = Math.max(lion, peacock, koala, owl);
        let animal = 'lion', animalInfo = { name: '狮子型', emoji: '🦁', desc: '你是一个天生的领导者，自信、勇敢、有魄力' };
        if (max === peacock) { animal = 'peacock'; animalInfo = { name: '孔雀型', emoji: '🦚', desc: '你魅力四射，善于社交' }; }
        else if (max === koala) { animal = 'koala'; animalInfo = { name: '考拉型', emoji: '🐨', desc: '你温柔善良，是很好的倾听者' }; }
        else if (max === owl) { animal = 'owl'; animalInfo = { name: '猫头鹰型', emoji: '🦉', desc: '你聪明谨慎，注重细节和分析' }; }
        result.result = { resultCode: animal, ...animalInfo, description: animalInfo.desc };
        break;
      }
      case 'attachment_style': {
        let anxiety = 0, avoidance = 0;
        answers.forEach((answer, index) => {
          const score = answer.score || 0;
          if (index < 9) anxiety += score;
          else avoidance += score;
        });
        result.scores = { anxiety, avoidance };
        const avgAnxiety = anxiety / 9;
        const avgAvoidance = avoidance / 9;
        let style = 'secure', styleInfo = { name: '安全型', emoji: '💞', desc: '你能够健康地投入感情，既能保持独立又能亲密' };
        if (avgAnxiety >= 3 && avgAvoidance < 3) { style = 'anxious'; styleInfo = { name: '焦虑型', emoji: '💔', desc: '你渴望亲密但经常担心被抛弃，情绪波动较大' }; }
        else if (avgAnxiety < 3 && avgAvoidance >= 3) { style = 'avoidant'; styleInfo = { name: '回避型', emoji: '🚪', desc: '你重视独立，可能难以与人建立深度连接' }; }
        else if (avgAnxiety >= 3 && avgAvoidance >= 3) { style = 'fearful'; styleInfo = { name: '恐惧型', emoji: '😰', desc: '你既渴望亲密又害怕被伤害，内心充满矛盾' }; }
        result.result = { resultCode: style, type_name: styleInfo.name, emoji: styleInfo.emoji, description: styleInfo.desc };
        break;
      }
      case 'emotion_stress': {
        let depression = 0, anxiety = 0, stress = 0;
        // DASS-21 反向题索引(0-based)：积极情绪题需要反转
        // 正向题(消极): 5,7,8,10,12,14,16,18,19,21 → 0-indexed: 4,6,7,9,11,13,15,17,18,20
        // 反向题(积极): 1,2,3,4,6,9,11,13,15,17,20 → 0-indexed: 0,1,2,3,5,8,10,12,14,16,19
        const reverseItems = [0,1,2,3,5,8,10,12,14,16,19];
        answers.forEach((answer, index) => {
          if (!answer) return;
          // score = optIdx + 1，范围 1-4
          let rawScore = (answer.score || 1) - 1; // 转为 0-3
          if (reverseItems.includes(index)) {
            rawScore = 3 - rawScore; // 反向：0→3, 1→2, 2→1, 3→0
          }
          if (index < 7) depression += rawScore;
          else if (index < 14) anxiety += rawScore;
          else stress += rawScore;
        });
        result.scores = { depression, anxiety, stress };
        const total = depression + anxiety + stress;
        let level = '正常', levelInfo = { name: '正常', emoji: '😊', desc: '你的心理健康状况良好，能够有效应对日常压力' };
        if (total >= 42) { level = '严重'; levelInfo = { name: '需要关注', emoji: '😢', desc: '你的心理状态需要专业关注，建议寻求心理咨询' }; }
        else if (total >= 28) { level = '中度'; levelInfo = { name: '中度困扰', emoji: '😟', desc: '你正在经历一些心理困扰，建议关注自己的情绪状态' }; }
        else if (total >= 14) { level = '轻度'; levelInfo = { name: '轻度困扰', emoji: '😌', desc: '你有一些轻微的情绪困扰，但总体可控' }; }
        result.result = { resultCode: level, type_name: levelInfo.name, emoji: levelInfo.emoji, description: levelInfo.desc };
        break;
      }
    }
    return result;
  },

  onShareAppMessage: function () {
    app.claimShareReward();
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      path: '/pages/index/index'
    };
  }
});
