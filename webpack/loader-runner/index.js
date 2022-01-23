// loader-runner/index.js
// 入口文件
const fs = require('fs');
const path = require('path');
const runLoaders = require('./core/index.js');
// 模块路径
const filePath = path.resolve(__dirname, './title.js');

// 模拟模块内容和.title.js一模一样的内容
const request = 'inline-loader1!inline-loader2!./title.js';

// 模拟webpack配置
const rules = [
  // 普通loader
  {
    test: /\.js$/,
    use: ['normal-loader1', 'normal-loader2'],
  },
  // 前置loader
  {
    test: /\.js$/,
    use: ['pre-loader1', 'pre-loader2'],
    enforce: 'pre',
  },
  // 后置loader
  {
    test: /\.js$/,
    use: ['post-loader1', 'post-loader2'],
    enforce: 'post'
  },
];

// 获得文件路径
const paths = request.replace(/^-?!+/,'').split('!');

// 获得当前的文件的路径
const sourcePath = paths.pop(); 
// 获取inlineLoader
const inlineLoaders = paths;

const normalLoaders = [];
const preLoaders = [];
const postLoaders = [];

rules.forEach(rule => {
  // 匹配上文件路径
  if(rule.test.test(sourcePath)){
    switch(rule.enforce){
      case 'pre': {
        preLoaders.push(...rule.use);
        break;
      }
      case 'post': {
        postLoaders.push(...rule.use);
        break;
      }
      default: {
        normalLoaders.push(...rule.use);
        break;
      }
    }
  }
});

/**
 * 根据inlineLoader的规则过滤需要的loader
 * https://webpack.js.org/concepts/loaders/
 * !: 单个！开头，排除所有normal-loader.
 * !!: 两个!!开头 仅剩余 inline-loader 排除所有(pre,normal,post).
 * -!: -!开头将会禁用所有pre、normal类型的loader，剩余post和inline-loader类型的.
 */
let loaders = [];
// 需要注意执行顺序
if(request.startsWith('-!')){
    loaders.push(...postLoaders,...inlineLoaders);
}else if(request.startsWith('!!')){
  loaders.push(...inlineLoaders);
}else if(request.startsWith('!')){
  loaders.push(...postLoaders,...inlineLoaders,...preLoaders);
}else{
  loaders.push(...[...postLoaders,...normalLoaders,...inlineLoaders,...preLoaders]);
}
// 将loader转化为loader所在文件路径
// webpack下默认是针对于配置中的resolveLoader的路径进行解析 这里为了模拟我们省略了webpack中的路径解析
const resolveLoader = loader => path.resolve(__dirname,'./loader',loader);

// 获得需要处理的loaders路径
loaders = loaders.map(resolveLoader);
runLoaders({
  loaders,// 需要处理的loader数组
  resource: filePath,// 加载的模块路径
  readResource: fs.readFile.bind(fs), // 读取文件的方法
},
(err,result) => {
  console.log(err);
  console.log(result);
});