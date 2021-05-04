// 函数防抖 搜索框时使用
function debonce(fn,delay){
  let timer = null
  return function (){
    const args = Array.prototype.slice(arguments)  //获得参数
    let context = this
    if(timer){
      clearTimeout(timer)
    }else{
      timer = setTimeout(function (){
        fn.apply(context,args)  
      },delay)
    }
  }
}

//函数节流  鼠标事件时可用
function throttle(fn,delay){
  const timer = null
  return function (){
    let args = Array.prototype.slice(arguments)
    let context = this
    if(timer){
      return 
    }
    timer = setTimeout(function (){
      fn.apply(context,args)
    },delay)
  }
}

export {
  debonce,
  throttle
}