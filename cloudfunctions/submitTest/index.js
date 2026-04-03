const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// 结果类型定义
const resultsData = {
  mbti: {
    'INTJ': { type_name: '建筑师', emoji: '🏗️', description: '富有想象力和战略性的思想家，一切都在他们的掌握之中。', strengths: ['独立思考', '战略眼光', '高标准'], weaknesses: ['过于挑剔', '不善于表达情感', '可能显得冷漠'] },
    'INTP': { type_name: '逻辑学家', emoji: '🔬', description: '创新的发明家，对知识充满渴望。', strengths: ['逻辑思维', '创新能力', '分析能力'], weaknesses: ['脱离实际', '健忘', '不善社交'] },
    'ENTJ': { type_name: '指挥官', emoji: '⚔️', description: '大胆、富有想象力且意志强大的领导者。', strengths: ['领导能力', '决策果断', '自信'], weaknesses: ['急躁', '缺乏耐心', '可能专横'] },
    'ENTP': { type_name: '辩论家', emoji: '💡', description: '聪明好奇的思考者，喜欢智力挑战。', strengths: ['机智', '创造力', '社交能力'], weaknesses: ['争论不休', '三分钟热度', '忽视情绪'] },
    'INFJ': { type_name: '倡导者', emoji: '🌟', description: '安静而神秘，有强烈的理想和原则。', strengths: ['同理心', '洞察力', '创造力'], weaknesses: ['完美主义', '不切实际', '难以拒绝他人'] },
    'INFP': { type_name: '调停者', emoji: '🎨', description: '诗意、善良的利他主义者。', strengths: ['理想主义', '善良', '适应力强'], weaknesses: ['过于理想化', '情绪化', '自我封闭'] },
    'ENFJ': { type_name: '主人公', emoji: '🎭', description: '魅力非凡的领导者，能够激励他人。', strengths: ['魅力', '感染力', '责任感'], weaknesses: ['过于理想化', '控制欲', '取悦他人'] },
    'ENFP': { type_name: '竞选者', emoji: '🎪', description: '热情、富有想象力的创意者。', strengths: ['热情', '创意', '社交能力'], weaknesses: ['容易分心', '情绪波动', '计划性差'] },
    'ISTJ': { type_name: '物流师', emoji: '📦', description: '实事求是的管理者，可靠且高效。', strengths: ['可靠', '责任感', '效率高'], weaknesses: ['死板', '难以接受变化', '不善于表达'] },
    'ISFJ': { type_name: '守护者', emoji: '🛡️', description: '温暖而守护的照顾者，随时准备保护所爱的人。', strengths: ['可靠', '耐心', '细腻'], weaknesses: ['忽视自己需求', '难以拒绝', '过度自我牺牲'] },
    'ESTJ': { type_name: '总经理', emoji: '👔', description: '出色的管理者，在商业或谈判方面表现出色。', strengths: ['组织能力', '执行力', '可靠性'], weaknesses: ['固执', '不善于变通', '忽视情感'] },
    'ESFJ': { type_name: '执政官', emoji: '🤝', description: '热情、有爱心的社交者，是连接和组织的核心。', strengths: ['社交能力', '责任感', '善良'], weaknesses: ['爱面子', '过于在意他人', '难以应对冲突'] },
    'ISTP': { type_name: '鉴赏家', emoji: '🔧', description: '大胆而实用的实验家，善于理解机械原理。', strengths: ['动手能力', '理性', '适应力'], weaknesses: ['冷漠', '冒险', '不善表达'] },
    'ISFP': { type_name: '探险家', emoji: '🎨', description: '灵活有魅力的艺术家，随时准备探索新事物。', strengths: ['艺术天赋', '观察力', '适应力'], weaknesses: ['容易迷茫', '逃避冲突', '过度自我放纵'] },
    'ESTP': { type_name: '企业家', emoji: '🚀', description: '聪明、精力充沛的观察者，善于解决即时问题。', strengths: ['行动力', '实操能力', '社交能力'], weaknesses: ['注意力短暂', '忽视长期后果', '冲动'] },
    'ESFP': { type_name: '表演者', emoji: '🎤', description: '自发的、精力充沛的表演者，喜欢成为关注的焦点。', strengths: ['魅力', '热情', '社交能力'], weaknesses: ['注意力分散', '讨厌独处', '冲动'] }
  },
  love_brain: {
    'normal': { type_name: '理性恋爱', emoji: '🧠', description: '你能够在恋爱中保持理性，不会被感情冲昏头脑。', strengths: ['独立自主', '边界清晰', '情绪稳定'], weaknesses: ['可能显得冷漠', '不够浪漫', '难以全身心投入'] },
    'mild': { type_name: '轻度恋爱脑', emoji: '💭', description: '你在恋爱中偶尔会有些恋爱脑倾向，但总体可控。', strengths: ['有激情', '愿意付出', '感情丰富'], weaknesses: ['偶尔冲动', '有时忽略理性', '容易患得患失'] },
    'moderate': { type_name: '中度恋爱脑', emoji: '💕', description: '你在恋爱中比较容易上头，需要学会更多关注自己。', strengths: ['全情投入', '浪漫', '专一'], weaknesses: ['容易失去自我', '过度依赖对方', '判断力下降'] },
    'severe': { type_name: '重度恋爱脑', emoji: '💔', description: '你很容易在恋爱中失去理性，需要重新找回自我。', strengths: ['深情', '执着', '愿意为爱付出一切'], weaknesses: ['严重失去自我', '无法理性思考', '容易受伤', '忽视亲友'] }
  },
  animal_persona: {
    lion: { type_name: '狮子型', emoji: '🦁', description: '你是一个天生的领导者，自信、勇敢、有魄力。', strengths: ['领导力', '自信', '决策力'], weaknesses: ['可能显得霸道', '控制欲强', '忽视他人感受'] },
    peacock: { type_name: '孔雀型', emoji: '🦚', description: '你魅力四射，善于社交，是人群中的焦点。', strengths: ['社交能力', '魅力', '表达能力'], weaknesses: ['需要持续关注', '可能虚荣', '难以接受批评'] },
    koala: { type_name: '考拉型', emoji: '🐨', description: '你温柔善良，是很好的倾听者和支持者。', strengths: ['善良', '忠诚', '耐心'], weaknesses: ['过于顺从', '回避冲突', '容易焦虑'] },
    owl: { type_name: '猫头鹰型', emoji: '🦉', description: '你聪明谨慎，注重细节和分析。', strengths: ['分析能力', '谨慎', '专业'], weaknesses: ['过于挑剔', '情感表达不足', '容易过度分析'] }
  },
  attachment_style: {
    secure: { type_name: '安全型', emoji: '💞', description: '你能够健康地投入感情，既能保持独立又能亲密。', strengths: ['情感稳定', '沟通良好', '信任他人'], weaknesses: ['可能过于乐观', '忽视危险信号'] },
    anxious: { type_name: '焦虑型', emoji: '💔', description: '你渴望亲密但经常担心被抛弃，情绪波动较大。', strengths: ['热情', '投入', '善于表达需求'], weaknesses: ['过度依赖', '情绪不稳定', '容易焦虑'] },
    avoidant: { type_name: '回避型', emoji: '🚪', description: '你重视独立，可能难以与人建立深度连接。', strengths: ['独立', '自主', '情绪稳定'], weaknesses: ['难以亲密', '压抑情感', '可能冷漠'] },
    fearful: { type_name: '恐惧型', emoji: '😰', description: '你既渴望亲密又害怕被伤害，内心充满矛盾。', strengths: ['敏感', '直觉强', '有洞察力'], weaknesses: ['情绪不稳定', '难以信任', '害怕承诺'] }
  },
  emotion_stress: {
    normal: { type_name: '正常', emoji: '😊', description: '你的心理健康状况良好，能够有效应对日常压力。', strengths: ['情绪稳定', '适应力强', '心态积极'], weaknesses: ['可能忽视自己的负面情绪'] },
    mild: { type_name: '轻度困扰', emoji: '😌', description: '你有一些轻微的情绪困扰，但总体可控。', strengths: ['自我意识', '愿意寻求帮助'], weaknesses: ['偶有焦虑', '应对能力有限'] },
    moderate: { type_name: '中度困扰', emoji: '😟', description: '你正在经历一些心理困扰，建议关注自己的情绪状态。', strengths: ['自知之明', '有改变意愿'], weaknesses: ['情绪波动大', '难以自我调节', '可能影响生活'] },
    severe: { type_name: '需要关注', emoji: '😢', description: '你的心理状态需要专业关注，建议寻求心理咨询或治疗。', strengths: ['愿意面对问题'], weaknesses: ['情绪低落', '睡眠问题', '难以正常工作生活'] }
  }
};

