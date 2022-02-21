const Complier = require("./complier");

// 合并option并且返回一个complier对象
function webpack(cliOptions){
  // 合并由webpack,config.js中的option以及在shell中输入的option
  const options = _mergeOption(cliOptions);
  const complier = new Complier(options);
  // 将对应的插件的调用挂载到complier的生命周期中
  // 具体为使用订阅-发布的形式，通过tapA
  _loadPlugin(options.plugins,complier);
  return complier;
}

// 合并option
function _mergeOption(options){
  //根据用户的输入的内容获得对应的option
  const shellOptions = process.argv.slice(2).reduce((shellOptions, option) => {
    const [key, value] = option.split('=');
    if(key && value){
      shellOptions[key.slice(2)] = value;
    }
    return shellOptions;
  },{});
  return {
    ...options,
    ...shellOptions
  }
}

// 挂载插件到对应的hooks上
function _loadPlugin(plugins,complier){
  if(plugins && Array.isArray(plugins)){
    plugins.forEach(plugin => {
      // plugin需要实现apply方法
      if(!plugin.apply){
        throw new Error(`${plugin} need a function named apply`);
      }
      plugin.apply(complier);
    })
  }
}
module.exports = webpack