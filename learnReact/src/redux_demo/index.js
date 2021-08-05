import {memo} from "react"
import { connect } from "react-redux"
import { addCount, subCount } from "./store/actionCreator"

import { Button } from "antd"
import "./index.scss"
const mapStateToProps = (state) => {
  return {
    count: state.reduxDemo.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleStoreCountAdd(){
      dispatch(addCount())
    },
    handleStoreCountSub(){
      dispatch(subCount())
    }
  }
}
//由memo先返回一个组件，再经过mapStateToProps和mapDispatchToProps将dispatch和state映射到props
//本案例未使用redux提供的hook
export default connect(mapStateToProps,mapDispatchToProps)(memo(function ReduxDemo(props){
  const { count, handleStoreCountAdd, handleStoreCountSub} = props  //解构出state和函数
  
  //进一步封装dispatch,可以添加需要的paylaod
  function addClick(){
    handleStoreCountAdd()
  }
  function subClick(){
    handleStoreCountSub()
  }
  return (
    <div className="reduxConnetDemo">
      <p>{count}</p>
      <Button onClick={addClick}>+</Button>
      <Button onClick={subClick}>-</Button>
    </div>
  )
}))