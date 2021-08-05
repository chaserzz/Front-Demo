import { memo, useEffect, useMemo, useState } from "react"

import {Button} from "antd"

export default memo(function UseMemo(){
  /**
   * useMemo和useCallback的区别
   * 
   * useMemo是用来缓存数据的，类似于本组件的state或者props.
   * 一个数据需要通过计算而来，这个计算是依赖与特定的state、props数据，就可以使用该hook
   * useCallback是用来缓存函数的，可以配合React.memo这一API实现子组件的缓存
   */
  let [personalInfo , setPersonalInfo] = useState({
    name: 'kevin',
    gender: 'male'
  })
  //一个格式化gender的函数
  function fomatterGender(gender){
    return gender === "male" ? "男" : "女"
  }

  // 使用memo进行包装
  let gender = useMemo(()=>{
    return fomatterGender(personalInfo.gender)
  }, [personalInfo.gender])  //依赖于personalInfo.gender

  //监视name的修改
  useEffect(()=>{
    console.log("name重新渲染");
  },[personalInfo.name])

  useEffect(()=>{
    console.log("gender重新渲染")
  },[personalInfo.gender])

  return (
    <div>
      <div>
          姓名： {personalInfo.name} -- 性别:  { gender } <br/>
          <Button onClick={ 
            ()=> { 
              setPersonalInfo({
                ...personalInfo,
                name: 'Will Kang'
              }) 
            }  
          }> 点击修改名字</Button>
        </div>
    </div>
  )
})