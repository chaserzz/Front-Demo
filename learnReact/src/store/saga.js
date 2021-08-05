import { put/** 可以简单理解为dispatch */, call /** 阻塞函数 */, fork /** 不会阻塞 */ , takeEvery } from "redux-saga/effects"

import { changeMessage } from "../saga_demo/store/actionCreator"
import { ASYNC_GET_MESSAGE } from "../saga_demo/store/constants"
import getLocalData from "../network/data"

const fetchMessageAction = function*() {
  const res = yield call(getLocalData.getMessage)  //通过yield获得返回值
  yield put(changeMessage(res.data.message))  
}

export default function* rootSaga(){
  yield takeEvery(ASYNC_GET_MESSAGE,fetchMessageAction)  //takeEvery将会监听ASYNC_GET_MESSAGEaction的派发，执行fetchMessageAction函数之后，传递新的Action
}