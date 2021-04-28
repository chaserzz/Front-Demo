const Koa = require("koa")
const useRoute = require("./router")
const path = require('path');
const serve = require('koa-static'); //静态资源
const cors = require("koa-cors")  //解决跨域的插件

const options = {
  origin: "http://localhost:3000",  //允许跨域的服务器地址，  *为所有。
  credentials: true,  //允许携带cookie
  
}


const app = new Koa()
app.use(cors(options))
app.use(useRoute.useHome)
app.use(useRoute.useAbout)
app.use(useRoute.useImg)
app.use(useRoute.useGetMsg)
app.use(serve(path.join(__dirname)))  //静态资源自动访问
app.listen(3002)
console.log("服务器启动成功")

