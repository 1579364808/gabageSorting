// index.js
const recorderManager = wx.getRecorderManager() //这是录音功能的实例，必须的
const fs = wx.getFileSystemManager() //文件管理系统
Page({
    data: {
        category: null, //垃圾种类
        showRadio: false,
        gabages: [],
        selectedItem: null,
        buttonDisable: false,
    },
    onLoad(event) {
        this.setData({
            showDialog: false,
            selectedItem: null,
        })
        //加载时调用云函数获取token加入缓存
        wx.cloud.callFunction({
            name: "imgToken",
        }).then(res => {
            console.log(res)
            let token = res.result.data.access_token
            //写入缓存
            wx.setStorage({
                key: 'imgToken',
                data: {
                    token: token
                }
            })
        })
        wx.cloud.callFunction({
            name: "audioToken",
        }).then(res => {
            console.log(res)
            let token = res.result.data.access_token
            //写入缓存
            wx.setStorage({
                key: 'audioToken',
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
    //语音识别    
    beginRecord(event) {
        console.log(event);
        //录音的参数
        const options = {
            duration: 3000, //录音时间，默认是3s，提前松手会触发button的bindtouchend事件，执行停止函数并上传录音文件。
            sampleRate: 16000,
            numberOfChannels: 1,
            encodeBitRate: 48000,
            format: 'pcm'
        }
        recorderManager.start(options);
        wx.showLoading({
            title: '录音中',
        })

    },
    endRecord(event) {
        console.log(event);
        recorderManager.stop();
        //监听录音结束
        recorderManager.onStop(res => {
            console.log(res);
            let path = res.tempFilePath;
            console.log(path)
          fs.getFileInfo({
                filePath:path,
                success:res=>{
                    let len = res.size
                    let audio = fs.readFileSync(path, 'base64')
                    let token = wx.getStorageSync('audioToken').token
                    this.audio_rq(audio,token,len)
                }
            })
            wx.hideLoading()
           // 显示加载
            wx.showLoading({
                title: '正在识别中',
            })
        })
    },
    // //语音识别请求
    audio_rq(audio,token,fileSize) {
        let that = this
        wx.request({
            //进行post请求
            method: 'post',
            url: 'https://vop.baidu.com/pro_api',
            
            //请求的参数
            data: {
                format: 'pcm', //语音格式
                rate: 16000, //采样率
                channel: 1, //声道数
                cuid: "MelodyOfTears", //用户唯一标识  
                token:token,
                speech:audio,
                len:fileSize,
                dev_pid:80001
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                wx.hideLoading()
                console.log(res);
            }
        })

    },
    //图片识别    
    img_recog_onClick(event) {

        let path = event.detail.file.url
        let image = fs.readFileSync(path, 'base64') //将图片转换成base64
     
        //请求
        let token = wx.getStorageSync('imgToken').token
      
        console.log(token)
        this.img_rq(image, token)
        //显示加载
        wx.showLoading({
            title: '正在识别中',
        })
    },
    //图片识别请求
    img_rq(image, token) {
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
                let items = [];
                for (let i = 0; i < res.data.result.length; i++) {
                    let temp = {
                        name: res.data.result[i].keyword,
                        id: i
                    }
                    //对象数组
                    items.push(temp)
                }
                console.log(items)
                that.setData({
                    showRadio: true,
                    gabages: items //获取物品集
                })
            }
        })
    },
    ridio_event(event) {
        this.setData({
            selectedItem: event.detail.value
        })
    },
    pick_confirm() {
        if (this.data.selectedItem != null) {
            this.setData({
                buttonDisable: true,
            })
            wx.redirectTo({
                url: `../detail/detail?gabageName=${this.data.selectedItem}`,
            })
        }
    }
})