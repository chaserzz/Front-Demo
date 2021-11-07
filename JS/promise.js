// 实现一个最为简陋的promise
// promise的构造函数
function myPromise(execute){
  this.value = null; // 存放resolve的结果
  this.reason = null; // 存放rejecte的原因
  this.status = "pendding"; // 当前promise的状态

  this.onResolvedQueue = []  //resolved队列
  this.onRejectedQueue = [] // rejected队列

  const self = this

  function resolve(value) {
    self.value = value;
    self.status = "resolved";
    self.onResolvedQueue.forEach(res => res(self.value))
  }

  function reject(reason) {
    self.reason = reason;
    self.status = "rejected"
    self.onRejectedQueue.forEach(rej => rej(self.reason))
  }

  execute(resolve,reject)
}

// 决议函数
// 1.promise与x是同一个对象，需要抛出一个error
// 2.实现如果上一个promise的返回值x为一个对象或者function时，判断是否是一个thenable对象
// 3.如果是一个thenable对象则目前的promise的resolve要继承x执行后resolve对象
// 4.如果不是泽直接以x作为resolve的value
// 5.其中如果出现了error，或者最后thanble最后是一个失败的thenable对象，则需要进行reject
function resolutionProcedure(promise,x,resolve,reject){
  let hasCall = false;

  if(promise === x){
    return reject("type error");
  }

  if( x != null && (typeof x === "function" || typeof x === "object")){
    try {
      const then = x.then;
      if(typeof then === "function"){
        then.call(x,y => {
          if(hasCall) return; 
          hasCall = true;
          resolutionProcedure(promise,y,resolve,reject)
        },err => {
          if(hasCall) return;
          hasCall = true;
          reject(err);
        })
      }else{
        if(hasCall) return;
        hasCall = true;
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  }else{
    if(hasCall) return;
    hasCall = true;
    resolve(x);
  }
}

// Then 放置到原型链上
myPromise.prototype.then = function(onResolved,onRejected) {
  //  实现promise的穿透
  if(typeof onResolved !== "function"){
    return function (x) {return x}
  }
  if(typeof onRejected !== "function"){
    return function (y) {return y}
  }

  const self = this // 保存执行的promise对象
  let x // 保存值
  // resolve状态下的决议函数
  function onResolvedStatus(resolve,reject){
    // 使用定时器来保证以下的方法在then方法执行之后，目的是模拟一个微任务
    setTimeout(() => {
      try {
        x = onResolved(self.value)  // 获得上一个promise执行onResolved后的结果
        resolutionProcedure(promise2,x,resolve,reject)
      } catch (error) {
          reject(error)
      }
    })
  }

  // reject状态下的决议函数
  function onRejectedStatus(resolve,reject){
    // 使用定时器来保证以下的方法在then方法执行之后，目的是模拟一个微任务
    setTimeout(() => {
      try {
        x = onRejected(self.reason)  // 获得上一个promise执行onResolved后的结果
        resolutionProcedure(promise2,x,resolve,reject)
      } catch (error) {
          reject(error)
      }
    })
  }

  var promise2 = new myPromise((resolve,reject) => {
    if(self.status === "resolved"){
      onResolvedStatus(resolve,reject)
    }else if(self.status === "rejected" ){
      onRejectedStatus(resolve,reject)
    }else{
      self.onRejectedQueue.push(function (){
        onRejectedStatus(resolve,reject)
      })
      self.onResolvedQueue.push(function () {
        onResolvedStatus(resolve,reject)
      })
    }
  })

  return promise2
}

const cutePromise = new myPromise(function (resolve, reject) {
  resolve('成了！');
});
cutePromise.then((value) => {
  console.log(value)
  console.log('我是第 1 个任务')
  return '第 1 个任务的结果'
},err => console.log(err)).then(value => {
  // 此处 value 期望输出 '第 1 个任务的结果'
  console.log('第二个任务尝试拿到第 1 个任务的结果是：',value)
},err => console.log(err));
