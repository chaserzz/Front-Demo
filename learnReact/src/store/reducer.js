import { combineReducers } from "redux"

import { reducer as reduxDemo }  from "../redux_demo/store"
import {reducer as reduxThunkDemo} from "../thunk_demo/store"
import {reducer as reduxSagaDemo} from "../saga_demo/store"
//combineReducers将多个reducer和store进行合并到一个state中进行使用
export default combineReducers({
  reduxDemo,
  reduxThunkDemo,
  reduxSagaDemo
})