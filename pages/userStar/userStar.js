const db = wx.cloud.database();
const users = db.collection('users');
import moment from 'moment'



class Rec {
    constructor(list, archives, time) {
        this.t = 0,
        this.f = 15
        this.time = time
        for (let i = 0; i < 5; i++) {
            if (archives[i] == list.res) {
                this.t++;
                this.f--;
            }
        }
        for (let i = 5; i < 10; i++) {
            let flag = new Array(4)
            for (let j = 0; j < list[i].res.length; j++) {
                flag[list[i].res[j]] = list[i].res
            }
            for (let j = 0; j < 4; j++) {
                if (archives[i][j] != flag[j]) {
                    this.t++;
                    this.f--;
                }
                break;
            }
        }
        for (let i = 10; i < 15; i++) {
            if (archives[i] == list.res) {
                this.t++;
                this.f--;
            }
        }
    }
}













var list = new Array()
var archives = new Array()


Page({
    data: {
        list: [],
        date: '',
        cnt: null
    },
    onLoad: function (options) {
        this.init()

    },
    init() {
        let openId = wx.getStorageSync('openId')
        let that = this
        users.aggregate()
            .match({
                _openid: openId
            })
            .project({
                test: 1
            })
            .end({
                success: res => {
                    let cnt = new Array(15);
                    for (let i = 0; i < res.list[0].test.length; i++) {
                        let test = res.list[0].test[i]
                        console.log(test)
                        let date = new Date(test.date)
                        let time = moment(date).format("YYYY-MM-DD HH:mm:ss")
                        let rec = new Rec(test.list, test.archives, time)
                        cnt[i]=rec
                        list.push(test.list),
                        archives.push(test.archives)
                    }
                    that.setData({
                        cnt: cnt
                    })
                }
            })
    },
    onTap(event) {
        let id = event.currentTarget.id
        console.log(id)
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
    }
})