import * as actionType from "./constants"

const defaultState = {
  count: 0
}

export default function reducer(state = defaultState, action){
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case actionType.ADD_COUNT:
      newState.count++
      return newState
    case actionType.SUB_COUNT:
      newState.count--
      return newState
    default:
      return state
  }
}