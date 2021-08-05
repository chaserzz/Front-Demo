import React, { memo , useState } from "react"

import { Button, Input, List } from "antd"
import "./index.scss"

export default memo(function ToDoList(){
  // 设置state的hook
  const [ inputValue, setInputValue ] = useState("")  //input输入框的value
  const [list,setList] = useState(["Learn English","Coding"])
  //组件中的事件
  //input框输入事件
  function handleInputValueChange(e){
    setInputValue(e.target.value)
  }
  //添加按钮的点击事件
  function handleBtnClick(){
    if(inputValue === ""){
      return 
    }
    let newList = [...list , inputValue]
    setInputValue("")
    setList(newList)
  }
  
  // 获得index的方法一，通过返回一个函数，将index传入。
  // 存在问题，使用了闭包，可能会造成内存的泄漏
  // function handleListItemClick(index){
  //   return function (){
  //     const index = e.target.dataset.index
  //     let newList = [... list]
  //     newList.splice(index,1)
  //     setList(newList)
  //   }
  // }

  // 获得index的方法二，通过data-set的方式
  function handleListItemClick(e){
    const index = e.target.dataset.index
    let newList = [...list]
    newList.splice(index,1)
    setList(newList)
  }

  return (
    <div className="toDoList" >
      <span style={{"marginRight" : "15px"}}>Your Input</span>
      <Input style={{"width": "60%"}} size="middle" value={inputValue} onChange={handleInputValueChange} />
      <Button type="primary" onClick={handleBtnClick} style={{"marginLeft" : "15px"}}> 添加 </Button>
      <p style={{"marginBottom" : "15px"}}>Your List</p>
      <List dataSource={list} 
            bordered
            split={true}
            renderItem={( item, index ) =>{
              return (<List.Item key={item} data-index={index} onClick={ handleListItemClick} >
                        <span>{item}</span>
                      </List.Item>
              )
            }}      
      />
    </div>
  )
})