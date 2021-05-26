import Vuex from "vuex"
import { RootState } from "./rootTypes"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

const state: RootState = {
  count: 0
}

export default new Vuex.Store({
  state,
  mutations,  //同步触发
  actions,  //异步触发，主要用于需要和后台进行交互时使用
  getters
})