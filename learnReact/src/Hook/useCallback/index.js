import { Button } from "antd"
import { memo, useCallback, useState ,useEffect} from "react"

import Child from "./Child"
export default memo(function UseCallback(){
  let [count,setCount] = useState(0)
  let [title,setTitle] = useState("我是子组件")

  //btn点击事件，不经过callback包装
  function handleBtnClick(){
    setCount(++count)
  }
  
  //利用useEffect来判别handlebtnClick是否发生变化
  useEffect(()=>{
    console.log("父组件重新渲染")
  },)

  //btn点击事件，将会经过callback之后返回一个memorize的函数，即回调函数仅在某个依赖项改变时才会更新,第二个参数为依赖项
  //可以用来避免非必要的渲染
  const memorizeBtnClick = useCallback(()=>{
    console.log("触发了callback")
    /** 进行一些操作，有点类似于Vue中的nextTick */
  },[title])

  return (
    <div>
      <p>{count}</p>
      <p><span>没有经过callback包装的函数</span><Button onClick={handleBtnClick}>+</Button></p>
      <p><span>经过useCallback包装过的函数</span><Button onClick={memorizeBtnClick}>+</Button></p>
      <Child title={title} setTitle={setTitle} />
    </div>
  )
})