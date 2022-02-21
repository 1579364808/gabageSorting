// pages/camera/camera.js
Page({
    data: {
        src: null
    },
    //点击拍照
    shoot() {
        let camera = wx.createCameraContext()
        camera.takePhoto({
            quality: 'high',
        }).then(res => {
            //照片路径
            this.setData({
                src: res.tempImagePath
            })
            //上传识别
            this.upload(res.tempImagePath)
        }).catch(err => {
            console.log(err.detail)
        }).finally(() => {


            //拍照完成切换到主页
            wx.navigateTo({
                url: `../index/index?src=${this.data.src}`,
            })

        })
    },
    //图片上传函数
    upload(path) {
        let name = "image" + Date.now()
        wx.cloud.uploadFile({
            cloudPath: name, // 上传至云端的路径
            filePath: path, // 小程序临时文件路径
        }).then(res => {
            //获取文件ID 
            let id = res.fileID
            //调用云函数进行图像识别
            wx.cloud.callFunction({
                name: "imageVerify",
                data: {
                    fileId: id
                }
            }).then(res=>{
                console.log(res)
            })
        })

    }

})