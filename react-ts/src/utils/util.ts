//函数节流  鼠标事件时可用
function throttle(fn: any,delay = 300){
  let last = 0 // 保留上次调用函数的时间
  return function (this: any) {
    const context = this//保存当前的this指向
    const args = arguments // 保存函数传入的参数
    const now = + new Date() // 获得当前时间的时间戳
      // 两次调用在间隔时间之外
    if(now - last >= delay){
      last = now // 保留当前的时间戳
      fn.apply(context,args)
    }
  }
}

export {
  throttle
}