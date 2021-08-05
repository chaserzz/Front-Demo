import { memo , useContext } from "react"
import MyContext from "./MyContext.js"

export default memo(function Child(){
  const ctx = useContext(MyContext)  //获得ctx提供的value对象，本案例中为count
  return (<div>
    <p>我是子组件</p>
    {ctx}  {/**显示count*/}
  </div>)
})