//防止about路径相关的数据
const router = require("koa-route")

const about = ctx => {
  ctx.body = "About页面"
}

module.exports = {
  about
}