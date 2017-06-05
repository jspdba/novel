//app.js
var util = require("utils/util.js")
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            // util.getUserInfo(res.code).then(function (res) {
            //   console.log(res)
            // })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.getSetting({
            success(res) {
              if (!res['scope.userInfo']) {
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    wx.getUserInfo({
                      success: function (res) {
                        that.globalData.userInfo = res.userInfo
                        typeof cb == "function" && cb(that.globalData.userInfo)
                      }
                    })
                  }
                })
              }
            }
          })

        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})