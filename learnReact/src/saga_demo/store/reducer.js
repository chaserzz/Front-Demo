import * as actionTypes from "./constants"

const defaultState = {
  message: ""
}

export default function reducer( state = defaultState, action){
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case actionTypes.GET_MESSAGE:{
      newState.message = action.data
      return newState
    }
    default:
      return state
  }
}

