// pages/exam_detail/exam_detail.js
Page({
    data: {
        list: [],
        archives:[],
        img_star:'../../icons/star_o.png'
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
    },
    star(event){
        this.setData({
            img_star:'../../icons/star_y.png'
        })
    }
})