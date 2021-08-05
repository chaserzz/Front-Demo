import {memo} from "react"
import { Button } from "antd"

export default memo(function Child(props){
  const { dispatch } = props
  return(
    <div>
      <Button onClick={() => dispatch({type:"add"})}>+</Button>
      <Button onClick={() => dispatch({type:"sub"})}>-</Button>
    </div>
  )
})