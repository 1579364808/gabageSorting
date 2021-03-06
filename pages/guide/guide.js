// pages/guide/guide.js
const db = wx.cloud.database()
let page = 0
Page({
  data: {
    flag: 0,
    currentTab: 0,
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    waste : [],
    waste0 : [],
    waste1 : [],


  },
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    console.log("idlala", this.data.currentTab)
    page.setData({
      flag: id
    });
  },
  catchTouchMove: function (res) {
    return false
  },
  onLoad() {
    this.getList()
    this.getList1()
    this.getList2()
    this.getList3()
    this.getList4()
    this.getList5()
    this.getList6()
  },
  onShow() {
    let id = wx.getStorageSync('id')
    this.setData({
      currentTab: id,
      flag: id,
    })
  },
  onHide() {
    wx.removeStorage({
      key: 'id',
    })
  },
  getList() {
    wx.showLoading({
      title: '正在加载中...',
    })
    let len = this.data.list0.length
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 0,
          len: len,
          pageNum: 300,
        }
      })
      .then(res => {
        wx.hideLoading({})

        this.setData({
          list0: this.data.list0.concat(res.result.data),
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })

  },
  getList1() {
    wx.showLoading({
      title: '正在加载中...',
    })
    let len1 = this.data.list1.length
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 1,
          len1: len1,
          pageNum: 300,
        }
      })
      .then(res => {
        wx.hideLoading({})

        this.setData({
          list1: this.data.list1.concat(res.result.data),
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })
  },
  getList2() {
    wx.showLoading({
      title: '正在加载中...',
    })
    let len2 = this.data.list2.length
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 2,
          len2: len2,
          pageNum: 300,
        }
      })
      .then(res => {
        wx.hideLoading({})

        this.setData({
          list2: this.data.list2.concat(res.result.data),
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })
  },
  getList3() {
    wx.showLoading({
      title: '正在加载中...',
    })
    let len3 = this.data.list3.length
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 3,
          len3: len3,
          pageNum: 300,
        }
      })
      .then(res => {
        wx.hideLoading({})

        this.setData({
          list3: this.data.list3.concat(res.result.data),
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })
  },
  getList4() {
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 4
        }
      })
      .then(res => {

        this.setData({
          waste:  res.result.data,
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })
  },
  getList5() {
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 5
        }
      })
      .then(res => {

        this.setData({
          waste0:  res.result.data,
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })
  },
  getList6() {
    wx.cloud.callFunction({
        name: 'getList',
        data: {
          id: 6
        }
      })
      .then(res => {

        this.setData({
          waste1:  res.result.data,
        })
      })
      .catch(err => {
        wx.hideLoading({})
        console.log("请求失败", err);
      })
  },
  
  scrolltolower() {
    wx.showToast({
      icon: "none",
      title: '没有更多数据啦',
      duration:500
    })
  }


  
})