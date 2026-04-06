const app = getApp();

Page({
  data: {
    records: [],
    loading: true,
    free_times: 5,
    testEmojis: {
      mbti: '🎭',
      love_brain: '💕',
      animal_persona: '🦁',
      attachment_style: '💞',
      emotion_stress: '🌊'
    },
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    }
  },

  onLoad: function () {
    const ft = app.globalData.free_times;
    this.setData({ free_times: ft !== undefined ? ft : 2 });
  },

  onShow: function () {
    this.loadRecords();
  },

  loadRecords: function () {
    this.setData({ loading: true });
    
    wx.cloud.callFunction({
      name: 'getMyRecords',
      success: res => {
        if (res.result && res.result.success) {
          this.setData({
            records: res.result.records || [],
            loading: false
          });
        } else {
          // 使用本地记录
          this.setData({
            records: this.getLocalRecords(),
            loading: false
          });
        }
      },
      fail: err => {
        console.error('Load records failed:', err);
        this.setData({
          records: this.getLocalRecords(),
          loading: false
        });
      }
    });
  },

  // 获取本地记录（当云端不可用时）
  getLocalRecords: function () {
    try {
      const localRecords = wx.getStorageSync('local_records') || [];
      return localRecords.map(r => ({
        ...r,
        completed_at: r.completed_at || '刚刚'
      }));
    } catch (e) {
      return [];
    }
  },

  viewRecord: function (e) {
    const { id } = e.currentTarget.dataset;
    const record = this.data.records.find(r => r._id === id);
    
    if (record) {
      const RESULT_ROUTES = {
        mbti: '/pages/result-mbti/result-mbti',
        love_brain: '/pages/result-love/result-love',
        animal_persona: '/pages/result-animal/result-animal',
        attachment_style: '/pages/result-attach/result-attach',
        emotion_stress: '/pages/result-stress/result-stress'
      };
      const resultRoute = RESULT_ROUTES[record.test_id] || '/pages/result/result';
      
      // 如果记录中已有完整结果数据，直接使用
      // 否则从 answers 重新计算结果
      let resultData;
      if (record.scores && record.result) {
        resultData = record;
      } else if (record.answers && Array.isArray(record.answers)) {
        resultData = this.recalculateResult(record.test_id, record.answers);
      } else {
        wx.showToast({ title: '记录数据不完整', icon: 'none' });
        return;
      }
      
      wx.navigateTo({
        url: `${resultRoute}?test_id=${record.test_id}&result_data=${encodeURIComponent(JSON.stringify(resultData))}&from_record=true`
      });
    }
  },

  // 从 answers 重新计算测试结果
  recalculateResult: function (testId, answers) {
    let result = { test_id: testId, scores: {}, result: {} };
    
    switch (testId) {
      case 'mbti': {
        let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
        answers.forEach((answer, index) => {
          if (!answer) return;
          const isRight = answer.score === 1;
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
          if (!answer) return;
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
        let level = '正常', emoji = '🧠';
        if (total >= 10) { level = '重度恋爱脑'; emoji = '💔'; }
        else if (total >= 5) { level = '中度恋爱脑'; emoji = '💕'; }
        else if (total >= 2) { level = '轻度恋爱脑'; emoji = '💭'; }
        result.result = { resultCode: level, type_name: level, emoji, description: level };
        break;
      }
      case 'animal_persona': {
        let lion = 0, peacock = 0, koala = 0, owl = 0;
        answers.forEach(answer => {
          if (!answer) return;
          if (answer.o_no === 'A') lion++;
          else if (answer.o_no === 'B') peacock++;
          else if (answer.o_no === 'C') koala++;
          else if (answer.o_no === 'D') owl++;
        });
        result.scores = { lion, peacock, koala, owl };
        const max = Math.max(lion, peacock, koala, owl);
        let animal = 'lion', name = '狮子型', emoji = '🦁';
        if (max === peacock) { animal = 'peacock'; name = '孔雀型'; emoji = '🦚'; }
        else if (max === koala) { animal = 'koala'; name = '考拉型'; emoji = '🐨'; }
        else if (max === owl) { animal = 'owl'; name = '猫头鹰型'; emoji = '🦉'; }
        result.result = { resultCode: animal, type_name: name, emoji, description: name };
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
        const avgA = anxiety / 9, avgV = avoidance / 9;
        let style = 'secure', name = '安全型', emoji = '💞';
        if (avgA >= 3 && avgV < 3) { style = 'anxious'; name = '焦虑型'; emoji = '💛'; }
        else if (avgA < 3 && avgV >= 3) { style = 'avoidant'; name = '回避型'; emoji = '💙'; }
        else if (avgA >= 3 && avgV >= 3) { style = 'fearful'; name = '恐惧型'; emoji = '❤️'; }
        result.result = { resultCode: style, type_name: name, emoji, description: name };
        break;
      }
      case 'emotion_stress': {
        const reverseItems = [0,1,2,3,5,8,10,12,14,16,19];
        let depression = 0, anxiety = 0, stress = 0;
        answers.forEach((answer, index) => {
          if (!answer) return;
          let rawScore = (answer.score || 1) - 1;
          if (reverseItems.includes(index)) rawScore = 3 - rawScore;
          if (index < 7) depression += rawScore;
          else if (index < 14) anxiety += rawScore;
          else stress += rawScore;
        });
        result.scores = { depression, anxiety, stress };
        const total = depression + anxiety + stress;
        let level = '正常', emoji = '😊';
        if (total >= 42) { level = '严重'; emoji = '😢'; }
        else if (total >= 28) { level = '中度'; emoji = '😟'; }
        else if (total >= 14) { level = '轻度'; emoji = '😌'; }
        result.result = { resultCode: level, type_name: level, emoji, description: '综合指数' + total + '/63' };
        break;
      }
    }
    return result;
  },

  // 删除记录
  deleteRecord: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      success: res => {
        if (res.confirm) {
          this.doDeleteRecord(id);
        }
      }
    });
  },

  doDeleteRecord: function (id) {
    const records = this.data.records.filter(r => r._id !== id);
    this.setData({ records });
    try { wx.setStorageSync('local_records', records); } catch (e) {}
    wx.showToast({ title: '已删除', icon: 'success' });
  },

  onShareAppMessage: function () {
    return {
      title: '型格记 - 探索内心，发现真实的自己',
      path: '/pages/index/index'
    };
  }
});
