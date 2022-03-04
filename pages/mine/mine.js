Page({
    data: {

    },
    onLoad(options) {

    },
    login(){
        wx.getUserProfile({
            desc: '只有授权才能登陆',
            success: res => {
              console.log("授权成功", res)
              wx.setStorageSync('userInfo', res.userInfo)
              this.setData({
                userInfo: res.userInfo
              })
            },
            fail: res => {
              console.log("授权失败", res)
              this.setData({
                nickName: "请重新登陆"
              })
            }
          })
    }
})