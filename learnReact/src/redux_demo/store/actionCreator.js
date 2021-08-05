import * as actoinType from "./constants.js"

export const addCount = () => {
  return {
    type: actoinType.ADD_COUNT
  }
}

export const subCount = () => {
  return {
    type: actoinType.SUB_COUNT
  }
}