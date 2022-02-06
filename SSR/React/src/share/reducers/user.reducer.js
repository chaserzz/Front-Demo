import { SAVE_USER } from "../actions/user.action";

export default function userReducer (state = [], action) {
  switch (action.type) {
    case SAVE_USER:
      return action.payload
    default:
      return state
  }
}
