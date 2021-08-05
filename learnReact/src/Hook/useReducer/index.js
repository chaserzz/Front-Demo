import {Fragment, memo, useReducer } from "react"

import Child from "./Child"

export default memo(function UseReducer(){
  const initState = {count:0}  //创建一个初始化状态

  //创建一个纯函数reducer
  function reducer(state,action){
    const newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
      case "add":{
        newState.count++
        return newState
      }
      case "sub":{
        newState.count--
        return newState
      }
      default: 
              return state
    }
  }
  
  //返回一个state对象，和dispatch函数，使用方法和redux差不多
  const [state,dispatch] = useReducer(reducer,initState)  // 第一个参数为reducer纯函数，第二个为初始化的state。

  return (
    <Fragment>
      <p>{state.count}</p>
      {/**父子组件通信时就不在传递一个回调函数，而是直接传递dispatch函数。由子组件触发dispatch函数来使得父组件中的reducer函数*/}
      <Child dispatch={dispatch}/>
    </Fragment>
  )
})