// 计分函数
const calculateScores = (test_id, answers, questions) => {
  const scores = {};
  
  switch (test_id) {
    case 'mbti': {
      let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
      answers.forEach((answer, index) => {
        const score = answer.score || 0;
        const dimIndex = index % 4;
        if (dimIndex === 0) score <= 2 ? E += score : I += score;
        if (dimIndex === 1) score <= 2 ? S += score : N += score;
        if (dimIndex === 2) score <= 2 ? T += score : F += score;
        if (dimIndex === 3) score <= 2 ? J += score : P += score;
      });
      scores.E = E; scores.I = I; scores.S = S; scores.N = N;
      scores.T = T; scores.F = F; scores.J = J; scores.P = P;
      break;
    }
    case 'love_brain': {
      let sunk_cost = 0, idealization = 0, emotional_dependency = 0, irrational = 0;
      answers.forEach((answer, index) => {
        if (answer.selected === 1) { // B选项
          const dimIndex = index % 4;
          if (dimIndex === 0) sunk_cost++;
          if (dimIndex === 1) idealization++;
          if (dimIndex === 2) emotional_dependency++;
          if (dimIndex === 3) irrational++;
        }
      });
      scores.sunk_cost = sunk_cost;
      scores.idealization = idealization;
      scores.emotional_dependency = emotional_dependency;
      scores.irrational = irrational;
      break;
    }
    case 'animal_persona': {
      let lion = 0, peacock = 0, koala = 0, owl = 0;
      answers.forEach(answer => {
        const score = answer.score || 0;
        if (score <= 2) lion += score;
        else if (score <= 4) peacock += score;
        else if (score <= 6) koala += score;
        else owl += score;
      });
      scores.lion = lion; scores.peacock = peacock;
      scores.koala = koala; scores.owl = owl;
      break;
    }
    case 'attachment_style': {
      let anxiety = 0, avoidance = 0;
      answers.forEach((answer, index) => {
        const score = answer.score || 0;
        if (index < 9) anxiety += score;
        else avoidance += score;
      });
      scores.anxiety = anxiety; scores.avoidance = avoidance;
      break;
    }
    case 'emotion_stress': {
      let depression = 0, anxiety = 0, stress = 0;
      const reverseQuestions = [5, 7, 8, 10, 12, 14, 16, 18, 20];
      answers.forEach((answer, index) => {
        let score = answer.score || 0;
        if (reverseQuestions.includes(index)) {
          score = 3 - score;
        }
        if (index < 7) depression += score;
        else if (index < 14) anxiety += score;
        else stress += score;
      });
      scores.depression = depression;
      scores.anxiety = anxiety;
      scores.stress = stress;
      break;
    }
  }
  return scores;
};

