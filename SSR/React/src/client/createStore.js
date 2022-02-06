import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk' // thunk 中间件
import reducer from '../share/reducer'

// const store = createStore(reducer, {}, applyMiddleware(thunk))

// 接受 window.INITIIAL_STATE 创建 store
const store = createStore(reducer, window.INITIIAL_STATE, applyMiddleware(thunk))
export default store
