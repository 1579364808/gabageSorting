// index.js

Page({
    data: {
        category: null, //垃圾种类
        showRadio: false,
        gabages: [],
        selectedItem:null,
        buttonDisable:false,
    },
    onLoad(event) {
        this.setData({
            showDialog: false,
            selectedItem:null,
        })
        //加载时调用云函数获取token加入缓存
        wx.cloud.callFunction({
            name: "baiduAccessToken",
        }).then(res => {
            let token = res.result.data.access_token
            //写入缓存
            wx.setStorage({
                key: 'baidutoken',
                data: {
                    token: token
                }
            })
        })

    },
    onSearch(event) {
        wx.navigateTo({
            url: `../detail/detail?gabageName=${event.detail}`,
        })
    },
    onClick(event) {
        let fs = wx.getFileSystemManager() //获取文件管理系统
        let path = event.detail.file.url
        let image = fs.readFileSync(path, 'base64') //将图片转换成base64

        //请求
        let token = wx.getStorageSync('baidutoken').token

        console.log(token)
        this.rq(image, token)
        //显示加载
        wx.showLoading({
            title: '正在识别中',
        })
    },
    //识别请求
    rq(image, token) {
        let that = this

        wx.request({

            //进行post请求
            method: 'post',
            url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general', //仅为示例，并非真实的接口地址
            //请求的参数
            data: {
                access_token: token, //百度的accessToken
                image: image,
                baike_num: 5 //百科信息结果数
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                wx.hideLoading()
                let  items  = [];
                for (let i = 0; i < res.data.result.length; i++) {
                    let temp = {
                        name:res.data.result[i].keyword,
                        id:i
                    }
                    //对象数组
                    items.push(temp)
                }
                console.log(items)
                that.setData({
                    showRadio:true,
                    gabages: items //获取物品集
                })             
            }
        })
    },
    ridio_event(event){
        this.setData({
            selectedItem:event.detail.value
        }) 
    },
    confirm(){
        if(this.data.selectedItem!=null){
            this.setData({
                buttonDisable:true,   
            }) 
            wx.redirectTo({
                url: `../detail/detail?gabageName=${this.data.selectedItem}`,
            })
        }   
    }
})