import { memo } from "react"
import { connect } from "react-redux"
import { asyncChangeMessage } from "./store/actionCreator"

import { Button } from "antd"

const mapStateToProps = (state)=>{
  return {
    message: state.reduxSagaDemo.message
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getMessage(){
      dispatch(asyncChangeMessage())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)( memo(function SagaDemo (props){
  //从props中解析出dispatch和state的数据
  let { message, getMessage } = props
  //Btn点击事件
  function handleBtnClick(){
    getMessage()
  }

  function showMsg(){
    if(message !== ""){
      return <p style={{textAlign: "center",}}>{message}</p>
    }
  }

  return (
    <div>
    <Button type="primary" onClick={handleBtnClick}>通过Saga获取数据</Button>
    {
      showMsg()
    }
   </div>
  )
}))
