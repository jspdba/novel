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

function getPromise(url){
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
    console.log(res)
    return res.data.page.List
  }).catch(function (err) {
    console.log(err)
    return []
  })
}

function ajaxChapterList(id) {
  var url = 'https://www.wuchaofei.top/chapter/json/list/'+id;
  return getPromise(url).then(function (res) {
    console.log(res)
    return res.data.page.List
  }).catch(function (err) {
    console.log(err)
    return []
  })
}

module.exports = {
  formatTime: formatTime,
  ajaxBookList: ajaxBookList,
  ajaxChapterList: ajaxChapterList
}
