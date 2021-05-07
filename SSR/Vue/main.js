const Vue = require("vue")
const Koa = require("koa")
const fs = require("fs")
const path = require("path")
const app = new Vue({
  template: `<div> Hello,World </div>`,
})

const server = new Koa()  //创建一个koa的服务器
const render = require("vue-server-renderer").createRenderer({
  template: fs.readFileSync(path.resolve(__dirname,"index.html"),"utf8")
})  //创建ssr对象

// 模板插值配置
const content = {
  message: "我是模板插值渲染的数据",
  third:`<p style="color: red">我是模板插值渲染的p标签</p>`
}

server.use(ctx =>{
  //解析Vue的实例
  render.renderToString(app,content,(err,html) =>{
    if(err) throw err //抛出错误
    ctx.body = html  //将解析后的html代码返回
  })
})

server.listen(4399,()=>{
  console.log("服务器启动成功");
})