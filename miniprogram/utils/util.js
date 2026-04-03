const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

// 计算雷达图数据
const calculateRadar = (scores, dimensions) => {
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const range = maxScore - minScore || 1;
  
  return Object.keys(scores).map(key => ({
    name: dimensions[key] || key,
    value: ((scores[key] - minScore) / range * 100).toFixed(0)
  }));
};

// MBTI计分
const calculateMBTI = answers => {
  const dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach((answer, index) => {
    const score = answer.score || 0;
    // EI维度
    if (index % 4 === 0) {
      if (score <= 2) dimensions.E += score;
      else dimensions.I += score;
    }
    // SN维度
    if (index % 4 === 1) {
      if (score <= 2) dimensions.S += score;
      else dimensions.N += score;
    }
    // TF维度
    if (index % 4 === 2) {
      if (score <= 2) dimensions.T += score;
      else dimensions.F += score;
    }
    // JP维度
    if (index % 4 === 3) {
      if (score <= 2) dimensions.J += score;
      else dimensions.P += score;
    }
  });
  
  let mbti = '';
  mbti += dimensions.E >= dimensions.I ? 'E' : 'I';
  mbti += dimensions.S >= dimensions.N ? 'S' : 'N';
  mbti += dimensions.T >= dimensions.F ? 'T' : 'F';
  mbti += dimensions.J >= dimensions.P ? 'J' : 'P';
  
  return { mbti, dimensions, scores: dimensions };
};

// 恋爱脑测试计分
const calculateLoveBrain = answers => {
  const dimensions = { sunk_cost: 0, idealization: 0, emotional_dependency: 0, irrational: 0 };
  
  answers.forEach((answer, index) => {
    const dimIndex = index % 4;
    const dimensionKeys = ['sunk_cost', 'idealization', 'emotional_dependency', 'irrational'];
    if (answer.selected === 1) { // B选项+1分
      dimensions[dimensionKeys[dimIndex]] += 1;
    }
  });
  
  const total = Object.values(dimensions).reduce((a, b) => a + b, 0);
  let level = '轻度';
  if (total >= 10) level = '重度';
  else if (total >= 5) level = '中度';
  
  return { level, dimensions, total, scores: dimensions };
};

// 性格动物测试计分
const calculateAnimalPersona = answers => {
  const animals = { lion: 0, peacock: 0, koala: 0, owl: 0 };
  
  answers.forEach(answer => {
    const score = answer.score || 0;
    if (score <= 2) animals.lion += score;
    else if (score <= 4) animals.peacock += score;
    else if (score <= 6) animals.koala += score;
    else animals.owl += score;
  });
  
  const maxAnimal = Object.keys(animals).reduce((a, b) => animals[a] > animals[b] ? a : b);
  const animalNames = { lion: '狮子', peacock: '孔雀', koala: '考拉', owl: '猫头鹰' };
  const animalEmojis = { lion: '🦁', peacock: '🦚', koala: '🐨', owl: '🦉' };
  
  return {
    animal: maxAnimal,
    animalName: animalNames[maxAnimal],
    emoji: animalEmojis[maxAnimal],
    scores: animals
  };
};

// 恋爱依恋类型计分
const calculateAttachmentStyle = answers => {
  let anxiety = 0;
  let avoidance = 0;
  
  answers.forEach((answer, index) => {
    const score = answer.score || 0;
    if (index < 9) anxiety += score;
    else avoidance += score;
  });
  
  const avgAnxiety = anxiety / 9;
  const avgAvoidance = avoidance / 9;
  
  let style = '';
  let emoji = '';
  
  if (avgAnxiety < 3 && avgAvoidance < 3) {
    style = 'secure'; emoji = '💞';
  } else if (avgAnxiety >= 3 && avgAvoidance < 3) {
    style = 'anxious'; emoji = '💔';
  } else if (avgAnxiety < 3 && avgAvoidance >= 3) {
    style = 'avoidant'; emoji = '🚪';
  } else {
    style = 'fearful'; emoji = '😰';
  }
  
  return { style, anxiety, avoidance, emoji, scores: { anxiety, avoidance } };
};

// 情绪压力自评计分
const calculateEmotionStress = answers => {
  const dimensions = { depression: 0, anxiety: 0, stress: 0 };
  const reverseQuestions = [6, 8, 9, 10, 11, 13, 15, 17, 19, 21]; // 反向计分题号
  
  answers.forEach((answer, index) => {
    const qNo = index + 1;
    let score = answer.score || 0;
    
    // 反向计分
    if (reverseQuestions.includes(qNo)) {
      score = 4 - score;
    }
    
    if (qNo <= 7) dimensions.depression += score;
    else if (qNo <= 14) dimensions.anxiety += score;
    else dimensions.stress += score;
  });
  
  const total = Object.values(dimensions).reduce((a, b) => a + b, 0);
  let level = '正常';
  if (total >= 42) level = '严重';
  else if (total >= 28) level = '中度';
  else if (total >= 14) level = '轻度';
  
  return { level, dimensions, total, scores: dimensions };
};

module.exports = {
  formatTime,
  calculateRadar,
  calculateMBTI,
  calculateLoveBrain,
  calculateAnimalPersona,
  calculateAttachmentStyle,
  calculateEmotionStress
};
