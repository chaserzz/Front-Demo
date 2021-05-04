const koa = require("../../node_modules/koa")
const router  = require("../../node_modules/koa-route")
const serve = require('../../node_modules/koa-static');  // 导入koa-static包
const path=require('path'); //path包
const fs = require("fs")  //文件包
var cacheControl = require('../../node_modules/koa-cache-control');  // 设置cache-control的中间件
const app = new koa()

// memory cache & disk cache 的对比案例，可以通过切换Tab
const compare = router.get('/', async (ctx) => {
  const html = fs.readFileSync(path.join(__dirname,"./index.html"),"utf8")
  ctx.body = html
})

//  no-cache & no-store 的对比案例  index.html中有3组相同的js，css，img的请求
// 请在下方配置cacheControl进行更换
const store = router.get('/store', async ctx =>{
  const html = fs.readFileSync(path.join(__dirname,"./index2.html"),"utf8")
  ctx.body = html
})

//利用插件设置cacheControl
app.use(cacheControl({
  maxAge: 88,   //设置资源过期时间为88888
  // noCache 开启
  // noCache: true  //请求不要直接使用缓存而需要比对，在逻辑上相当于上方的maxAge
  // noStore 开启
  noStore: true  
}))

app.use(compare) // 使用路由
app.use(store)

// 静态资源自动下载
app.use(serve(path.join(__dirname)))

app.listen(3030,()=>{
  console.log("服务器开启成功");
})