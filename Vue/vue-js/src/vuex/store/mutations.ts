import { ADD_COUNT, SUB_COUNT }  from "./mutations_type"

export default {
  [ADD_COUNT](state, payload){
    state.count ++
  },
  [SUB_COUNT](state, payload){
    state.count --
  }
}