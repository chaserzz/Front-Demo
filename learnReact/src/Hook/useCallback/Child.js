import { Button } from "antd";
import { memo, useEffect } from "react"

export default memo(function Child(props){
  let { title, setTitle } = props
  useEffect(()=>{
    console.log("Child重新渲染");
  })
  return(
    <div>
      {title}
      <Button onClick={()=> setTitle("Title变化了" + Math.random())}>改变title</Button>
    </div>
  )
})