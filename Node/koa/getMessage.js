//放置Home相关的请求
const router = require("../../node_modules/koa-route")

const message = ctx => {
  ctx.body = {
    message: "成功获得数据"
  }
}

module.exports = {
  message
}