import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../share/routes';
import { Provider } from 'react-redux'
export default function renderer(url,store){
  const initialState = JSON.stringify(store.getState())
  // renderRoutes(routes) 将路由配置转换成路由组件
  // 创建服务端路由管理
  const content = renderToString(
    <Provider store={store}>
    <StaticRouter location={url}>
      { renderRoutes(routes) }
    </StaticRouter>
    </Provider>);

  return `<html>
  <head>
    <title>test</title>
  </head>
  <body>
    <span>服务端渲染出了真实DOM:  </span>
    <div id="root">${content}</div>
    <img src="img.jpg" />
    <script src="client.js"></script>
    <script>window.INITIIAL_STATE=${initialState}</script>
  </body>
</html>
`}
