import {Fragment, memo, useRef} from "react"

import {Button} from "antd"

import Child from "./child"
export default memo(function UseImp(){
  const child = useRef(null)

  function handleBtnClick(){
    console.log(child)  //只暴露一个focus属性
    child.current.focus()
  }

  return (
    <Fragment>
      <div>
      <Child ref={child} />
      <div style={{padding: "20px 0"}}>
        <Button onClick={handleBtnClick}>点击聚焦到input</Button>
      </div>
      </div>
    </Fragment>
  )
})