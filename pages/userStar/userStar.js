const db = wx.database
const users = db.collection('users')




Page({
    onLoad: function (options) {

    },

    init() {
        let openId = wx.getStorageSync('openId')
        users.aggregate()
            .match({
                _openid: openId
            })
            .project({
                test:1
            })
            .end({
                success: res => {
                    console.log()
                }
            })
    }
})