const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")  //webpack解析Html文件
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "development",  //设置模式
  entry: path.resolve(__dirname,"./src/main.js"),  //设置入口文件
  //打包后的配置
  output:{
    //打包后的位置
    path: path.resolve(__dirname,"./dist"),
    //打包后的文件名
    filename: '[name].[hash:8].js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,"./index.html")
    }),
    new cleanWebpackPlugin()
  ]
}