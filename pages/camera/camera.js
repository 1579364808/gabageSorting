// pages/camera/camera.js


Page({
    data: {
        token: null,
    },
    onLoad(event) {
        wx.getStorage({
            key: "baidutoken"
        }).then(res => {
            console.log(res)
            this.setData({
                token: res.data.token
            })
        })

    },

    //点击拍照
    shoot() {

        let path = null //图片路径
        let camera = wx.createCameraContext()
        camera.takePhoto({
            quality: 'high',
        }).then(res => {
            path = res.tempImagePath
            let fs = wx.getFileSystemManager() //获取文件管理系统
            let image = fs.readFileSync(path, 'base64') //将图片转换成base64
            // console.log(image)
            wx.showLoading({
                title: '正在识别中',
            })
            //请求
            this.rq(image, this.data.token)
        }).catch(err => {
            console.log(err)
        })



    },
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
                let gabageName = res.data.result[0].keyword
                console.log(gabageName)
                //拍照完回到主页
                wx.navigateTo({
                    url: `../detail/detail?gabageName=${gabageName}`,
                })
                wx.hideLoading()
            }

        })
    }



})