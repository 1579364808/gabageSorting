// index.js


Page({
    data: {
        category: null,//垃圾种类
    },
    //加载时
    onLoad(event) {
        wx.cloud.callFunction({
            name: "baiduAccessToken",
        }).then(res => {
         let  token=res.result.data.access_token
           //写入缓存
            wx.setStorage({
                key: 'baidutoken',
                data: {
                    token: token
                }
            })
        })
    },

    onSearch(event) {
        wx.navigateTo({
            url: `../detail/detail?gabageName=${event.detail}`,
        })
        
    },
    onClick() {
        wx.navigateTo({
            url: `../camera/camera`,
        })
    }
})