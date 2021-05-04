//放置Home相关的请求
const router = require("../../node_modules/koa-route")

const home = ctx => {
  ctx.body = "Home页面"
}

module.exports = {
  home
}