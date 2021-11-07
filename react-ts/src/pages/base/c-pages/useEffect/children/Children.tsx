import React, { memo, useEffect } from 'react'

export default memo(function Children() {
  useEffect(() => {
    console.log("我是子组件挂载后的回调函数");
    return () => {
      console.log("我是子组件销毁后的回调函数");
    }
  },[])
  return (
    <div>
      我是一个子组件
    </div>
  )
})
