class PluginB{
  // 每一个webpack的插件都需要实现apply方法
  apply(complier){
    console.log('PluginB apply');
    complier.hooks.run.tap('PluginB', () => {
      console.log('PluginB call');
    })
  }
}

module.exports = PluginB