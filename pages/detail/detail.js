const db = wx.cloud.database();
const gabage = db.collection('gabage')
const reCorderManager = wx.getRecorderManager()
Page({

    data: {
    gabageName:null,    
    category:null
    },
    onLoad: function (event) {
        console.log(event.gabageName)
        this.setData({
            gabageName: event.gabageName
        }),
        gabage.where({
            name: event.gabageName
        }).get().then(res => {
            console.log(this.data.gabageName)
            if(this.data.gabageName){
                console.log('可以执行搜索')
                db.collection('gabage')
                .where({
                    name: db.RegExp({
                    regexp:this.data.gabageName,//要搜素的词
                       options: 'i',//不区分大小写
                    })
                  })
                .get ()
                .then (res=>{
                    console.log("成功",res)
                    this.setData({
                        list:res.data
                      })
                    
                })
            }
           else{
               wx.showToast({
                   icon:'error',
                   title: '请输入内容',
               })
           }


            //  if (res.data[0].category === 1) {
            //     this.setData({
            //         category: "可回收垃圾"
            //     })
            // } else if (res.data[0].category === 2) {
            //     this.setData({
            //         category: "有害垃圾"
            //     })
            // } else if (res.data[0].category === 4) {
            //     this.setData({
            //         category: "湿垃圾"
            //     })
            // } else if (res.data[0].category === 8) {
            //     this.setData({
            //         category: "干垃圾"
            //     })
            // } else if (res.data[0].category === 16) {
            //     this.setData({
            //         category: "大件垃圾"
            //     })
            // }

           
        }).catch(err=>{
            wx.showModal({
                title:'请重新识别或搜索',
                content: `无法为“${this.data.gabageName}”分类`,
                showCancel:false, 
            }).then(res=>{
                if (res.confirm) {
                    wx.navigateBack({
                        delta:2
                    })
                  }
            })
        })
    }

})