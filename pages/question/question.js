// pages/question/question.js
const db = wx.cloud.database()
const questions = db.collection('questions')


Page({
    onSubmit(event) {
        // console.log(event.detail.value)
        let item = event.detail.value
        for (let key in item) {
            // console.log(key)
            if (item[key] === null || item[key] === "") {
                wx.showModal({
                    showCancel: false,
                    title: '添加失败',
                    content: '当前存在输入框为空',
                })
                return
            }
        }
        let old;
        questions.get().then(res => {
            old = res.data
            console.log(old)
            for (let i = 0; i < old.length; i++) {
                if (old[i].options[0] === item.A && old[i].options[1] === item.B && old[i].options[2] === item.C && old[i].options[3] === item.D) {
                    wx.showModal({
                        showCancel: false,
                        title: '添加失败',
                        content: '当前存在相同题目',
                    })
                    return
                }

            }
        })




        questions.add({
            data: {
                questions: item.question.trim(),
                options: [item.A.trim(), item.B.trim(), item.C.trim(), item.D.trim()],
                res: item.res.trim()
            }
        })



    },
    onInput(event) {
        console.log(event)
        if(event.detail.keyCode!=8&&event.detail.keyCode<96||event.detail.keyCode>99){
            wx.showModal({
                showCancel: false,
                title: '警告',
                content: '请输入0-3的数字',
            })
            return
        }
    }
})