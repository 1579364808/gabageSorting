// pages/exam/exam.js
Page({

    data: {

    },
    onLoad: function (options) {
     this.getList()
    },
    getList(){
        wx.cloud
        .callFunction({
            name:"questionPool",
            data:{
                type:"selectRecord",
                page:2,//第几页
                size:10//每页的条数
            }
        })
        .then(res=>{
            console.log(res)
        })
    }

})