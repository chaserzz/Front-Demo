import { ADD_COUNT, SUB_COUNT } from "./mutations_type"

export default {
  add_count (context,payload){
    return new Promise((res,rej) => {
      context.commit(ADD_COUNT,payload)
      res("count加一成功")
    })
  },
  sub_count(context,payload){
    return new Promise((res,rej) => {
      context.commit(SUB_COUNT,payload)
      res("count减一成功")
    })
  }
}