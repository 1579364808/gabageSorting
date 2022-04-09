const db = wx.cloud.database();
const gabage = db.collection('gabage')
const reCorderManager = wx.getRecorderManager()
Page({
    data: {
        inputVal:'',
        gabageName: null,
        category: null,
        list:[],  //s搜索的结果列表
        historyList:[],//搜索历史的数组
        color:[]
    },
    getKey(e){
          console.log(e.detail.value)
          this.setData({
            gabageName:e.detail.value
          })
    },
    onLoad: function (event) {
         this.goSearch()
    },
    goSearch(){
        if (this.data.gabageName) {
             wx.showLoading({
            title: '正在玩命加载中...',
          })
            console.log('可以执行搜索')
            db.collection('gabage')
                .where({
                      name: db.RegExp({
                        regexp: this.data.gabageName, //要搜素的词
                        options: 'i', //不区分大小写
                     })
                })
                .get()
                .then(res => {
                    wx.hideLoading({
                    })
                    console.log("成功", res)
                    this.setData({
                        list: res.data
                    })
                    console.log("成功啦",this.data.list.length)
                    if(this.data.list.length==0){  //友好提示
                        wx.showModal({
                            title: '无搜索结果~',
                            content: `无法为“${this.data.gabageName}”进行分类`,
                            showCancel: false,
                        })
                    }
                   this.saveSearchHistory() //储存搜索记录
                  
                })
        }else{
            wx.showModal({
                title: '请输入要搜索的内容',
                showCancel: false,
            })
            this.setData({
                list:null    //当搜索为空时，把之前的显示的列表置为空，从而让历史列表进行显示
            })
        }
    },

    //保存历史搜索记录
    saveSearchHistory(){
        var that = this
        var inputVal =this.data.gabageName
        var historyList= this.data.historyList
        if (inputVal == '') {
          //输入为空
        }
        else {
          if (historyList.length < 10) {//限制数组条数
            historyList.unshift(inputVal)
          }
          else {
            historyList.pop()
            historyList.unshift(inputVal)
          }
        //将历史记录数组整体储存到缓存中
        wx.setStorageSync('historyList', historyList)
        console.log("lallall",this.data)
        }  
    },
    openHistorySearch: function () {
        this.setData({
            historyList: wx.getStorageSync('historyList') || [],
        })
      },
   historyDelFn: function () { //删除历史记录和本地存储
        wx.showModal({
            title: '清空搜索历史',
            content: `确定清空全部搜索历史？`,
            success:(res)=>{
                if (res.confirm) {
                  console.log('确定')
                  wx.clearStorageSync('historyList')
                     this.setData({
                    historyList: []
                    })

                } else {
                  console.log('取消')
                }
              }
        })
       
      },
    onLoad: function (event) {
        this.openHistorySearch()//

        console.log(event.gabageName)
        this.setData({
                gabageName: event.gabageName
            }),
            gabage.where({
                name: event.gabageName
            })
            .get()
            .then(res => {
                console.log(this.data)
                console.log("成功!!!",this.data.gabageName)
                if (this.data.gabageName) {
                    wx.showLoading({
                        title: '正在玩命加载中...',
                      })
                    console.log('可以执行搜索')
                    db.collection('gabage')
                        .where({
                              name: db.RegExp({
                                regexp: this.data.gabageName, //要搜素的词
                                options: 'i', //不区分大小写
                             })
                        })
                        .get()
                        .then(res => {
                            wx.hideLoading({
                            })
                            console.log("成功", res)
                            this.setData({
                                list: res.data
                            })
                            console.log("成功sss", this.data.list)
                            if(this.data.list.length==0){
                                wx.showModal({
                                    title: '无搜索结果~',
                                    content: `无法为“${this.data.gabageName}”进行分类`,
                                    showCancel: false,
                                })
                            }
                            this.saveSearchHistory()//存储搜索记录
                            // for(var i=0;i<this.data.list.length;i++){
                            //         console.log(i);
                            //         console.log("lalalalalal",this.data.list[i].category);
                            //         if(this.data.list[i].category==="湿垃圾")
                            //         {
                            //             this.setData({
                            //                 color:0
                            //             })
                            //         }
                            //         if(this.data.list[i].category==="可回收垃圾")
                            //         {
                            //             this.setData({
                            //                 color:1
                            //             })
                            //         }
                            //         if(this.data.list[i].category==="干垃圾")
                            //         {
                            //             this.setData({
                            //                 color:2
                            //             })
                            //         }
                            // }
                        })
                }
            })
            .catch(err => {
                wx.showModal({
                        title: '请重新识别或搜索',
                        content: `无法为“${this.data.gabageName}”分类`,
                        showCancel: false,
                    })
                    .then(res => {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: 2
                            })
                        }
                    })
            })
    },
    

})
