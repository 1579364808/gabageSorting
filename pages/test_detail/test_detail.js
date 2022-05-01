const db = wx.cloud.database();
const users = db.collection('users');
const $ = db.command.aggregate
const _ = db.command
import moment from 'moment'
class Rec {
    constructor(list, archives, time,timeStamp) {
        this.t = 0,
        this.f = 15
        this.time = time,
        this.timeStamp = timeStamp
        for (let i = 0; i < 5; i++) {
            if (archives[i] == list[i].res) {
                console.log(i, "对了");
                this.t++;
                this.f--;
            }
        }
        for (let i = 5; i < 10; i++) {
            let flag = new Array(4)
            for (let j = 0; j < list[i].res.length; j++) {
                flag[list[i].res[j]] = list[i].res[j]
            }
            if (archives[i][0] == flag[0] && archives[i][1] == flag[1] && archives[i][2] == flag[2] && archives[i][3] == flag[3]) {
                console.log(i, "对了");
                this.t++;
                this.f--;
            }
        }
        for (let i = 10; i < 15; i++) {
            if (archives[i] == list[i].res) {
                console.log(i, "对了");
                this.t++;
                this.f--;
            }
        }
    }
}













var list = new Array()
var archives = new Array()
var  openId 

Page({
    data: {
        list: [],
        cnt: null
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中'
        })
        this.init()

    },
    init() {
        openId= wx.getStorageSync('openId')
        let that = this
        users.aggregate()
            .match({
                _openid: openId
            })
            .project({
                test: $.reverseArray('$test'),
            })
            .end({
                success: res => {
                    let cnt = new Array();
                    for (let i = 0; i < res.list[0].test.length; i++) {
                        let test = res.list[0].test[i]
                        console.log(test.list)
                        let date = new Date(test.date)
                        let time = moment(date).format("YYYY-MM-DD HH:mm:ss")
                        let rec = new Rec(test.list, test.archives, time,test.date)
                        cnt.push(rec)
                        list.push(test.list),
                            archives.push(test.archives)
                    }
                    that.setData({
                        cnt: cnt,
                    })
                    wx.hideLoading();
                }
            })
    },
    onTap(event) {
        let id = event.currentTarget.id
        wx.setStorage({
            key: "record",
            data: {
                list: list[id],
                archives: archives[id]
            }
        })
        wx.navigateTo({
            url: `../exam_detail/exam_detail`,
        })
    },
    onClose(event) {

        let cnt = this.data.cnt
        let id = event.currentTarget.dataset.num
        console.log(id)
        const {
            position,
            instance
        } = event.detail;
        if (position == 'right') {
            wx.showModal({
                showCancel: true,
                content: '确定删除吗？',
            }).then((res) => {
                if (res.confirm) {
                    this.delItem(id)
                    cnt.splice(id, 1);
                    this.setData({
                        cnt: cnt
                    })
                } else if (res.cancel) {
                    instance.close();
                }
               
            });
        }
    },
    delItem(id) {
        console.log(id)
        let time = moment(this.data.cnt[id].timeStamp).valueOf()
        console.log(time)
        users.where({
                _openid: openId
            })
            .update({
                data: {
                    test: _.pull({
                        date: _.eq(time)
                    })
                }
            })
            .then(res => {
                console.log(res)
            })
    }
})