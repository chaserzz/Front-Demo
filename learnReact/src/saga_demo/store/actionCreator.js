import * as actionTypes from "./constants"

export const changeMessage = (data) =>{
  return {
    type: actionTypes.GET_MESSAGE,
    data
  }
}  

export const asyncChangeMessage = () =>{
  return {
    type: actionTypes.ASYNC_GET_MESSAGE
  }
}