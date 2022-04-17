//wx-server-sdk 与小程序端的云 API 以同样的风格提供了数据库、存储和云函数的 API
const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const single = db.collection('single')
//云函数入口函数    
//await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误
exports.main = async (event)=>{
    return await single
    .aggregate()
    .sample({
        size:5
    })
    .end()
}