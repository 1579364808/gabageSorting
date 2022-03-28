const single = require('./single/index') //导入
const mutiple = require('./mutiple/index') 
const judge = require('./judge/index') 
exports.main = async (event, context) => {

    switch (event.type) {
        case '单选题':
            return await single.main(event, context)
        case '多选题':
            return await mutiple.main(event, context)
        case '判断题':
            return await judge.main(event, context)
    }
}