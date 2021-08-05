import React from "react"
import { Redirect } from "react-router-dom"

import ToDoList from "../toDoList"
import ReduxDemo from "../redux_demo"  //使用connet的reduxDemo
import ReduxThunk from "../thunk_demo"//redux-thunk的Demo
import ReduxSaga from "../saga_demo"  //使用redux-saga的Demo
import Drag from "../drag"  //拖拽的Demo
import Hook from "../Hook" //Hook的Demo
import UseEffect from "../Hook/useEffect"  
import UseContext from "../Hook/useContext"
import UseReducer from "../Hook/useReducer"
import UseCallback from "../Hook/useCallback"
import UseMemo from "../Hook/useMemo"
import UseRef from "../Hook/useRef"
import UseImp from "../Hook/useImp"
const routes = [
  {
    path:'/',
    exact:true,
    render: () => (
      <Redirect to="/toDoList" />
    )
  },
  {
    path: '/toDoList',
    exact: true,
    component: ToDoList
  },
  {
    path: '/redux',
    exact: true,
    component: ReduxDemo
  },
  {
    path: '/reduxThunkDemo',
    exact: true,
    component: ReduxThunk
  },
  {
    path: '/reduxSaga',
    exact: true,
    component: ReduxSaga
  },
  {
    path: '/drag',
    exact: true,
    component: Drag
  },
  {
    path: '/hook',
    component: Hook,
    routes:[
      {
        path: '/hook/useEffect',
        component: UseEffect
      },
      {
        path:"/hook/useContext",
        component: UseContext
      },
      {
        path: "/hook/useReducer",
        component: UseReducer
      },
      {
        path: '/hook/useCallback',
        component: UseCallback
      },
      {
        path:"/hook/useMemo",
        component: UseMemo
      },
      {
        path:'/hook/useRef',
        component: UseRef
      },
      {
        path: '/hook/useImp',
        component: UseImp
      }
    ]
  }
]

export default routes