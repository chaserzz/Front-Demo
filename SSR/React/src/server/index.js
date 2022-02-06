const Koa = require('koa');
const path = require('path');
const serve = require('koa-static'); //静态资源
const { default: renderer } = require('./render');
import { matchRoutes } from 'react-router-config';
import createStore  from './createStore.js';
import routes from '../share/routes.js';
const app = new Koa();

app.use(serve(path.join(__dirname,'../public')))  //静态资源自动访问

// response
app.use(async ctx => {
  const store = createStore();
  console.log('store',store);
  // 匹配路由 执行请求数据操作
  const promises = matchRoutes(routes, ctx.request.url).map(({ route }) => {
    console.log('route',route);
    if (route.loadData) {
      // 传入 store 以便调用 dispatch 函数
      return route.loadData(store)
    }
  })
  await Promise.all(promises)
  const body = renderer(ctx.request.url,store);
  ctx.body = body
});

app.listen(3000,() => {
  console.log('koa started');
});