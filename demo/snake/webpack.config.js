const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",  //打包入口文件
  devtool: 'inline-source-map', // 不同选项适用于不同环境
  //指定打包的配置
  output:{
    //文件目录
    path: path.resolve(__dirname,"dist"),
    filename: "bundle.js",  //文件名称
  },
  //打包时使用的模块
  module:{
    rules: [
      { 
        //指定文件
        test: /\.ts$/,
        use: [
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options:{
              //设置预定义环境
              presets:[
                [
                  //环境插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    targets:{
                      "ie" : "9"
                    },
                    "corejs":"3",
                    //使用core.js的方式
                    "useBuiltIns" : "usage"
                  }
                ]
              ]
            }
          }
        ,'ts-loader'],  //指定解析模块
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        use:[{
         loader:"style-loader" //内部声明的style加载
        },
        {
          loader:"css-loader", //解析css
        },
        {
          loader: "sass-loader"  //将sass/scss转化为css
        },
        ]
      },
      {
        test: /\.css$/,
        use:["style-loader","css-loader"]
      }
    ]
  },

  //webpack插件 
  plugins:[
    new HTMLWebpackPlugin({
      template: "./index.html"
    }),
    new CleanWebpackPlugin(),
  ],
  //设置引用模块
  resolve:{
    extensions: ['.ts','.js']
  },
}