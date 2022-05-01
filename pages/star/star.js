const db = wx.cloud.database();
const users = db.collection('users');
const single = db.collection('single');
const multiple = db.collection('multiple');
const judge = db.collection('judge');
const _ = db.command
const $ = db.command.aggregate
let openId;
var del2 = new Set()
var del1 = new Set()
var del3 = new Set()
Page({
    data: {
        single: null,
        multiple: null,
        judge: null,
    },
    onLoad() {
        openId = wx.getStorageSync('openId')
        wx.showLoading({
            title: '数据加载中',
        });
        users.aggregate()
            .match({
                _openid: openId
            })
            .project({
                _id: 0,
                single: '$stars.single',
                multiple: '$stars.multiple',
                judge: '$stars.judge'
            })
            .end({
                success: res => {
                    let list = res.list[0]
                    console.log(list)
                    wx.cloud.callFunction({
                        name: "getStar",
                        data: {
                            type: 'single',
                            list: list.single
                        }
                    }).then(res => {
                        console.log(res)
                        let text1 = new Array()
                        for (let i = 0; i < res.result.list.length; i++) {
                            text1.push('取消收藏')
                        }
                        this.setData({
                            single: res.result.list.reverse(),
                            text1: text1
                        })
                    })

                    wx.cloud.callFunction({
                        name: "getStar",
                        data: {
                            type: 'multiple',
                            list: list.multiple
                        }
                    }).then(res => {
                        console.log(res)
                        let text2 = new Array()
                        for (let i = 0; i < res.result.list.length; i++) {
                            text2.push('取消收藏')
                        }
                        this.setData({
                            multiple: res.result.list.reverse(),
                            text2: text2
                        })
                    })
                    wx.cloud.callFunction({
                        name: "getStar",
                        data: {
                            type: 'judge',
                            list: list.judge
                        }
                    }).then(res => {
                        console.log(res)
                        console.log(list.judge)
                        let text3 = new Array()
                        for (let i = 0; i < res.result.list.length; i++) {
                            text3.push('取消收藏')
                        }
                        this.setData({
                            judge: res.result.list.reverse(),
                            text3: text3
                        })
                        wx.hideLoading()
                    })
                }
            })
    },
    onUnload() {
        let openId = wx.getStorageSync('openId')
        let temp = 'stars.single'
        console.log(Array.from(del1))
        users.where({
                _openid: openId
            })
            .update({
                data: {
                    [temp]: _.pull(_.in(Array.from(del1)))
                }
            })
            .then(res => {
                console.log(res)
            })
        let temp1 = 'stars.multiple'
        console.log(Array.from(del2))
        users.where({
                _openid: openId
            })
            .update({
                data: {
                    [temp1]: _.pull(_.in(Array.from(del2)))
                }
            })
            .then(res => {
                console.log(res)
            })
        let temp2 = 'stars.judge'
        console.log(Array.from(del3))
        users.where({
                _openid: openId
            })
            .update({
                data: {
                    [temp2]: _.pull(_.in(Array.from(del3)))
                }
            })
            .then(res => {
                console.log(res)
            })
    },
    star(event) {
        let id = parseInt(event.currentTarget.id)
        let num = event.target.dataset.num
        let text1 = this.data.text1
        console.log(event)
        if (del1.has(id)) {
            del1.delete(id)
        } else {
            del1.add(id)
        }
        console.log(del1)
        if (text1[num] == '取消收藏') {
            text1[num] = '收藏'
        } else {
            text1[num] = '取消收藏'
        }
        this.setData({
            text1: text1
        })
    },
    star1(event) {
        let id = parseInt(event.currentTarget.id)
        let num = event.target.dataset.num
        let text2 = this.data.text2
        console.log(id)
        if (del2.has(id)) {
            del2.delete(id)
        } else {
            del2.add(id)
        }
        console.log(del2)
        if (text2[num] == '取消收藏') {
            text2[num] = '收藏'
        } else {
            text2[num] = '取消收藏'
        }
        this.setData({
            text2: text2
        })
    },
    star2(event) {
        let id = parseInt(event.currentTarget.id)
        let num = event.target.dataset.num
        let text3 = this.data.text3
        console.log(id)
        if (del3.has(id)) {
            del3.delete(id)
        } else {
            del3.add(id)
        }
        console.log(del3)
        if (text3[num] == '取消收藏') {
            text3[num] = '收藏'
        } else {
            text3[num] = '取消收藏'
        }
        this.setData({
            text3: text3
        })
    }
})