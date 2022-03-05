const db = wx.cloud.database()
const judge = db.collection('judge')

Page({
    data: {
        value: ""
    },
    onSubmit(event) {
        console.log(event.detail.value)
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
        this.setData({
            value: ""
        })

        let question = item.question.trim();
        let result = item.res
        console.log(result)
        judge.where({
            question: question
        }).get().then(res => {
            if (res.data.length !== 0) {
                wx.showModal({
                    showCancel: false,
                    title: '添加失败',
                    content: '当前存在相同题目',
                })
                return
            }
            judge.count().then(res => {
                let cnt = res.total
                judge.add({
                    data: {
                        question: question,
                        res: result,
                        onlyId: cnt
                    }
                }).then(res => {
                    wx.showToast({
                        title: '添加成功',
                    })
                })
            })
        })
    },
    onInput(event) {
        console.log(event)
        let keyCode = event.detail.keyCode
        if (keyCode == 8 || keyCode >= 48 && keyCode <= 49 || keyCode >= 96 && keyCode <= 97) {
            return
        }
        wx.showModal({
            showCancel: false,
            title: '警告',
            content: '只能输入0或1（正确或错误）',
        })
    }
})