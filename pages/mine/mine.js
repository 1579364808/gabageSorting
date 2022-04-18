const db = wx.cloud.database();
const users = db.collection('users')
let openId;
Page({
  data: {
    gravatar: "../../icons/login.png",
    nickName: "点击登录",
    isLogin: false,
    
  },    
  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket: true,
    }); 
  },
  onShareAppMessage: function (res) {
      if(res.form==='button'){
       console.log(res.form)
      }
   return{
       title:'分享',
       imageUrl:"cloud://melody-of-tears-4gj3jgoa3c47c801.6d65-melody-of-tears-4gj3jgoa3c47c801-1309155074/QR code.jpg",
       path:'/pages/mine/mine',
       success:function(res){
    console.log("分享成功")
       },
       fail:function(res){
           console.log("分享失败")
       }
   }
    },
    
onLoad:function(){
    var that=this;
    qrcode({
        width:100,
        height:100,
        canvasId:'myQrcode',
        text:'',
        
        callback:function(){

        }

    });
},
  onLoad(options) {
    //进来先获取openId
    wx.cloud.callFunction({
      name: 'getOpenId'
    })
    .then(res => {
      console.log(res)
       openId = res.result.openid
   
    })
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    if (userInfo != "" && userInfo != null) {
      this.setData({
        gravatar: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        isLogin: true
      })
    }

  },
  login() {

    //已登录就返回
    if (this.data.isLogin) {
      return
    }
    console.log(openId)
    //-------------获取用户头像昵称---------------------    
    wx.getUserProfile({
      desc: '只有授权才能登陆',
      success: res => {
        console.log("授权成功", res)
        wx.setStorageSync('openId', openId)
        wx.setStorageSync('userInfo', res.userInfo)
        let avatarUrl = res.userInfo.avatarUrl
        let nickName = res.userInfo.nickName
        this.setData({
          gravatar: avatarUrl,
          nickName: nickName,
          isLogin: true
        })
        users.where({
            _openid: openId
          })
          .get()
          .then(res => {
            if (res.data.length == 0) {
              users.add({
                data: {
                  gravatar: avatarUrl,
                  nickName: nickName,
                  stars:{
                    single:[],
                    multiple:[],
                    judge:[]
                  },
                  test:[]
                }
              })
            }
          })
      },
    })
    //-------------------------------      
  },

  // 跳转到关于我们的界面
  go_aboutus(){
       console.log("跳转");
      wx.navigateTo({
        url: '../go_aboutus/go_aboutus',
      })
    },

    //测试记录
    go_testRec(){
      wx.redirectTo({
        url: '../test_detail/test_detail',
      })
    },
    //收藏
    go(){
      wx.navigateTo({
        url: '../star/star',
      })
    }
  
})
