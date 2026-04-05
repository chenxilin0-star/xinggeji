const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const questionsData = {
  mbti: [
    { q_no: 1, q_text: '在社交聚会中，你通常是：', options: [{ o_no: 'A', o_text: '主动和很多人交流', scores: [2, 0] }, { o_no: 'B', o_text: '只和熟悉的人聊天', scores: [0, 2] }] },
    { q_no: 2, q_text: '你更倾向于：', options: [{ o_no: 'A', o_text: '现实可行', scores: [2, 0] }, { o_no: 'B', o_text: '富有想象力', scores: [0, 2] }] },
    { q_no: 3, q_text: '做决定时，你更看重：', options: [{ o_no: 'A', o_text: '事实和逻辑', scores: [2, 0] }, { o_no: 'B', o_text: '情感和价值观', scores: [0, 2] }] },
    { q_no: 4, q_text: '你更喜欢：', options: [{ o_no: 'A', o_text: '有计划有安排', scores: [2, 0] }, { o_no: 'B', o_text: '随性灵活', scores: [0, 2] }] },
    { q_no: 5, q_text: '独处时，你通常会：', options: [{ o_no: 'A', o_text: '感到精力充沛', scores: [2, 0] }, { o_no: 'B', o_text: '需要社交来充电', scores: [0, 2] }] },
    { q_no: 6, q_text: '面对问题时，你喜欢：', options: [{ o_no: 'A', o_text: '关注具体细节', scores: [2, 0] }, { o_no: 'B', o_text: '思考可能性', scores: [0, 2] }] },
    { q_no: 7, q_text: '在与他人争论时，你更在意：', options: [{ o_no: 'A', o_text: '客观真相', scores: [2, 0] }, { o_no: 'B', o_text: '对方感受', scores: [0, 2] }] },
    { q_no: 8, q_text: '你的生活节奏：', options: [{ o_no: 'A', o_text: '按计划进行', scores: [2, 0] }, { o_no: 'B', o_text: '随机应变', scores: [0, 2] }] },
    { q_no: 9, q_text: '你更喜欢的工作环境：', options: [{ o_no: 'A', o_text: '热闹活跃', scores: [2, 0] }, { o_no: 'B', o_text: '安静独立', scores: [0, 2] }] },
    { q_no: 10, q_text: '学习新事物时，你更关注：', options: [{ o_no: 'A', o_text: '实际操作', scores: [2, 0] }, { o_no: 'B', o_text: '理论概念', scores: [0, 2] }] },
    { q_no: 11, q_text: '你容易被什么打动：', options: [{ o_no: 'A', o_text: '有力的论证', scores: [2, 0] }, { o_no: 'B', o_text: '感人的故事', scores: [0, 2] }] },
    { q_no: 12, q_text: '面对约定，你会：', options: [{ o_no: 'A', o_text: '提前规划', scores: [2, 0] }, { o_no: 'B', o_text: '看情况', scores: [0, 2] }] },
    { q_no: 13, q_text: '空闲时间，你更喜欢：', options: [{ o_no: 'A', o_text: '阅读或思考', scores: [2, 0] }, { o_no: 'B', o_text: '参加活动', scores: [0, 2] }] },
    { q_no: 14, q_text: '你解决问题的方式：', options: [{ o_no: 'A', o_text: '按步骤分析', scores: [2, 0] }, { o_no: 'B', o_text: '凭直觉', scores: [0, 2] }] },
    { q_no: 15, q_text: '你的沟通风格：', options: [{ o_no: 'A', o_text: '直接明了', scores: [2, 0] }, { o_no: 'B', o_text: '委婉温和', scores: [0, 2] }] },
    { q_no: 16, q_text: '你更喜欢的生活：', options: [{ o_no: 'A', o_text: '结构化', scores: [2, 0] }, { o_no: 'B', o_text: '自由开放', scores: [0, 2] }] },
    { q_no: 17, q_text: '当认识新朋友时，你通常是：', options: [{ o_no: 'A', o_text: '主动开口', scores: [2, 0] }, { o_no: 'B', o_text: '等待对方', scores: [0, 2] }] },
    { q_no: 18, q_text: '你更相信：', options: [{ o_no: 'A', o_text: '经验', scores: [2, 0] }, { o_no: 'B', o_text: '灵感', scores: [0, 2] }] },
    { q_no: 19, q_text: '做选择时，你会被：', options: [{ o_no: 'A', o_text: '逻辑分析吸引', scores: [2, 0] }, { o_no: 'B', o_text: '价值认同吸引', scores: [0, 2] }] },
    { q_no: 20, q_text: '你更喜欢：', options: [{ o_no: 'A', o_text: '确定性', scores: [2, 0] }, { o_no: 'B', o_text: '可能性', scores: [0, 2] }] }
  ],
  love_brain: [
    { q_no: 1, q_text: '分手后，你会反复查看前任的社交动态吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 2, q_text: '恋爱中，你会为对方放弃自己的爱好吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 3, q_text: '对方没有及时回复，你会胡思乱想吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 4, q_text: '你会为了维系感情而委屈自己吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 5, q_text: '吵架后，你会先低头认错吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 6, q_text: '你会把对方理想化，觉得对方完美无缺吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 7, q_text: '恋爱后，你的朋友社交减少了吗？', options: [{ o_no: 'A', o_text: '没有', scores: [1, 0] }, { o_no: 'B', o_text: '减少了', scores: [0, 1] }] },
    { q_no: 8, q_text: '你会无条件原谅对方的错误吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 9, q_text: '对方提出分手，你会纠缠吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 10, q_text: '你会因为恋爱而影响工作/学习吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 11, q_text: '你会经常幻想和对方的未来吗？', options: [{ o_no: 'A', o_text: '偶尔', scores: [1, 0] }, { o_no: 'B', o_text: '经常', scores: [0, 1] }] },
    { q_no: 12, q_text: '恋爱中，你会失去自我吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 13, q_text: '你会为了对方改变自己的原则吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] },
    { q_no: 14, q_text: '对方的需求总是优先于自己的需求吗？', options: [{ o_no: 'A', o_text: '不是', scores: [1, 0] }, { o_no: 'B', o_text: '是的', scores: [0, 1] }] },
    { q_no: 15, q_text: '分手后，你会很长时间走不出来吗？', options: [{ o_no: 'A', o_text: '不会', scores: [0, 1] }, { o_no: 'B', o_text: '会的', scores: [1, 0] }] }
  ],
  animal_persona: [
    { q_no: 1, q_text: '面对挑战时，你的第一反应是？', options: [{ o_no: 'A', o_text: '主动出击', scores: 1 }, { o_no: 'B', o_text: '优雅展示', scores: 3 }, { o_no: 'C', o_text: '耐心等待', scores: 5 }, { o_no: 'D', o_text: '分析形势', scores: 7 }] },
    { q_no: 2, q_text: '你在团队中通常扮演什么角色？', options: [{ o_no: 'A', o_text: '领导者', scores: 1 }, { o_no: 'B', o_text: '气氛制造者', scores: 3 }, { o_no: 'C', o_text: '协调者', scores: 5 }, { o_no: 'D', o_text: '分析师', scores: 7 }] },
    { q_no: 3, q_text: '你更喜欢什么样的工作环境？', options: [{ o_no: 'A', o_text: '竞争激烈', scores: 1 }, { o_no: 'B', o_text: '受人关注', scores: 3 }, { o_no: 'C', o_text: '和谐友好', scores: 5 }, { o_no: 'D', o_text: '安静有序', scores: 7 }] },
    { q_no: 4, q_text: '做决策时，你更依赖？', options: [{ o_no: 'A', o_text: '果断直觉', scores: 1 }, { o_no: 'B', o_text: '他人反馈', scores: 3 }, { o_no: 'C', o_text: '过往经验', scores: 5 }, { o_no: 'D', o_text: '深度思考', scores: 7 }] },
    { q_no: 5, q_text: '你理想的周末是？', options: [{ o_no: 'A', o_text: '完成重要任务', scores: 1 }, { o_no: 'B', o_text: '社交派对', scores: 3 }, { o_no: 'C', o_text: '安静休息', scores: 5 }, { o_no: 'D', o_text: '阅读学习', scores: 7 }] },
    { q_no: 6, q_text: '与陌生人交流时，你通常是？', options: [{ o_no: 'A', o_text: '主动握手', scores: 1 }, { o_no: 'B', o_text: '热情寒暄', scores: 3 }, { o_no: 'C', o_text: '友好微笑', scores: 5 }, { o_no: 'D', o_text: '点头示意', scores: 7 }] },
    { q_no: 7, q_text: '你更喜欢什么样的朋友？', options: [{ o_no: 'A', o_text: '有魄力的', scores: 1 }, { o_no: 'B', o_text: '有趣的', scores: 3 }, { o_no: 'C', o_text: '忠诚的', scores: 5 }, { o_no: 'D', o_text: '聪明的', scores: 7 }] },
    { q_no: 8, q_text: '面对压力时，你倾向于？', options: [{ o_no: 'A', o_text: '迎难而上', scores: 1 }, { o_no: 'B', o_text: '倾诉发泄', scores: 3 }, { o_no: 'C', o_text: '默默承受', scores: 5 }, { o_no: 'D', o_text: '分析原因', scores: 7 }] },
    { q_no: 9, q_text: '你更看重什么品质？', options: [{ o_no: 'A', o_text: '勇气和力量', scores: 1 }, { o_no: 'B', o_text: '魅力和表现', scores: 3 }, { o_no: 'C', o_text: '耐心和稳定', scores: 5 }, { o_no: 'D', o_text: '智慧和谨慎', scores: 7 }] },
    { q_no: 10, q_text: '你的表达风格是？', options: [{ o_no: 'A', o_text: '简洁有力', scores: 1 }, { o_no: 'B', o_text: '生动活泼', scores: 3 }, { o_no: 'C', o_text: '温和细腻', scores: 5 }, { o_no: 'D', o_text: '严谨准确', scores: 7 }] },
    { q_no: 11, q_text: '你如何处理冲突？', options: [{ o_no: 'A', o_text: '直面解决', scores: 1 }, { o_no: 'B', o_text: '用幽默化解', scores: 3 }, { o_no: 'C', o_text: '保持和谐', scores: 5 }, { o_no: 'D', o_text: '找规律解决', scores: 7 }] },
    { q_no: 12, q_text: '你更喜欢什么样的生活方式？', options: [{ o_no: 'A', o_text: '充满挑战', scores: 1 }, { o_no: 'B', o_text: '精彩多样', scores: 3 }, { o_no: 'C', o_text: '平静安稳', scores: 5 }, { o_no: 'D', o_text: '井井有条', scores: 7 }] },
    { q_no: 13, q_text: '你在公众场合的表现？', options: [{ o_no: 'A', o_text: '充满自信', scores: 1 }, { o_no: 'B', o_text: '魅力四射', scores: 3 }, { o_no: 'C', o_text: '低调谦逊', scores: 5 }, { o_no: 'D', o_text: '沉稳内敛', scores: 7 }] },
    { q_no: 14, q_text: '你如何对待规则？', options: [{ o_no: 'A', o_text: '制定规则', scores: 1 }, { o_no: 'B', o_text: '灵活运用', scores: 3 }, { o_no: 'C', o_text: '遵守规则', scores: 5 }, { o_no: 'D', o_text: '质疑完善', scores: 7 }] },
    { q_no: 15, q_text: '你理想中的成功是？', options: [{ o_no: 'A', o_text: '掌控全局', scores: 1 }, { o_no: 'B', o_text: '万众瞩目', scores: 3 }, { o_no: 'C', o_text: '受人信赖', scores: 5 }, { o_no: 'D', o_text: '洞察一切', scores: 7 }] }
  ],
  attachment_style: [
    { q_no: 1, q_text: '恋爱中，我常常担心对方是否真的爱我', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 2, q_text: '我担心伴侣会离开我', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 3, q_text: '我想亲近伴侣，但有时会吓跑对方', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 4, q_text: '我经常担心感情不会长久', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 5, q_text: '当伴侣与我太亲近时，我会感到不适', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 6, q_text: '我很难完全信任伴侣', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 7, q_text: '我担心如果和伴侣太亲近，会伤害到自己', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 8, q_text: '我经常幻想我的伴侣会抛弃我', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 9, q_text: '当伴侣不像我期待的那样亲密时，我会感到沮丧', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 10, q_text: '我更喜欢保持一定的情感距离', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 11, q_text: '我不太习惯太亲近的关系', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 12, q_text: '当伴侣对我太好时，我会感到不自在', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 13, q_text: '我享受独立自主的感觉', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 14, q_text: '我不喜欢依赖别人，也不喜欢被别人依赖', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 15, q_text: '恋爱关系中，保持自我空间很重要', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 16, q_text: '我会压抑自己的情感需求', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 17, q_text: '我很难向伴侣敞开心扉', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] },
    { q_no: 18, q_text: '我觉得自己可以不需要恋爱也能过得很好', options: [{ o_no: 'A', o_text: '非常不符合', scores: 1 }, { o_no: 'B', o_text: '不太符合', scores: 2 }, { o_no: 'C', o_text: '比较符合', scores: 3 }, { o_no: 'D', o_text: '非常符合', scores: 4 }] }
  ],
  emotion_stress: [
    { q_no: 1, q_text: '我感到心情愉快', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 2, q_text: '我对未来充满希望', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 3, q_text: '我感到自己是有价值的人', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 4, q_text: '我能够集中注意力', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 5, q_text: '我感到不安和紧张', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 6, q_text: '我能够享受生活', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 7, q_text: '我感到失落和沮丧', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 8, q_text: '我对自己失去信心', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 9, q_text: '我觉得所有事情都会好起来的', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 10, q_text: '我感到恐慌和害怕', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 11, q_text: '我觉得生活是有意义的', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 12, q_text: '我感到心慌和呼吸困难', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 13, q_text: '我能够理性地处理问题', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 14, q_text: '我因为一些小事而烦恼', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 15, q_text: '我能够睡个好觉', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 16, q_text: '我感到无法掌控自己的生活', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 17, q_text: '我能够应对日常压力', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 18, q_text: '我感到情绪低落', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 19, q_text: '我感到莫名的担忧', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] },
    { q_no: 20, q_text: '我感到人生很美好', options: [{ o_no: 'A', o_text: '从未', scores: 3 }, { o_no: 'B', o_text: '偶尔', scores: 2 }, { o_no: 'C', o_text: '有时', scores: 1 }, { o_no: 'D', o_text: '经常', scores: 0 }] },
    { q_no: 21, q_text: '我感到疲惫不堪', options: [{ o_no: 'A', o_text: '从未', scores: 0 }, { o_no: 'B', o_text: '偶尔', scores: 1 }, { o_no: 'C', o_text: '有时', scores: 2 }, { o_no: 'D', o_text: '经常', scores: 3 }] }
  ]
};

exports.main = async (event, context) => {
  const { test_id } = event;
  
  if (!test_id || !questionsData[test_id]) {
    return { success: false, error: 'Invalid test_id' };
  }
  
  return {
    success: true,
    test_id,
    questions: questionsData[test_id]
  };
};
