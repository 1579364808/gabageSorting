// pages/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    showToast(){
        wx.redirectTo({
            url: '/pages/feedback_detail/feedback_detail.js',
          })
    }
})