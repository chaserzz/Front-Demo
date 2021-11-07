export default class eventBus {
  constructor(){
    this.cache = {}  //创建一个对象用来保存
  }

  //创建on方法
  on(name,fn){
    //判断当前监听的事件名称是否已经存在
    if(this.cache[name]){
      this.cache[name].push(fn)
    }else{
      this.cache[name] = []
      this.cache[name].push(fn)
    }
  }
  
  //创建off方法
  off(name,fn){
    let tasks = this.cache[name]
    //是否存在该名称的事件
    if(tasks){
      let index = this.cache[name].findIndex(item => item === fn || item.callback === fn)  //item.callback === fn ?
      if(index >= 0){
        //找到对应的函数并消除
        this.cache[name].splice(index,1)
      }
    }
  }
  
  //创建emit方法
  emit(name,once = false, ...args){
    let tasks = this.cache[name]
    if(tasks){
      for(let fn of tasks){
        fn(...args)
      }
      //仅仅发送一次函数
      if(once){
       this.cache[name] = null
      }
    }
  }
}

// const eventbus = new eventBus()
// const test = function (name){
//   console.log(`函数test触发:name=${name}`);
// }
// eventbus.on("test",test)
// //触发eventBus函数
// eventbus.emit("test",false,"trytrytry")
// eventbus.off("test",test)