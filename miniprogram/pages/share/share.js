const app = getApp();

Page({
  data: {
    resultData: {},
    testTitles: {
      mbti: 'MBTI人格测试',
      love_brain: '恋爱脑测试',
      animal_persona: '性格动物测试',
      attachment_style: '恋爱依恋类型',
      emotion_stress: '情绪压力自评'
    }
  },

  onLoad: function (options) {
    const { result_data, test_id } = options;
    if (result_data) {
      try {
        const resultData = JSON.parse(decodeURIComponent(result_data));
        this.setData({ resultData });
        // 生成二维码
        setTimeout(() => {
          this.generateQRCode();
        }, 300);
      } catch (e) {
        console.error('Parse result data failed:', e);
        wx.showToast({ title: '数据解析失败', icon: 'none' });
        wx.navigateBack();
      }
    }
  },

  // 生成小程序二维码
  generateQRCode: function () {
    const ctx = wx.createCanvasContext('qrcodeCanvas', this);
    const size = 240;
    
    // 绘制背景
    ctx.setFillStyle('#fff');
    ctx.fillRect(0, 0, size, size);
    
    // 绘制简单的二维码图案（实际应该调用云接口生成真实二维码）
    // 这里用简单的几何图形模拟
    ctx.setFillStyle('#6C5CE7');
    
    // 三个角落的定位图案
    this.drawPositionPattern(ctx, 0, 0, size);
    this.drawPositionPattern(ctx, size - 50, 0, size);
    this.drawPositionPattern(ctx, 0, size - 50, size);
    
    // 中心数据区域（随机方块）
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(60 + i * 15, 60 + j * 15, 12, 12);
        }
      }
    }
    
    ctx.draw();
  },

  // 绘制定位图案
  drawPositionPattern: function (ctx, x, y, canvasSize) {
    // 外框
    ctx.setFillStyle('#6C5CE7');
    ctx.fillRect(x + 5, y + 5, 40, 40);
    
    // 内框
    ctx.setFillStyle('#fff');
    ctx.fillRect(x + 10, y + 10, 30, 30);
    
    // 中心
    ctx.setFillStyle('#6C5CE7');
    ctx.fillRect(x + 17, y + 17, 16, 16);
  },

  // 保存海报到相册
  savePoster: function () {
    wx.showLoading({ title: '保存中...' });
    
    // 使用 canvasToTempFilePath 获取图片
    wx.canvasToTempFilePath({
      canvasId: 'qrcodeCanvas',
      success: res => {
        // 实际上海报应该用另一种方式生成，这里简化处理
        wx.hideLoading();
        wx.showToast({ 
          title: '海报功能开发中', 
          icon: 'none',
          duration: 2000
        });
      },
      fail: err => {
        wx.hideLoading();
        console.error('Save poster failed:', err);
        wx.showToast({ title: '保存失败', icon: 'none' });
      }
    });
  },

  onShareAppMessage: function () {
    const { resultData } = this.data;
    return {
      title: `我在型格记录得${resultData.result?.type_name || '测试结果'}，你也来试试吧！`,
      path: '/pages/index/index',
      imageUrl: ''
    };
  }
});
