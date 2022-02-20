// index.js
const db = wx.cloud.database();
const gabage = db.collection('gabage')
   let   reCorderManager =   wx.getRecorderManager()

Page({
    data: {
        category: null
    },
    onSearch(event) {
        gabage.where({
            name: event.detail
        }).get().then(res=>{
            console.log(res.data[0].category)
            if(res.data[0].category===1){
                this.data({
                    category:"可回收垃圾"
                })
            }
            else if(res.data[0].category===2){
                this.setData({
                    category:"有害垃圾"
                })
            }
           else if(res.data[0].category===4){
                this.setData({
                    category:"湿垃圾"
                })
            }
           else if(res.data[0].category===8){
                this.setData({
                    category:"干垃圾"
                })
            }
          else  if(res.data[0].category===16){
                this.setData({
                    category:"大件垃圾"
                })
            }
         
        })
    }
})