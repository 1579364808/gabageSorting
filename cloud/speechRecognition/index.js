// 云函数入口文件
const cloud = require('wx-server-sdk')

const AipSpeechClient = require("baidu-aip-sdk").speech;
const HttpClient = require("baidu-aip-sdk").HttpClient;
// 设置APPID/AK/SK
const APP_ID = "25285790";
const API_KEY = "GTUxlWGYXopXW32gYphEQM12";
const SECRET_KEY = "aCuYN79XgqMY1e7atXMwXZUlKd925bto";

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


cloud.init()




// 云函数入口函数
exports.main = async (event, context) => {
    HttpClient.setRequestOptions({timeout: 5000});
    HttpClient.setRequestInterceptor(function(requestOptions) {
        // 查看参数
        console.log(requestOptions)
        // 修改参数
        requestOptions.timeout = 5000;
        // 返回参数
        return requestOptions;
    });
}