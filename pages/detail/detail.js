const db = wx.cloud.database();
const gabage = db.collection('gabage')

Page({
    data: {
        inputVal: '',
        gabageName: null,
        category: null,
        list: [], //s搜索的结果列表
        historyList: [], //搜索历史的数组
        color: []
    },

    //获取输入的搜索词
    getKey(e) {
        this.setData({
            gabageName: e.detail.value
        })
    },
    //保存历史搜索记录
    saveSearchHistory() {
        var inputVal = this.data.gabageName
        var historyList = this.data.historyList
        if (inputVal == '') {
            return
        }
        if (historyList.length < 10) { //限制数组条数
            historyList.unshift(inputVal)
        } else {
            historyList.pop()
            historyList.unshift(inputVal)
        }
        //将历史记录数组整体储存到缓存中
        wx.setStorageSync('historyList', historyList)
    },
    openHistorySearch: function () {
        this.setData({
            historyList: wx.getStorageSync('historyList') || [],
        })
    },

    //删除历史记录
    historyDelFn: function () { //删除历史记录和本地存储
        wx.showModal({
            title: '清空搜索历史',
            content: `确定清空全部搜索历史？`,
            success: (res) => {
                if (!res.confirm) {
                    return
                }
                wx.removeStorageSync('historyList')
                this.setData({
                    historyList: []
                })
                wx.showToast({
                    icon: 'none',
                    title: '删除历史记录成功',
                })
            }
        })
    },

    onLoad: function (event) {
        if (event.gabageName) {
            this.setData({
                gabageName: event.gabageName
            })
            this.goSearch()
        }
        this.openHistorySearch()
    },

    //搜索
    goSearch() {
        if (!this.data.gabageName) {
            wx.showModal({
                title: '请输入要搜索的内容',
                showCancel: false,
            })
            this.setData({
                list: null //当搜索为空时，把之前的显示的列表置为空，从而让历史列表进行显示
            })
            return
        }
        wx.showLoading({
            title: '正在玩命加载中...',
        })
        db.collection('gabage')
            .where({
                name: db.RegExp({
                    regexp: this.data.gabageName, //要搜素的词
                    options: 'i', //不区分大小写
                })
            })
            .get()
            .then(res => {
                console.log(res.data);
                res.data.map((item) => {
                    item.name = item.name.replace(this.data.gabageName, //替换输入框的内容
                        `<span style="color:skyblue;">${this.data.gabageName}</span>`) //模板字符串使用span标签设置高亮颜色
                })
                this.setData({
                    list: res.data
                })
                wx.hideLoading()

                if (this.data.list.length == 0) { //友好提示
                    wx.showModal({
                        title: '无搜索结果~',
                        content: `无法为“${this.data.gabageName}”进行分类`,
                        showCancel: false,
                    })
                }
                this.saveSearchHistory() //储存搜索记录
            })
    },
})