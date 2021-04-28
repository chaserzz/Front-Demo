//Node的事件
const events = require("events")  //事件
const fs = require("fs")  //读取文件模块

const eventEmitter = new events.EventEmitter();  //触发事件对象
// 监听successRead事件，并触发回调函数
eventEmitter.on("successRead",(data)=>{
  console.log("文件读取成功",data);
})

fs.readFile("data.txt",(err,data) => {
  if(err){
    console.log(err.stack);
    return;
  }else{
    eventEmitter.emit("successRead",data.toString());
  }
})