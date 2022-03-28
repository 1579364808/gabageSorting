//wx-server-sdk 与小程序端的云 API 以同样的风格提供了数据库、存储和云函数的 API
const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const judge = db.collection('judge')
//云函数入口函数    
//await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误
exports.main = async (event)=>{
    return await judge
    .skip((event.page-1)*event.size)
    .limit(event.size)//每次查询多少条
    .get()
}