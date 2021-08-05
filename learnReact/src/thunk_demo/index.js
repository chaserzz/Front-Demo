import { Button } from "antd"
import { memo } from "react"
import { connect } from "react-redux"
import { getData } from "./store/actionCreator"

const mapStateToProps = (state) => {
  return {
    message: state.reduxThunkDemo.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getMessage: ()=>{
      dispatch(getData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(function ReduxThunk(props){
  //从props中解析出dispatch和state的数据
  let { message, getMessage} = props
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
     <Button type="primary" onClick={handleBtnClick}>通过thunk获取数据</Button>
     {
       showMsg()
     }
    </div>
  )
}))