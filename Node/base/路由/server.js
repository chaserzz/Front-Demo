const http = require("http")
const url = require("url")

// 开启服务器
function start (route){
  //onRequest是一个回调函数，获得请求时会触发
  function onRequest(req,res){
    console.log(req.url);
    let pathname = url.parse(req.url).pathname  //将url中的路径解析出来，不包括任何参数
    console.log(`request ${pathname} recevied`);

    route(pathname)

    res.writeHead(200,{"Content-type": "text/plain"})  //返回头配置
    res.write("Finish Request")  //返回内容
    res.end()
  }
  http.createServer(onRequest).listen(8000)
  console.log("server started");
}

exports.start = start  //导出start