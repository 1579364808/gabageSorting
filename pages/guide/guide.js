// pages/guide/guide.js
const db=wx.cloud.database()
let page=0
Page({
    data: {
      flag: 0,
      currentTab: 0,
      list0:[],
      list1:[],
      list2:[],
      list3:[]

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
    },
    catchTouchMove: function (res) {
      return false
    },
    onLoad(){
       this.getList()
       this.getList1()
       this.getList2()
       this.getList3()
    },
    getList(){
      let len=this.data.list0.length
        db.collection("gabage")
        .where({
          category:"干垃圾"
        })
        .skip(len)
        .get()
        .then(res=>{
            console.log("请求成功",res);
            // this.setData({
            //   list0:res.data
            // })
            this.setData({
                 list0:this.data.list0.concat(res.data),
            })
        })
        .catch(err=>{
            console.log("请求失败",err);
        })
      
    },
    getList1(){
      let len=this.data.list1.length
      db.collection("gabage")
      .where({
        category:"湿垃圾"
      })
      .skip(len)
      .get()
      .then(res=>{
          console.log("请求成功",res);
          this.setData({
            list1:this.data.list1.concat(res.data),
          })
      })
      .catch(err=>{
          console.log("请求失败",err);
      })
  },
  getList2(){
    let len=this.data.list2.length
    db.collection("gabage")
    .where({
      category:"可回收垃圾"
    })
    .skip(len)
    .get()
    .then(res=>{
        console.log("请求成功",res);
        this.setData({
          list2:this.data.list2.concat(res.data),
        })
    })
    .catch(err=>{
        console.log("请求失败",err);
    })
  },
  getList3(){
    let len=this.data.list3.length
    db.collection("gabage")
        .where({
          category:"有害垃圾"
        })
        .skip(len)
        .get()
        .then(res=>{
            console.log("请求成功",res);
            this.setData({
              list3:this.data.list3.concat(res.data),
            })
        })
        .catch(err=>{
            console.log("请求失败",err);
        })
      },
      scrolltolower(){
        if(page<=7)
        {
            page++ 
            console.log('dfdsv ',page)
            this.getList()
            this.getList1()
            this.getList2()
            this.getList3()
        }
      }
  })
  