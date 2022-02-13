class Bigpipe{
  options = null; // 一些控制选项
  queue = null; // 异步队列
  limitLength = 1; // 限制队列中的等待调用的异步函数
  constructor(limitLength,options){
    this.limitLength = limitLength;
    this.options = options;
    this.queue = []
  }
}

Bigpipe.prototype.push = function (method){
  var args = Array.prototype.slice.call(arguments,1);
  const callback = args[args.length - 1];
  if(typeof callback === 'function'){
    throw new Error('callback must be a function');
  }

  if(this.queue.length < 1){
    method.apply(null,args);
    return;
  }

  if(this.queue.length <= this.limitLength){
    this.queue.push({
      method,
      args
    });
  }else{
    throw new Error("队列已经满了");
  }
  if(this.queue.length > 1){
    
  }
}