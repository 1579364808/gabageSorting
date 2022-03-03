let db= wx.cloud.database()
Page({
    data :{
        key:null
    },
    getKey(e){
        //console.log(e.detail)
        this.setData({
            key:e.detail
        })
        console.log(this.data.key)
        if(this.data.key){
            console.log('可以执行搜索')
            db.collection('gabage')
            .where({
                name: db.RegExp({
                regexp:this.data.key,//要搜素的词
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
    }
})