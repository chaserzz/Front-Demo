import React, { Fragment, memo, useState } from "react"

import MyContext from "./MyContext.js"

import { Button } from "antd"
import Child from "./Child"

export default memo(function UseContext(props){
  let [count,setCount] = useState(0)
  //点击修改count
  function handleBtnClick(){
    setCount(++count)
  }

  return (
    <Fragment>
      <Button onClick={handleBtnClick}>点我</Button>{count}
      <MyContext.Provider value={count}> {/*将Count最为value提供进去*/ }
        <Child />
      </MyContext.Provider>
    </Fragment>
  )
})