const PENDING = 'PENDING';
const Fulfilled = 'Fulfilled';
const Rejected = 'Rejected';
// promise 实现，根据promiseA+标准实现的一个promise
// fn 为传入的函数
function myPromise(fn){
  this.state = PENDING; // 保存当前的promise的状态
  this.value = null; // 保存当前的promise的返回值
  this.resolvedCallbacks = []; //保存当前promise在成功后的回调函数, 此为微任务队列
  this.rejectedCallbacks = []; //保存当前promise在失败后的回调函数, 此为微任务队列
  const that = this; // 保存当前promise的引用
  
  // resolve 函数
  // 修改当前的状态，并且将成功后的回调函数进行依次调用
  function resolve(value){
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if(value === that){
      reject(new Error('TypeError') )
    }
    // 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    // 如果 x 处于执行态，用相同的值执行 promise
    // 如果 x 处于拒绝态，用相同的据因拒绝 promise
    if(value instanceof myPromise){
      return value.then(resolve,reject);
      // 以上代码在执行之后可以利用then形成一个promise链条,从而形成上述的继承promise的状态以及value的效果
    }
    // 使用setTimeout来模拟微任务的实现
    setTimeout(() => {
      if(that.state === PENDING){
        that.state = Fulfilled;
        that.value = value;
        that.resolvedCallbacks.map(cb => cb(that.value));
      }
    },0);
  }

  // reject 函数
  // 修改当前的状态，并且将失败后的回调函数进行依次调用
  function reject(error){
    setTimeout(() => {
      if(that.state === PENDING){
        that.state = Rejected;
        that.value = error;
        that.rejectedCallbacks.map(cb => cb(that.value));
      }
    }, 0);
  }
  // 实现调用函数fn
  try {
    fn(resolve,reject)
  } catch (error) {
    reject(error)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected){
  const that = this; // 保存调用的上下文
  let promise2;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v; // onfulfilled必须是一个函数
  onRejected = typeof onRejected === 'function' ? onRejected : e => {
    throw e
  }; // onreject必须是一个函数
  // 当执行then函数时，promise还没有返回值则将所有的回调函数推入到对应的队列中
  // 否则根据状态的不同，需要将其推入到不同的队列中去 
  if (that.state === PENDING) {
    // 返回一个promise
    return (promise2 = new myPromise((resolve,reject) => {
      that.resolvedCallbacks.push(() => {
        try {
          const x = onFulfilled(that.value); // 调用onfulfilled获取返回值
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.rejectedCallbacks.push(() => {
        try {
          const x = onRejected(that.value); // 调用onReject获取返回值
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    }))
  }
  // Promise为成功状态下调用的函数
  if (that.state === RESOLVED) {
    return (promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(that.value)
          resolutionProcedure(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }))
  }
  // Promise为失败状态下调用的函数
  if (that.state === REJECTED) {
    return (promise2 = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(that.value); // 调用onReject获取返回值
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      })
    }))
  }
}

// 根据promiseA+规范的promise解决方案
function resolutionProcedure(promise2, x, resolve, reject) {
  // Promise解决过程，当返回的promise和x为同一个对象时，抛出错误
  if (promise2 === x) {
    return reject(new TypeError('Error'));
  }
  // x为一个promise，则then函数之后返回的promise要继承x的promise的状态
  if (x instanceof MyPromise) {
    x.then(function(value) {
        resolutionProcedure(promise2, value, resolve, reject)
    }, reject)
  }
  let called = false // reject和resolve方法都只会被采用一次
  //如果 x 为对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then // 保存x的then函数
      if (typeof then === 'function') {
        // 如果then是一个函数，则以x作为上下文,入参为y，进行解决promise，y
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolutionProcedure(promise2, y, resolve, reject)
          },
          e => {
            if (called) return
            called = true
            reject(e)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
} 
