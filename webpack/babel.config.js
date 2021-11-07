
const isProduction = process.env.production //在webpack.config.js设置环境后，可以在配置的js文件中获取到. ⚠️该值时一个string

if(!! isProduction){

}
module.exports = {
  presets:[
    ["@bable/preset-env",{
      // false: 不使用 
      // usage: 源代码中需要使用要的补丁
      // entry: 只要浏览器中没有的都引入,需要手动导入

      // 以下是使用全局引入一些补丁的方法
      useBulidIns: usage,
      corejs: 3      
    }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
  ],
  // 以下是不是全局引入补丁的方式
  plugins: [
    // 还需要安装@babel/runtime-corejs3
    ['@babel/plugin-transform-runtime',{
      corejs: 3
    }],
    ["react-refresh/babel"] //React 组件的热更新
  ],

  // react中使用@babel/preset-react预设即可
}