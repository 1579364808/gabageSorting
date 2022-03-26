const db = wx.cloud.database()
const multiple = db.collection('multiple')

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
        let temp = [item.A.trim(), item.B.trim(), item.C.trim(), item.D.trim()];
        let question = item.question.trim();
        let result = item.res.trim().split(" ")
        console.log(result)
        multiple.where({
            options: temp,
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
            multiple.count().then(res => {
                let cnt = res.total
                multiple.add({
                    data: {
                        question: question,
                        options: temp,
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
        if (keyCode == 8 || keyCode ==32|| keyCode >= 48 && keyCode <= 51 || keyCode >= 96 && keyCode <= 99) {
            return
        }
        wx.showModal({
            showCancel: false,
            title: '警告',
            content: '请输入0-3的数字',
        })
    }
})