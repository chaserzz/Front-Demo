import { memo, useState , useEffect} from "react"

import {Button} from "antd"

export default memo(function UseEffect(){
  let [count,setCount] = useState(0)
  let [title,setTitile] = useState("useEffect中使用异步函数")
  function handleAddBtnClick(){
    setCount(++count)
  }

  function handleSubBtnClick(){
    setCount(--count)
  }

  useEffect(()=>{
    console.log("无依赖的useEffect调用"); //相当于componentDidmount
    // 在组件进行加载到Dom时发送异步请求
    const time = setTimeout(()=>{
      setTitile("成功调用")
    },1000)
    return ()=>{
      clearTimeout(time)  //在组件卸载时清楚计时器
      console.log("无依赖的useEffect返回的函数");  //相当于componentWillUnmount
    }
  },[])  

  useEffect(()=>{
    console.log("用useEffect订阅了count发生变化");
  },[count])

  useEffect(()=>{
    console.log("something update");  //相当于componentDidupdate
  })

  return(
    <div style={{textAlign: "center"}}>
      <p>{count}</p>
      <Button onClick={handleAddBtnClick} >+</Button>
      <Button onClick={handleSubBtnClick} >-</Button>
      <p>{title}</p>
    </div>
  )
})