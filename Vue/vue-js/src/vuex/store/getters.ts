import { RootState } from "./rootTypes"

export default{
  getCount(state: RootState){
    return state.count
  }
}