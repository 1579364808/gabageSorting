// pages/exam_detail/exam_detail.js
Page({
    data: {
        list: [],
        userAns:[]
    },
    onLoad() {
        wx.getStorage({
                key: "record"
            })
            .then(res => {
                console.log(res)
                
                this.setData({
                    list:res.data.list,
                    userAns:res.data.userAns
                })
            })
    }
})