const webpack = require('./webpack.js');
const cliOption = require('../example/webpack.config.js');
// 执行webpack获得一个complier对象
const complier = webpack(cliOption);
// 执行complier的run方法,并传入回调函数
complier.run(() => {
  
});