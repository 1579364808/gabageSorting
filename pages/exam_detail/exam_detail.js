// pages/exam_detail/exam_detail.js
Page({
    data: {
        list: [],
        archives:[]
    },
    onLoad() {
        wx.getStorage({
                key: "record"
            })
            .then(res => {
                this.setData({
                    list:res.data.list,
                    archives:res.data.archives
                })
            })
    }
})