// 获取结果
const getResult = (test_id, scores) => {
  let resultCode = '';
  
  switch (test_id) {
    case 'mbti': {
      let mbti = '';
      mbti += scores.E >= scores.I ? 'E' : 'I';
      mbti += scores.S >= scores.N ? 'S' : 'N';
      mbti += scores.T >= scores.F ? 'T' : 'F';
      mbti += scores.J >= scores.P ? 'J' : 'P';
      resultCode = mbti;
      break;
    }
    case 'love_brain': {
      const total = Object.values(scores).reduce((a, b) => a + b, 0);
      if (total >= 10) resultCode = 'severe';
      else if (total >= 5) resultCode = 'moderate';
      else if (total >= 2) resultCode = 'mild';
      else resultCode = 'normal';
      break;
    }
    case 'animal_persona': {
      const max = Math.max(...Object.values(scores));
      resultCode = Object.keys(scores).find(k => scores[k] === max) || 'lion';
      break;
    }
    case 'attachment_style': {
      const avgAnxiety = scores.anxiety / 9;
      const avgAvoidance = scores.avoidance / 9;
      if (avgAnxiety < 3 && avgAvoidance < 3) resultCode = 'secure';
      else if (avgAnxiety >= 3 && avgAvoidance < 3) resultCode = 'anxious';
      else if (avgAnxiety < 3 && avgAvoidance >= 3) resultCode = 'avoidant';
      else resultCode = 'fearful';
      break;
    }
    case 'emotion_stress': {
      const total = scores.depression + scores.anxiety + scores.stress;
      if (total >= 42) resultCode = 'severe';
      else if (total >= 28) resultCode = 'moderate';
      else if (total >= 14) resultCode = 'mild';
      else resultCode = 'normal';
      break;
    }
  }
  
  const resultInfo = resultsData[test_id][resultCode] || resultsData[test_id][Object.keys(resultsData[test_id])[0]];
  return { resultCode, ...resultInfo };
};

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const { test_id, answers } = event;
  
  if (!test_id || !answers || !Array.isArray(answers)) {
    return { success: false, error: 'Invalid parameters' };
  }
  
  const openid = wxContext.OPENID;
  
  try {
    // 检查用户次数
    const userRes = await db.collection('users').where({ openid }).get();
    if (userRes.data.length === 0) {
      return { success: false, error: 'User not found, please login first' };
    }
    
    const user = userRes.data[0];
    if (user.free_times <= 0) {
      return { success: false, error: 'No remaining times, please purchase more' };
    }
    
    // 获取题目进行计分
    const questions = require('./questions.js')[test_id] || [];
    const scores = calculateScores(test_id, answers, questions);
    const result = getResult(test_id, scores);
    
    // 保存记录
    const record = {
      openid,
      test_id,
      answers,
      scores,
      result,
      completed_at: new Date()
    };
    
    await db.collection('user_records').add({ data: record });
    
    // 扣减次数
    await db.collection('users').where({ openid }).update({
      data: {
        free_times: db.command.inc(-1),
        updated_at: new Date()
      }
    });
    
    return {
      success: true,
      scores,
      result,
      remaining_times: user.free_times - 1
    };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
