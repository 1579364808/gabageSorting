// pages/exam_detail/exam_detail.js
const options = {
    0: "A",
    1: "B",
    2: "C",
    3: "D"
}
Page({

    data: {
        set: [],

    },
    onLoad() {
        wx.getStorage({
                key: "record"
            })
            .then(res => {
                console.log(res)
                let set = []
                for (let i = 0; i < 10; i++) {
                    let temp = res.data
                    let id = temp.list[i].res                   
                     let whole_question = {
                        question: temp.list[i].question,
                        options: temp.list[i].options,
                        res: options[id],
                    }
                    id = temp.preservation[i]
                    let item = {
                        whole_question: whole_question,
                        user_answer: options[temp.preservation[i]]
                    }
                    set.push(item)
                }
                this.setData({
                    set: set
                })
            })
    }
})