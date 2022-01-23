class PluginA{
  // 每一个webpack的插件都需要实现apply方法
  apply(complier){
    console.log('PluginA apply');
    complier.hooks.run.tap('pluginA', () => {
      console.log('PluginA call');
    })
  }
}

module.exports = PluginA