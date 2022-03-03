const selectRecord = require('./selectRecord/index')//导入

exports.main = async (event,context) =>{

    switch(event.type){
        case 'selectRecord':
            return await selectRecord.main(event,context)
    }
}