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