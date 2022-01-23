const fs = require('fs');
function runLoaders(options,callback){
  // 首先需要处理路径
  // 如果是一个相对路径则需要将其转化为绝对路径
  const resource = options.resource || '';
  let loaders = options.loaders || [];
  // loader执行上下文对象 每个loader中的this就会指向这个loaderContext
  const loaderContext = options.context || {};
  // 读取资源内容的方法
  const readResource = options.readResource || fs.readFile.bind(fs);
  // 将loader转化为loader对象  
  loaders = loaders.map(createLoaderObject);
  // 处理loader上下文
  loaderContext.resourcePath = resource; // 资源路径绝对地址 
  loaderContext.readResource = readResource;
  loaderContext.loaderIndex = 0; //当前执行的loader的下标
  loaderContext.data = null
  loaderContext.loaders = loaders;
  // 标志异步loader的对象属性
  loaderContext.async = null;
  loaderContext.callback = null;
  // request 保存所有loader路径和资源路径
  // 这里我们将它全部转化为inline-loader的形式(字符串拼接的"!"分割的形式)
  // 注意同时在结尾拼接了资源路径哦～
  Object.defineProperty(loaderContext,'request',{
    enumerable: true,
    get(){
      return  loaderContext.loaders.map(l => l.request).concat(loaderContext.resourcePath).join('!');
    }
  });
  // 保存剩下的请求 不包含自身(以LoaderIndex分界) 包含资源路径
  Object.defineProperty(loaderContext,'remainingRequest',{
    enumerable: true,
    get(){
      return  loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(l => l.request)
        .concat(loaderContext.resourcePath).join('!');
    }
  });
  // 保存剩下的请求，包含自身也包含资源路径
  Object.defineProperty(loaderContext,'currentRequest',{
    enumerable: true,
    get(){
      return  loaderContext.loaders.slice(loaderContext.loaderIndex).map(l => l.request)
        .concat(loaderContext.resourcePath).join('!');
    }
  });
  // 已经处理过的loader请求 不包含自身 不包含资源路径
  Object.defineProperty(loaderContext,'previousRequest',{
    enumerable: true,
    get(){
      return  loaderContext.loaders.slice(0,loaderContext.loaderIndex).map(l => l.request).join('!');
    }
  });
  /** 通过代理保存pitch存储的值 pitch方法中的第三个参数可以修改 
      通过normal中的this.data可以获得对应loader的pitch方法操作的data **/
  // 通过存储到对应下标的loader对象中的data中，获取时通过对应的index来获取对应的data
  Object.defineProperty(loaderContext,'data',{
    enumerable: true,
    set(){
      return loaderContext.loaders[loaderContext.loaderIndex].data;
    }
  });
  // 用来存储读取资源文件的二进制内容 (转化前的原始文件内容)
  const processOptions = {
    resourceBuffer: null,
  };
  iteratePitchingLoaders(processOptions,loaderContext,(err,result) => {
    callback(err,{
      result,
      resourceBuffer: processOptions.resourceBuffer,
    });
  })
}

// 根据loaders路径数组创建loaders对象
function createLoaderObject(loader){
  const obj = {
    normal: null, // loader normal 函数本身
    pitch: null, // loader pitch 函数
    raw: null, // 表示normal loader处理文件内容时 是否需要将内容转为buffer对象
    // pitch阶段通过给data赋值 normal阶段通过this.data取值 用来保存传递的data
    data: null,
    pitchExecuted: false, // 标记这个loader的pitch函数时候已经执行过
    normalExecuted: false, // 表示这个loader的normal阶段是否已经执行过
    request: loader, // 保存当前loader资源绝对路径
  };
  const normalLoader = require(loader); //获取loader对象
  obj.normal = normalLoader; //赋值loader
  obj.pitch = normalLoader.pitch; // 赋值loader中的patich
  obj.raw = normalLoader.raw; // 赋值loader中的raw true转化为Buffer
  return obj;
}

