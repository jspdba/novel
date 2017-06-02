// pages/chapter/chapter.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterList: [],
    id: 0,
    chapterPage: {},
    PageNo: 1,
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (param) {
    var self = this

    self.setData({
      hidden: false
    })
    util.ajaxChapterList(param.id).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result,
        id: param.id,
        hidden: true
      })
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
    console.log("下拉事件")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this
    var PageNo = self.data.PageNo + 1

    self.setData({
      hidden: false
    })
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.List.length > 0) {
        self.setData({
          PageNo: PageNo,
          hidden: true
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toHome: function (e) {
    var self = this
    var PageNo = 1
    self.setData({
      hidden: false
    })
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.List.length > 0) {
        self.setData({
          PageNo: PageNo,
          hidden: true
        })
      }
    })
  },
  toEnd: function (e) {
    var self = this
    var PageNo = self.data.chapterPage.TotalPage

    self.setData({
      hidden: false
    })
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.List.length > 0) {
        self.setData({
          PageNo: PageNo,
          hidden: true
        })
      }
    })
  },
  toPage: function(e){
    var self = this
    var PageNo = e.detail.value
    if(self.data.PageNo == PageNo){
      //如果页码未变则不更新
      return
    }

    self.setData({
      hidden: false
    })
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.List.length > 0) {
        self.setData({
          PageNo: PageNo,
          hidden: true
        })
      }
    })
  },
  onPullDownRefresh: function () {
    console.log("onpullDownRefresh")
    wx.stopPullDownRefresh()
  }
})