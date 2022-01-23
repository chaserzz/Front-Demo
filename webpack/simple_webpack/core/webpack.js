const Complier = require("./complier");

// 合并option并且返回一个complier对象
function webpack(cliOptions){
  // 合并由webpack,config.js中的option以及在shell中输入的option
  const options = _mergeOption(cliOptions);
  const complier = new Complier(options);
  // 开始挂载插件
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
    return shellOptions
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
        throw new Error(`${plugin} need a function named apply`)
      }
      plugin.apply(complier)
    })
  }
}
module.exports = webpack