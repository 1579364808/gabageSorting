const cloud = require('wx-server-sdk')
var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify
// 设置APPID/AK/SK
var APP_ID = "25286028";
var API_KEY = "SZ4ekmOEKhF8QBLUqX6YTqiF";
var SECRET_KEY = "4o3fS0wOric9a4tKsoog4exSfSDmRB95";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);;
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {

    let fileId = event.fileId;

    //下载图片   异步完成
    let res = await cloud.downloadFile({
        fileID: fileId,
    })
    let image = res.fileContent.toString("base64");
    // 带参数调用通用物体识别
    let options = {
        "baike_num":"5"
    }
 return result =  client.advancedGeneral(image, options)

}