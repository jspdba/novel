// pages/detail/detail.js
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    title: "",
    chapter: {},
    id: 0,
    hidden: false,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
    currentGesture: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    util.ajaxChapterDetail(options.id).then(function (result) {
      if (result.Content){
        result.Content = result.Content.replace(/readx\(\);\s.*?/, '')
        WxParse.wxParse('Content', 'html', result.Content, self, 0);
      }else{
        WxParse.wxParse('Content', 'html', result.Url, self, 0);
      }
      wx.setNavigationBarTitle({
        title: result.Title ? result.Title : ""
      })
      self.setData({
        id: options.id,
        chapter: result,
        hidden: true
      })
    })
  },
  prePage: function () {
    var self = this

    self.setData({
      hidden: false
    })
    util.ajaxChapterDetailPre(self.data.id).then(function (result) {
      WxParse.wxParse('Content', 'html', result.Content, self, 0);
      if (result && result.Id) {
        wx.setNavigationBarTitle({
          title: result.Title ? result.Title : ""
        })
        self.setData({
          id: result.Id,
          chapter: result,
          hidden: true
        })
      }
    })
  },
  nextPage: function () {
    var self = this
    self.setData({
      hidden: false
    })
    util.ajaxChapterDetailNext(self.data.id).then(function (result) {
      WxParse.wxParse('Content', 'html', result.Content, self, 0);
      if (result && result.Id) {
        wx.setNavigationBarTitle({
          title: result.Title ? result.Title : ""
        })
        self.setData({
          id: result.Id,
          chapter: result,
          hidden: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handletouchmove: function (event) {
    if (this.data.currentGesture != 0) {
      return
    }
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    let text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0) {
        text = "向左滑动"
        this.data.currentGesture = 1
      }
      else if (tx > 0) {
        text = "向右滑动"
        this.data.currentGesture = 2
      }

    }
    //上下方向滑动
    else {
      if (ty < 0) {
        text = "向上滑动"
        this.data.currentGesture = 3

      }
      else if (ty > 0) {
        text = "向下滑动"
        this.data.currentGesture = 4
      }

    }

    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text: text,
    });
  },

  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletouchend: function (event) {

    switch (this.data.currentGesture) {
      case 1: //←
        this.nextPage()
        break;
      case 2://右
        this.prePage()
        break;
      case 3://上
        break;
      case 4://下
        break;
      default:
        console.log("手势 error")
    }

    this.data.currentGesture = 0
    this.setData({
      text: "没有滑动",
    });
  },
})