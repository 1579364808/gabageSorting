//用户答案
class UserAnswer {
    constructor() {
        this.archives = new Array(15)
        for (let i = 5; i < 10; i++) {
            this.archives[i] = [null, null, null, null]
        }
    }
    //添加答案
    alterAns = function (type, id, currentIndex) {
        if (type == '单选题') {
            this.archives[currentIndex] = id
        } else if (type == '多选题') {

            if (id == this.archives[currentIndex][id]) {
                this.archives[currentIndex][id] = null
                return
            }
            this.archives[currentIndex][id] = id
        } else {
            this.archives[currentIndex] = id
        }
    }

}
//选择题类
class Choice {
    //构造方法 
    constructor(question, items, res) {
        this.question = question
        this.items = items;
        this.res = res;
        this.Class = ["choice_normal", "choice_normal", "choice_normal", "choice_normal"]
    }
    //点击改变样式的方法
    alterStyle = function (type, id) {
        console.log(type)
        if (type == '单选题') {
            for (let i = 0; i < 4; i++) {
                if (id == i) {
                    this.Class[i] = "choice_onClick"
                } else {
                    this.Class[i] = "choice_normal"
                }
            }
        } else {
            for (let i = 0; i < 4; i++) {
                if (id == i) {
                    if (this.Class[i] == "choice_normal") {
                        this.Class[i] = "choice_onClick"
                    } else {
                        this.Class[i] = "choice_normal"
                    }
                }
            }
        }
    }

}

//判断题类
class Judge {
    //构造方法 

    constructor(question, res) {
        this.question = question
        this.items = ['对', '错']
        this.res = res
        this.Class = ["judge_normal", "judge_normal"]
    }
    //点击改变样式的方法
    alterStyle = function (id) {
        for (let i = 0; i < 2; i++) {
            if (id == i) {
                this.Class[i] = "judge_onClick"
            } else {
                this.Class[i] = "judge_normal"
            }
        }
    }
}

















































Page({
    data: {
        list: [], //云函数获取的题目集    分三段   单选题0-4   多选题5-9   判断题10-14
        currentIndex: 0, //当前页面的下标
        userAnswer: new UserAnswer() //用户答案
    },
    onLoad: function (options) {
        this.getList()
    },
    //获取题目
    getList() {
        wx.cloud
            .callFunction({
                name: "questionPool",
                data: {
                    type: '单选题',
                    page: 2, //第几页
                    size: 5 //每页的条数
                }
            })
            .then(res => {
                let temp = res.result.data
                let choices = new Array(5)
                for (let i = 0; i < 5; i++) {
                    let choice = new Choice(temp[i].question, temp[i].options, temp[i].res)
                    choices[i] = choice
                }
                this.setData({
                    list: this.data.list.concat(choices)
                })
            })
            .then(() => {
                wx.cloud
                    .callFunction({
                        name: "questionPool",
                        data: {
                            type: '多选题',
                            page: 2, //第几页
                            size: 5 //每页的条数
                        }
                    })
                    .then(res => {
                        let temp = res.result.data

                        console.log(temp)
                        let choices = new Array(5)
                        for (let i = 0; i < 5; i++) {
                            let choice = new Choice(temp[i].question, temp[i].options, temp[i].res)
                            choices[i] = choice
                        }
                        this.setData({
                            list: this.data.list.concat(choices)
                        })
                    })
                    .then(() => {
                        wx.cloud
                            .callFunction({
                                name: "questionPool",
                                data: {
                                    type: '判断题',
                                    page: 2, //第几页
                                    size: 5 //每页的条数
                                }
                            })
                            .then(res => {
                                let temp = res.result.data
                                let choices = new Array(5)
                                for (let i = 0; i < 5; i++) {
                                    let choice = new Judge(temp[i].question, temp[i].res)
                                    choices[i] = choice
                                }
                                this.setData({
                                    list: this.data.list.concat(choices)
                                })
                            })
                    })
            })
    },

    onTap(event) {
        let id = event.currentTarget.id
        let curIndex = this.data.currentIndex
        let cur = this.data.list[curIndex]
        let userAnswer = this.data.userAnswer
        console.log(userAnswer)
        console.log("选择了", id)
        console.log('当前题号', curIndex)

        //单选题
        if (curIndex < 5) {
            //改变样式   改变答案
            cur.alterStyle('单选题', id)
            userAnswer.alterAns('单选题', id, curIndex)
            let Class = "list[" + curIndex + "].Class"
            this.setData({
                [Class]: cur.Class,
                userAnswer: userAnswer
            })
        } else if (curIndex >= 5 && curIndex < 10) {
            cur.alterStyle('多选题', id)
            userAnswer.alterAns('多选题', id, curIndex)
            console.log(cur)
            let str = "list[" + curIndex + "].Class"
            this.setData({
                [str]: cur.Class,
                userAnswer: userAnswer
            })
        } else {
            cur.alterStyle(id)
            userAnswer.alterAns('判断题', id, curIndex)
            let str = "list[" + curIndex + "].Class"
            this.setData({
                [str]: cur.Class,
                userAnswer: userAnswer
            })
        }
    },

    goNext() {

        let curIndex = this.data.currentIndex
        if (curIndex == 14) {
            return
        }
        let newIndex = curIndex + 1
        this.setData({
            currentIndex: newIndex
        })
    },
    goPrev() {

        let curIndex = this.data.currentIndex
        if (curIndex == 0) {
            return
        }
        let newIndex = curIndex - 1
        this.setData({
            currentIndex: newIndex
        })
    },
    onSubmmit() {


        let userAns = this.data.userAnswer
        console.log(userAns)
        for (let i = 0; i < 15; i++) {
            if (i < 5 || i > 9) {
                if (userAns.archives[i] == null || userAns.archives[i] == '') {
                    wx.showModal({
                        showCancel: false,
                        title: "提示",
                        content: "当前有未做的题目"
                    })
                    return
                }
               
            } else {
                let flag = true
                for (let j = 0; j < 4; j++) {
                    if (userAns.archives[i][j] != null) {
                        flag = false
                        break
                    }
                }
                if (flag==true) {
                    wx.showModal({
                        showCancel: false,
                        title: "提示",
                        content: "当前有未做的题目"
                    })
                    return
                }
            }
        }
        let list = this.data.list
        wx.setStorage({
            key: "record",
            data: {
                list: list,
                userAns: userAns
            }
        })

        wx.redirectTo({
            url: `../exam_detail/exam_detail`,
        })

    }

})