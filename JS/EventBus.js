var Event = (function (){
  var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      _default = 'default',
      find,
      // each 遍历数组
      each = function (arr,fn){
        var ret
        for(var i = 0, l = arr.length; i < l; i++){
          var n = arr[i];
          ret = fn.call(n,i,n);
        };
        return ret;
      };
      // 封装增加监听函数
      _listen = function(key,fn,cache){
        if(!cache[key]){
          cache[key] = []
        }
        cache[key].push(fn);
      };
      // 封装移除监听函数
      _remove = function(key,cache,fn){
        if(cache[key]){
          if(fn){
            for(var i = cache[key].length; i >= 0; i--){
              if(cache[key][i] === fn){
                cache[key].splice(i,1);
                i--;
              }
            }
          }else{
            cache[key] = []
          };
        }
      };
      // 封装触发函数
      _trigger = function(){
        var cache = _shift.call(arguments), // 获得第一个参数为缓存
            key = _shift.call(arguments) // 第二个参数为对应的监听事件的key
            args = arguments, // 剩余参数
            _self = this, // 保存当前调用的this
            ret,
            stack = cache[key];
        // 当对应的listen为空或者没有监听事件时结束
        if(!stack || !stack.length){
          return;
        }
        return each(stack, function (){
          console.log('this',this);
          return this.apply(_self,args);
        })
      }
      _create = function(namespace){
        var namespace = namespace || _default; // 命名空间，防止事件名称重复导致的无法使用
        var cache = {},
            offlineStack = [], // 离线事件,即未发布就已经订阅的事件
            ret = {
              // 监听函数
              listen: function(key,fn,last){
                _listen(key,fn,cache);
                if(offlineStack === null){
                  return;
                }
                if(last === 'last'){
                  // 只触发一个离线事件
                  offlineStack.length && offlineStack.pop()();
                }else{
                  // 触发所有
                  each(offlineStack, function(){
                    // this?
                    this();
                  });
                }
              },
              remove: function(key,fn){
                _remove(key,cache,fn);
              },
              trigger: function(){
                var fn,
                    args,
                    _self = this,
                    args = _unshift.call(arguments,cache), //将cache作为第一个参数作为新的arguments
                    fn = function (){
                      return _trigger.apply(_self,args);
                    };
                    if(offlineStack){
                      return offlineStack.push(fn);
                    }
                    return fn();
              }
            }
            return namespace ? (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
      };

  return {
    create: _create,
    remove: function(key,fn){
      var event = this.create();
      event.remove(key,fn)
    },
    listen: function(key,fn,last){
      var event = this.create();
      event.listen(key,fn,last);
    },
    trigger: function(){
      var event = this.create();
      event.trigger.apply(this,arguments);
    }
  };
}());