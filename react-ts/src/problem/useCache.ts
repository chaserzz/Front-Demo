// 这是一个自定义hook，用于实现多个相同的网络请求中，如果有一个网络请求已经被返回，
// 则不再进行剩余的网络请求的发送，否则需要进行多次网络请求的发送
// 请求需要按顺序进行发送

const cache:any = {}
// cache作为缓存，symbol作为标识
function useCache(fetchFunc : any,symbol: string | number){
  return (params: any) => {
    return new Promise((resolve,reject) => {
      let cacheConfig: any = cache[symbol]
      if(! cacheConfig){
        cacheConfig = {
          res: null,
          exectors: [{resolve,reject}]
        };
        cache[symbol] = cacheConfig;
      }else{
        // 可以从缓存中找到值
        if(cacheConfig.res){
          resolve(cacheConfig.res);
        }
        // 不能则需要将resovle和reject推入到exectors中
        cacheConfig.exectors.push({resolve,reject});
      }
      const {exectors} = cacheConfig;
      // 当只有一个请求在进行发送时
      if(exectors.length === 1){  
        const next = async () => {
          try {
            if(!exectors.length) return 
            // 当本次请求发送成功时
            const response = await fetchFunc(params);
            while(exectors.length){
              console.log('response',response)
              exectors.shift().resolve(response) //将当前的返回值放到每一个在exectors中等待返回到promise的reslove中
            }
            cacheConfig.res = response;
          } catch (error) {
            //本次请求发送失败,关闭本次promise
            exectors.shift().reject(error);
            next();
          }
        }
        next();
      }
    })
  }
}
export default useCache