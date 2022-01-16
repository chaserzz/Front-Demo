//放置Home相关的请求
const router = require("../../node_modules/koa-route")

function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds);
  });
}
const message = async ctx => {
    await sleep(200);
    const n = Math.random();
    // 随机挂掉接口
    if (n > 0.8) {
        ctx.body = n;
    } else {
        ctx.status = 404
        ctx.body = ''
    }
}

module.exports = {
  message
}