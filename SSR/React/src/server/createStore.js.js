// src/server/createStore.js

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../share/reducer";

// 避免请求污染 通过函数创建 store 并返回
export default () => createStore(reducer, {}, applyMiddleware(thunk))
