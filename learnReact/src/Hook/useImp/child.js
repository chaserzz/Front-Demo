import {Fragment, useRef, useImperativeHandle, forwardRef} from "react"

export default forwardRef(function Child (props,ref){
  const input = useRef(null)
   // 作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
  // 参数1: 父组件传递的ref属性
  // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
  useImperativeHandle(ref,()=>({
    focus: () =>{
      input.current.focus()
    }
  }))

  return (
    <Fragment>
      <input type="text" ref={input} />
    </Fragment>
  )
})