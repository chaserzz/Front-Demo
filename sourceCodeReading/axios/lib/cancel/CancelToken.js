'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  // executor不是一个函数则退出
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }
  // 保存promise的resolve方法
  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  // 保存this
  var token = this;

  // eslint-disable-next-line func-names
  // promise执行之后清空当前的this对象的_listeners方法
  // 入参为resolve()
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      // 调用subscribe方法
      token.subscribe(resolve);
      _resolve = resolve; //保存resolve函数到_resolve中去
    }).then(onfulfilled);

    // promise 增加cancel方法，调用unsubscribe
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };
  // 执行executor，入参为cancel的一个function
  executor(function cancel(message) {
    // 当前的cancel对象存在reason，则返回
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    // 以新的message作为this.promise的返回值
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
// 如果有原因则直接抛出原因的错误
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */
// 订阅cancel事件
CancelToken.prototype.subscribe = function subscribe(listener) {
  // 在调用时已经完成cancel
  // 则直接使用reason作为返回值发布对应的事件
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */
// 取消订阅事件
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel; // 将取消的cancel方法返回出去
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token, // 实例对象，用于挂载在config上,有一个promise对象
    cancel: cancel // 取消发送请求的方法,会将promise的状态进行改变从而调用订阅发布的事件
  };
};

module.exports = CancelToken;
