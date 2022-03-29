// pages/guide/guide.js
const db=wx.cloud.database()
let page=0
Page({
    data: {
      flag: 0,
      currentTab: 0
    },
    switchNav: function(e) {
      var page = this;
      var id = e.target.id;
      if (this.data.currentTab == id) {
        return false;
      } else {
        page.setData({
          currentTab: id
        });
      }
      page.setData({
        flag: id
      });
      /////
      if(e.target.id==0)
      {
        db.collection("gabage")
        .where({
          category:"干垃圾"
        })
        .skip(20)
        .get()
        .then(res=>{
            console.log("请求成功",res);
            this.setData({
              list0:res.data
            })
        })
        .catch(err=>{
            console.log("请求失败",err);
        })
      }
      if(e.target.id==1)
      {
       
        db.collection("gabage")
        .where({
          category:"湿垃圾"
        })
        .skip(20)
        .get()
        .then(res=>{
            console.log("请求成功",res);
            this.setData({
              list1:res.data
            })
        })
        .catch(err=>{
            console.log("请求失败",err);
        })
      }
      if(e.target.id==2)
      {
        db.collection("gabage")
        .where({
          category:"可回收垃圾"
        })
        .skip(20)
        .get()
        .then(res=>{
            console.log("请求成功",res);
            this.setData({
              list2:res.data
            })
        })
        .catch(err=>{
            console.log("请求失败",err);
        })
      }
      if(e.target.id==3)
      {
        db.collection("gabage")
        .where({
          category:"有害垃圾"
        })
        .skip(20)
        .get()
        .then(res=>{
            console.log("请求成功",res);
            this.setData({
              list3:res.data
            })
        })
        .catch(err=>{
            console.log("请求失败",err);
        })
      }
      
    },
    catchTouchMove: function (res) {
      return false
    },
    // getList(){
    //   console.log("长度",this.data.list0.length);
    //   let len=this.data.list0.length
    //     db.collection("gabage")
    //     .where({
    //       category:"干垃圾"
    //     })
    //     // .limit()
    //     .skip(len)
    //     .get()
    //     .then(res=>{
    //         console.log("请求成功",res);
    //         if(res.data.length>20){
    //               wx.showToast({
    //                 title: '没有更多数据啦',
    //               })
    //         }
    //         this.setData({
    //           list0:this.data.list0.concat(res.data)
    //         })
    //     })
    //     .catch(err=>{
    //         console.log("请求失败",err);
    //     })
    // },
    // onReachBottom:function(){
    //   console.log("onReachBottom");
    //   if(page<=1)
    //   {
    //       page++ 
    //       this.getList()
    //   }
     
    // }

  })
  