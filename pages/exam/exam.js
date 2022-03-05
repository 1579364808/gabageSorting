// pages/exam/exam.js
Page({

    data: {
        list: [],
        currentIndex: 0,
        question: null,
        options: null,
        Class: ["normal", "normal", "normal", "normal"],
        preservation: ["", "", "", "", "", "", "", "", "", ""]
    },
    onLoad: function (options) {
        this.getList()
    },
    getList() {
        wx.cloud
            .callFunction({
                name: "questionPool",
                data: {
                    type: "selectRecord",
                    page: 10, //第几页
                    size: 10 //每页的条数
                }
            })
            .then(res => {
                let temp = res.result.data
                console.log(temp)
                this.setData({
                    list: temp,
                    question: temp[0].question,
                    options: temp[0].options,
                })
            })
    },
    //当前选项
    select(event) {
        console.log(event)
        let id = Number(event.currentTarget.id)
        console.log(id)
        let Class = ["", "", "", ""]
        for (let i = 0; i < Class.length; i++) {
            if (id == i) {
                Class[i] = "onClick"
            } else {
                Class[i] = "normal"
            }
        }
        let temp = this.data.preservation
        let currentIndex = this.data.currentIndex
        temp[currentIndex] = id
        this.setData({
            preservation: temp,
            Class: Class
        })
    },
    //上一题
    goPrev(event) {
        let currentIndex = this.data.currentIndex
        let newIndex = currentIndex - 1
        console.log(this.data.preservation)
        if (newIndex < 0) {
            console.log("已经是第一题")
            return
        }
        let question = this.data.list[newIndex].question
        let options = this.data.list[newIndex].options
        let res = this.data.list[newIndex].res
        //获取样式    和   用户答题情况
        let Class = this.data.Class
        let preservation = this.data.preservation
        for (let i = 0; i < 4; i++) {
            if (i === preservation[currentIndex - 1]) {
                Class[i] = "onClick"
            } else {
                Class[i] = "normal"
            }
        }
        this.setData({
            currentIndex: newIndex,
            question: question,
            options: options,
            res: res,
            Class: Class
        })
    },
    //下一题
    goNext(event) {
        let currentIndex = this.data.currentIndex
        let newIndex = currentIndex + 1

        console.log(this.data.preservation)
        if (newIndex > 9) {
            console.log("已经是最后一题")
            return
        }

        let question = this.data.list[newIndex].question
        let options = this.data.list[newIndex].options
        let res = this.data.list[newIndex].res
        //获取样式    和   用户答题情况
        let Class = this.data.Class
        let preservation = this.data.preservation
        if (preservation[currentIndex + 1] === "") {
            for (let i = 0; i < 4; i++) {
                Class[i]="normal"
            }
        }else{
             for (let i = 0; i < 4; i++) {
                 if(preservation[currentIndex+1]==i){
                     Class[i] = "onClick"
                 }else{
                     Class[i]="normal"
                 }
            }
        }
        this.setData({
            currentIndex: newIndex,
            question: question,
            options: options,
            res: res,
            Class: Class
        })
    },
    //提交
    onSubmmit(){
        let list = this.data.list
        let preservation = this.data.preservation
        wx.setStorage({
            key:"record",
            data:{
           list: list,
           preservation: preservation,
            }
        })
 
        for (let i = 0; i < 10; i++) {
           if(preservation[i]===""){
               wx.showModal({
                 showCancel:false,
                 title:"提示",
                 content:"当前有未做的题目"
                
               })
                return
           }
            
        }  
             wx.redirectTo({
          url: `../exam_detail/exam_detail`,
        })
    }
})