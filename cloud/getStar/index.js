//wx-server-sdk 与小程序端的云 API 以同样的风格提供了数据库、存储和云函数的 API
const single = require('./single/index') //导入
const multiple = require('./multiple/index') 
const judge = require('./judge/index') 


exports.main = async (event)=>{
    switch (event.type) {
        case 'single':
            return await single.main(event.list)
        case 'multiple':
            return await multiple.main(event.list)
        case 'judge':
            return await judge.main(event.list)
    }
}