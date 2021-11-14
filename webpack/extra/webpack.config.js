const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
  entry: path.resolve(__dirname, './src/main.js'),
  output:{
    path: path.resolve(__dirname, './build'),
    filename: "bound.js"
  },
  plugins:[
    new HtmlWebpackPlugin()
  ]
}