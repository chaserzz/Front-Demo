//利用Node实现http服务
const http = require("http")
const url = require("url")
const util = require("util")

const querystring = require("querystring")

http.createServer(function(req,res){
  if(req.url.indexOf("get")){
    //利用if做一个简单的路由,get则是get方法
    let params = url.parse(req.url).query  //get请求从路径中获取参数
    res.write(`get的参数:${params}`)
    res.end()
  }else{
    let post = ""  // 用来暂存post的变量
    
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
      post += chunk;
    });

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
    post = querystring.parse(post);
    res.end(util.inspect(post));
  });
  }
}).listen(8888)

console.log("服务器启动");

