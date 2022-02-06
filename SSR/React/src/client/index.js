// 我是一个js文件，帮助由ssr渲染出来的Dom元素添加对应的js事件
// 需要在服务端中设置对应的脚本文件路径
// src/client/index.js
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from '../share/routes'
import { Provider } from 'react-redux'
import store from './createStore'

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      { renderRoutes(routes) }
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
