import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import reducer from "./reducer"

import saga from "./saga"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,composeEnhancers(
  applyMiddleware(thunk,sagaMiddleware),
))

sagaMiddleware.run(saga)

export default store