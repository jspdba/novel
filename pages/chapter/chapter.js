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
    PageNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (param) {
    var self = this
    util.ajaxChapterList(param.id).then(function (result) {
      console.log(result)
      self.setData({
        chapterList: result.List,
        chapterPage: result,
        id: param.id
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this
    var PageNo = self.data.PageNo + 1
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.length > 0) {
        self.setData({
          PageNo: PageNo
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
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.length > 0) {
        self.setData({
          PageNo: PageNo
        })
      }
    })
  },
  toEnd: function (e) {
    var self = this
    var PageNo = self.data.chapterPage.TotalPage
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.length > 0) {
        self.setData({
          PageNo: PageNo
        })
      }
    })
  },
  toPage: function(e){
    var self = this
    var PageNo = e.detail.value
    util.ajaxChapterList(self.data.id, PageNo).then(function (result) {
      self.setData({
        chapterList: result.List,
        chapterPage: result
      })
      if (result.length > 0) {
        self.setData({
          PageNo: PageNo
        })
      }
    })
  }
})