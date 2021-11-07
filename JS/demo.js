

function myPromise(execute){
  this.value = null // 存放resolve的结果
  this.reason = null // 存放rejecte的原因
  this.status = "pendding" // 当前promise的状态

  function resolve(value){
    this.value = value
    this.status = "resolved"
  }

  execute(resolve,reject)
}