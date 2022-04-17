// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       fontSize:20
    },
    go(event){
        console.log(event)
  
            var userInfo = wx.getStorageSync('userInfo')
            if (userInfo) {
                wx.redirectTo({
                  url: '../exam/exam',
                })
            }else{
                wx.showModal({
                    showCancel: false,
                    title: '无法进入',
                    content: '请先登录',
                })
                .then(res=>{
                    if(res.confirm){
                          wx.switchTab({
                        url: '../mine/mine',
                      }) 
                    }
                  
                })
                
            }
    }
})