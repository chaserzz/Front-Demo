const path = require("path");
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//Vue的配置选项
const vueLoadOption = {
  loaders:{
    less: [{
      loader: path.resolve(__dirname,"../node_modules/extract-text-webpack-plugin/loader.js"),
      options:{
        omit: 1,
        remover: true
      }
    },{
      loader: 'vue-style-loader' 
    },
    {
      loader: 'css-loader',
      options:{
        minimize: true
      }
    },
    {
      loader: 'less-loader',
    }]
  }
}

module.exports = function getConfig(){
  const option = {
    //入口文件
    entry: path.resolve(__dirname,"../src/main.js"),
    //出口配置
    output:{
      path: path.resolve(__dirname,"../dist"),
      filename: "script[name].js"
    },
    //解析文件
    module:{
      //规则
      rules:[
        {
          test:/.vue$/,
          loader: 'vue-loader',
          options: vueLoadOption
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
            test: /\.(swf)$/,
            loader: `url-loader?limit=10000&name=/script/[name].[ext]`
        }, {
            test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
            loader: `url-loader?limit=10000&name=/images/[name].[ext]`
        }, {
            test: /\.less/,
            use: [{
                loader: 'less-loader'
            }]
        }, {
            test: /\.css/,
            loader: 'style-loader!css-loader'
        }
      ]
    }, 
    //插件
    plugins:[ 
      new ExtractTextPlugin('css/[name].css'), 
      new webpack.optimize.CommonsChunkPlugin({
       name: ['vendors'] 
    })]
  }

  return option
}