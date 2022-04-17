// pages/exam_detail/exam_detail.js
const db = wx.cloud.database();
const users = db.collection('users');
const _ = db.command
const $ = db.command.aggregate
var openId
class Img_star {
    constructor(list) {
        this.single = new Array(5)
        this.multiple = new Array(5)
        this.judge = new Array(5)
        this.stars = new Array(15)
        for (let i = 0; i < 15; i++) {
            this.stars[i] = "../../icons/star_o.png"
            if (i < 5) {
                this.single[i % 5] = list[i].onlyId
            } else if (i < 10) {
                this.multiple[i % 5] = list[i].onlyId
            } else {
                this.judge[i % 5] = list[i].onlyId
            }
        }
    }
    alterImg = function (id) {

        if (this.stars[id] == "../../icons/star_o.png") {
            this.stars[id] = "../../icons/star_y.png"
        } else {
            this.stars[id] = "../../icons/star_o.png"
        }
    }

    alterStarImg = function (list) {
        for (let i = 0; i < 15; i++) {
            let single = list.single
            let multiple = list.multiple
            let judge = list.judge
            if (i < 5) {
                for (let j = 0; j < single.length; j++) {
                    if (this.single[i % 5] == single[j]) {
                        this.stars[i] = "../../icons/star_y.png"
                    }
                }
            } else if (i < 10) {
                for (let j = 0; j < multiple.length; j++) {
                    if (this.multiple[i % 5] == multiple[j]) {
                        this.stars[i] = "../../icons/star_y.png"
                    }
                }
            } else {
                for (let j = 0; j < judge.length; j++) {
                    if (this.judge[i % 5] == judge[j]) {
                        this.stars[i] = "../../icons/star_y.png"
                    }
                }
            }
        }
    }
}





















Page({
    data: {
        list: [],
        archives: [],
        img_star: null
    },
    onLoad(event) {
       
        wx.getStorage({
                key: "record"
            })
            .then(res => {
                this.setData({
                    list: res.data.list,
                    archives: res.data.archives,
                    img_star: new Img_star(res.data.list)
                })

            })
            .then(res => {
                this.initStar()
            })
    },
    initStar() {
        openId = wx.getStorageSync('openId')
        let img_star = this.data.img_star
        users.aggregate()
            .match({
                _openid: openId
            })
            .project({
                _id: 0,
                single: $.setIntersection(['$stars.single', img_star.single]),
                multiple: $.setIntersection(['$stars.multiple', img_star.multiple]),
                judge: $.setIntersection(['$stars.judge', img_star.judge])
            })
            .end({
                success: res => {
                    let list = res.list[0]
                    console.log(list)
                    img_star.alterStarImg(list)
                    this.setData({
                        img_star:img_star
                    })
                }
            })
    },

    star(event) {

        let id = event.currentTarget.id

        console.log(id)
        if(id<5){
            this.update(id,'single')
        }else if(id<10){
            this.update(id,'multiple')
        }else{
            this.update(id,'judge')
        }
    },

    update(id,type){
        let temp = 'stars.'+type
        let img_star = this.data.img_star
        if(img_star.stars[id]=="../../icons/star_y.png"){
            users.where({
                _openid:openId
            })
            .update({
                data:{
                   [temp]:_.pull(this.data.list[id].onlyId)
                }
            })
            .then(res=>{
                img_star.alterImg(id)
                this.setData({
                    img_star:img_star 
                })
            })
        }else{
            users.where({
                _openid:openId
            })
            .update({
                data:{
                    [temp]:_.push(this.data.list[id].onlyId)
                }
            })
            .then(res=>{
                img_star.alterImg(id)
                this.setData({
                    img_star:img_star 
                })
            })
        }
    }
})