// 根据post,inline,normal,pre的方式顺序读取pitch并执行
function iteratePitchingLoaders(options,loaderContext,callback){
  // 当前loader的下标要大于等于loaders的长度时说明当前的loader的pitch阶段已经执行完毕，开始读取文件
  if(loaderContext.loaderIndex >= loaderContext.loaders.length - 1){
    return processResource(options,loaderContext,callback);
  }
  const currentLoader = loaderContext.loaders[loaderContext.loaderIndex]; //获取当前的loader;
  if(currentLoader.pitchExecuted === true){
    //该loader的pitch阶段已经执行过，则进行下一个loader的pitch阶段
    loaderContext.loaderIndex++;
    return iteratePitchingLoaders(options,loaderContext,callback);
  }
  currentLoader.pitchExecuted = true; // 需要在该loader是否定义过pitch的判断之前进行赋值
  if(!currentLoader.pitch){
     // 该loader未定义pitch阶段，则进行下一个loader的pitch阶段
     // ?? 是否在这边将loaderindex+1会更好
     return iteratePitchingLoaders(options,loaderContext,callback);
  }
  const currentLoaderPitchFunc = currentLoader.pitch;
  // 存在pitch阶段 并且当前pitch loader也未执行过 调用loader的pitch函数
  runSyncOrAsync(currentLoaderPitchFunc,loaderContext,[
    loaderContext.remainingRequest,
    loaderContext.previousRequest,
    loaderContext.data,
  ],(err,...args) => {
    if(err){
      return callback(err)
    }
    // 根据返回值 判断是否需要熔断 or 继续往下执行下一个pitch
    // pitch函数存在返回值 -> 进行熔断 掉头执行normal-loader
    // pitch函数不存在返回值 -> 继续迭代下一个 iteratePitchLoader
    const hasResult = args.some(arg => arg !== undefined);
    if(hasResult){
      loaderContext.loaderIndex--;
      iterateNormalLoaders(options,loaderContext,args,callback);
    }else{
      loaderContext.loaderContext++;
      iteratePitchingLoaders(options,loaderContext,callback);
    }
  })
}

//  执行loader - normal和pitch阶段都会调用
function runSyncOrAsync(fn,context,args,callback){
  let isSync = true; // 默认本次调用是一次同步的loader的调用
  let isDone = false; // 本次调用是否已经结束
  //定义异步调用的回调函数
  const innerCallBack = context.callback = function (){
    isDone = true;
    isSync = false;
    //调用回调函数的时候已经不再走之后的代码逻辑
    callback(null,...arguments);
  }
  // 将innercallback返回拱loader进行调用
  context.async = function (){
    isSync = false;
    return innerCallBack;
  }
  const result = fn.apply(context,args);
  if(isSync){
    isDone = true;
    // 如果是normal阶段的调用时，为undefined的时候调用的是最外部传入的callback
    // 如果时pitch阶段调用的话，则是自定义的callback
    if(result === undefined){
      return callback();
    }else{
      // 如果返回值是一个Promise对象
      if( result &&
         typeof result === 'object' && 
         typeof result.then === 'function'){
          // 同样等待Promise结束后直接熔断 否则Reject 直接callback错误
          return result.then(r => callback(null,r),callback);
      }else{
        // pitch阶段有loader返回了结果
        // 则需要进行熔断
        return callback(null, result);
      }
    }
  }
}

// 读取源文件
function processResource(options,loaderContext,callback){
  // 处理loader的下标
  loaderContext.loaderIndex = loaderContext.loaders.length - 1;
  // 开始读取文件的信息
  loaderContext.readResource(loaderContext.resourcePath,(err,buffer) => {
    if(err){
      callback(err);
    }
    options.resourceBuffer = buffer; //存储源文件的buffer
    iterateNormalLoaders(options,loaderContext,[buffer],callback);
  })
}

// 根据pre，normal，inline，post的顺序调用loader函数对文件进行操作
function iterateNormalLoaders(options,loaderContext,args,callback){
  // 当index<0 时说明所有的loader都执行过
  if(loaderContext.loaderIndex < 0){
    return callback(null,args)
  }
  const currentLoader = loaderContext.loaders[loaderContext.loaderIndex];
  // 该loader已经执行过
  if(currentLoader.normalExecuted){
    loaderContext.loaderIndex--;
    return iterateNormalLoaders(options,loaderContext,args,callback);
  };
  currentLoader.normalExecuted = true;
  const normalFunction = currentLoader.normal;
  if(!normalFunction){
    return iterateNormalLoaders(options,loaderContext,args,callback);
  }
   // 根据loader中raw的值 格式化source
   convertArgs(args, currentLoader.raw);
   // 执行loader
  runSyncOrAsync(normalFunction, loaderContext, args, (err, ...args) => {
    if (err) {
      return callback(err);
    }
    // 继续迭代 注意这里的args是处理过后的args
    iterateNormalLoaders(options, loaderContext, args, callback);
  });
}

// 转化资源source的格式
function convertArgs(args,raw){
  // 不需要buffer格式
  if(!raw && Buffer.isBuffer(args[0])){
    args[0] = args[0].toString();
  }else if(raw && typeof args === 'string'){
    args[0] = Buffer.from(args[0], 'utf8');
  }
}

module.exports = runLoaders;