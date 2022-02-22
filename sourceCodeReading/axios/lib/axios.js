'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

// 创建axios实例
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig); // 根据配置创建axios实例
  var instance = bind(Axios.prototype.request, context); // 将request函数的this执行修改

  // Copy axios.prototype to instance
  // 将axios原型上的属性绑定到instance上，并且将context作为this到指向
  utils.extend(instance, Axios.prototype, context);

  // 将context上的属性加到instance上
  utils.extend(instance, context);

  // create作为instance的工厂函数
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// 创建一个默认的axios对象
var axios = createInstance(defaults);

// 继承axios类
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel'); //默认axios对象设置cancel函数，用于设置message对象，并添加__cancel__属性
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel'); // 判断cancel属性是否存在且为true
axios.VERSION = require('./env/data').version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
