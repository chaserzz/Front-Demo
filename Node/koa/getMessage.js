//放置Home相关的请求
const router = require("koa-route")

const message = ctx => {
  ctx.body = {
    message: "成功获得数据"
  }
}

module.exports = {
  message
}