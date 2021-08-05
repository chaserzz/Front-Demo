import * as actionTypes from "./constants"
import getLocalData from "../../network/data" 

/** 同步action */
const changeDataAction = (data) =>{
  return {
    type: actionTypes.GET_MESSAGE2,
    data
  }
}  


/** 异步action */
export const getData = () =>{
  return dispatch => {
    getLocalData.getMessage().then(res => {
      dispatch(changeDataAction(res.data.message))
    })
  }
}

