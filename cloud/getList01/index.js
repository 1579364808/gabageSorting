// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("event.id",event.id)
  if(event.id==0){
   return await cloud.database().collection("gabage")
    .where({
      category:"干垃圾"
    })
    .skip(event.len)  //做分页用
    .limit(event.pageNum)
    .get()
  }
  if(event.id==1){
    return await cloud.database().collection("gabage")
    .where({
      category:"湿垃圾"
    })
    .skip(event.len1)  //做分页用
    .limit(event.pageNum)
    .get()
  }
  if(event.id==2){
    return await cloud.database().collection("gabage")
    .where({
      category:"可回收垃圾"
    })
    .skip(event.len2)  //做分页用
    .limit(event.pageNum)
    .get()
  }
  if(event.id==3){
    return await cloud.database().collection("gabage")
    .where({
      category:"有害垃圾"
    })
    .skip(event.len3)  //做分页用
    .limit(event.pageNum)
    .get()
  }

  if(event.id==4){
    return await cloud.database().collection("other_waste")
    .where({
      type:"大件垃圾"
    })
    .get()
  }

  if(event.id==5){
    return await cloud.database().collection("other_waste")
    .where({
      type:"装修垃圾"
    })
    .get()
  }

  if(event.id==6){
    return await cloud.database().collection("other_waste")
    .where({
      type:"电子废弃物"
    })
    .get()
  }



}