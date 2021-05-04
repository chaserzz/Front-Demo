//函数柯里化。利用闭包和递归实现的
function curry(fn,args){
  const length = fn.length  //保存函数原来需要的参数长度
  const args = args || []  //初始化参数库
  return function (){
    const _args = Array.prototype.slice(arguments)  //获得调用本次函数时的参数列表
    args.push(..._args)  //传入参数
    if(args.length < length){
      //说明参数长度不够
      return curry(fn,args)  //保存参数到参数库，并进行递归操作
    }

    fn.apply(this,args)  //参数长度足够
  }
}

//实现一道经典面试题
//add(1)
//add(1,2)(3)
//add(1)(2)(3)

function add(){
  const args = Array.prototype.slice(arguments)  //保存参数的数组
  
  //创建一个函数来保存输入的参数
  function _add(){
    const _args = Array.prototype.slice(arguments)
    args.push(..._args)
    return _add  //递归调用
  }

  //利用toString方法来实现打印输入结果
  _add.toString = function (){
    return args.reduce((pre,cur) => {
      return pre + cur
    }, 0)
  }

  return _add
}
