const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const mutiple = db.collection('multiple')
//云函数入口函数    
//await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误
exports.main = async (event)=>{
    return await mutiple
    .aggregate()
    .sample({
        size:event.size
    })
    .end()
}