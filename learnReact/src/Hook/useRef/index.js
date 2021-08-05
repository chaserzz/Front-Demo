import {Fragment, memo, useRef} from "react"

import {Button} from "antd"

export default memo(function UseRef(){
  const input = useRef(null)  //用来获得Dom元素，会将Dom元素加入到current中去
  
  function handleBtnClick(){
    input.current.focus()  //.current来访问Dom元素
  }

  return (
    <Fragment>
      <div>
        <input type="text" ref={input}/>
      </div>
      <div style={{padding: "20px 0"}}>
        <Button onClick={handleBtnClick}>点击聚焦到input</Button>
      </div>
    </Fragment>
  )
})