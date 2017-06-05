function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getPromise(url) {
  var promise = new Promise(function (resove, reject) {
    wx.request({
      url: url,
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: resove,
      fail: reject
    })
  })
  return promise;
}

function ajaxBookList() {
  var url = 'https://www.wuchaofei.top/book/json/list';

  return getPromise(url).then(function (res) {
    return res.data.page.List
  }).catch(function (err) {
    console.log(err)
    return []
  })
}

function ajaxChapterList(id, PageNo) {
  PageNo = PageNo ? PageNo : 1
  var url = 'https://www.wuchaofei.top/chapter/json/list/' + id + "?PageNo=" + PageNo;
  return getPromise(url).then(function (res) {
    return res.data.page
  }).catch(function (err) {
    console.log(err)
    return {}
  })
}

function ajaxChapterDetail(id) {
  var url = 'https://www.wuchaofei.top/chapter/json/detail/' + id;
  return getPromise(url).then(function (res) {
    return res.data.data
  }).catch(function (err) {
    console.log(err)
    return null
  })
}
// 下一页
function ajaxChapterDetailNext(id) {
  var url = 'https://www.wuchaofei.top/chapter/json/next/' + id;
  return getPromise(url).then(function (res) {
    return res.data.data
  }).catch(function (err) {
    console.log(err)
    return null
  })
}
// 上一页
function ajaxChapterDetailPre(id) {
  var url = 'https://www.wuchaofei.top/chapter/json/pre/' + id;
  return getPromise(url).then(function (res) {
    return res.data.data
  }).catch(function (err) {
    console.log(err)
    return null
  })
}

//历史上的今天开始
const API_URL_L = "https://www.wuchaofei.top/todayOnhistory/queryEvent"
const API_URL_D = "https://www.wuchaofei.top/todayOnhistory/queryDetail"

// 获取列表
function fetchEvents(today) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: API_URL_L,
      data: {
        date: today
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: resolve,
      fail: reject
    })
  })
  return promise
}

function getEvents() {
  var tmpDate = new Date()
  var today = tmpDate.getMonth() + 1
  today = today + '/' + tmpDate.getDate()
  return fetchEvents(today)
    .then(function (res) {
      // console.log(res.data.result)
      return res.data.result
    })
    .catch(function (err) {
      console.log(err)
      return []
    })
}

// 获取详细内容
function fetchDetail(e_id) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: API_URL_D,
      data: {
        e_id: e_id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: resolve,
      fail: reject
    })
  })
  return promise
}

function getDetail(e_id) {
  return fetchDetail(e_id)
    .then(function (res) {
      return res.data.result
    })
    .catch(function (err) {
      console.log(err)
      return []
    })
}

function getUserInfo(code) {
  var url = 'https://www.wuchaofei.top/wxapp/userInfo';
  return new Promise(function (resove, reject) {
    wx.request({
      url: url,
      data: {
        code: code
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: resove,
      fail: reject
    })
  }).then(function (res) {
    return res
  }).catch(function (err) {
    console.log(err)
    return null
  })
}
//历史上的今天结束
module.exports = {
  formatTime: formatTime,
  ajaxBookList: ajaxBookList,
  ajaxChapterList: ajaxChapterList,
  ajaxChapterDetail: ajaxChapterDetail,
  ajaxChapterDetailNext: ajaxChapterDetailNext,
  ajaxChapterDetailPre: ajaxChapterDetailPre,
  getEvents: getEvents,
  getDetail: getDetail,
  getUserInfo: getUserInfo
}
