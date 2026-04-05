const app = getApp();

Page({
  data: {
    resultData: {},
    test_id: '',
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    },
    testEmojis: {
      mbti: '🎭', love_brain: '💕', animal_persona: '🦁',
      attachment_style: '💞', emotion_stress: '🌊'
    },
    posterSaved: false
  },

  onLoad: function (options) {
    const { result_data, test_id } = options;
    if (result_data) {
      try {
        const resultData = JSON.parse(decodeURIComponent(result_data));
        this.setData({ resultData, test_id: test_id || resultData.test_id || '' });
      } catch (e) {
        console.error('Parse result data failed:', e);
        wx.showToast({ title: '数据解析失败', icon: 'none' });
        wx.navigateBack();
      }
    }
  },

  onReady: function () {
    if (this.data.resultData.result) {
      setTimeout(() => this.drawPoster(), 300);
    }
  },

  drawPoster: function () {
    const query = wx.createSelectorQuery();
    query.select('#posterCanvas').fields({ node: true, size: true }).exec((res) => {
      if (!res[0] || !res[0].node) return;
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      const dpr = wx.getSystemInfoSync().pixelRatio;
      const w = 375;
      const h = 560;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      const result = this.data.resultData.result || {};
      const testTitle = this.data.testTitles[this.data.test_id] || '心理测试';
      const emoji = result.emoji || this.data.testEmojis[this.data.test_id] || '🔮';

      // 背景渐变
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#6C5CE7');
      gradient.addColorStop(0.5, '#a29bfe');
      gradient.addColorStop(1, '#dfe6e9');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // 顶部装饰圆
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.arc(300, 60, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(60, 400, 80, 0, Math.PI * 2);
      ctx.fill();

      // 品牌
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('型格记', w / 2, 40);

      // 测试名称
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(testTitle, w / 2, 80);

      // 分隔线
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 100);
      ctx.lineTo(w - 80, 100);
      ctx.stroke();

      // emoji
      ctx.font = '60px sans-serif';
      ctx.fillText(emoji, w / 2, 180);

      // 类型名称
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px sans-serif';
      const typeName = result.type_name || result.resultCode || '';
      ctx.fillText(typeName, w / 2, 240);

      // 描述（自动换行）
      if (result.description) {
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '13px sans-serif';
        const desc = result.description;
        const maxWidth = 300;
        const lines = this.wrapText(ctx, desc, maxWidth);
        let y = 280;
        lines.slice(0, 3).forEach(line => {
          ctx.fillText(line, w / 2, y);
          y += 22;
        });
      }

      // 底部提示
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '12px sans-serif';
      ctx.fillText('扫码或搜索「型格记」开始测试', w / 2, h - 30);

      // 底部品牌
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '11px sans-serif';
      ctx.fillText('探索内心，发现真实的自己', w / 2, h - 10);
    });
  },

  wrapText: function (ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    for (let i = 0; i < text.length; i++) {
      const testLine = line + text[i];
      if (ctx.measureText(testLine).width > maxWidth) {
        lines.push(line);
        line = text[i];
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
    return lines;
  },

  savePoster: function () {
    wx.showLoading({ title: '保存中...' });
    
    const query = wx.createSelectorQuery();
    query.select('#posterCanvas').fields({ node: true }).exec((res) => {
      if (!res[0] || !res[0].node) {
        wx.hideLoading();
        wx.showToast({ title: '生成失败', icon: 'none' });
        return;
      }
      const canvas = res[0].node;
      wx.canvasToTempFilePath({
        canvas: canvas,
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.hideLoading();
              this.setData({ posterSaved: true });
              wx.showToast({ title: '已保存到相册', icon: 'success' });
            },
            fail: (err) => {
              wx.hideLoading();
              if (err.errMsg.includes('deny') || err.errMsg.includes('auth')) {
                wx.showModal({
                  title: '需要授权',
                  content: '请允许保存图片到相册',
                  success: (res) => {
                    if (res.confirm) wx.openSetting();
                  }
                });
              } else {
                wx.showToast({ title: '保存失败', icon: 'none' });
              }
            }
          });
        },
        fail: () => {
          wx.hideLoading();
          wx.showToast({ title: '生成失败', icon: 'none' });
        }
      });
    });
  },

  backToResult: function () {
    wx.navigateBack();
  },

  onShareAppMessage: function () {
    const { resultData, test_id } = this.data;
    return {
      title: `我在型格记测了${this.data.testTitles[test_id] || '心理测试'}，你也来试试吧！`,
      path: '/pages/index/index'
    };
  }
});
