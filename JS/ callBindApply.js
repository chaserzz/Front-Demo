Function.prototype.bind1 = function(){
  const arr = Array.prototype.slice.call(arguments)
  const context = arr.unshift()
  const func = this
  return function(){
    return context.func(arr)
  }
}

