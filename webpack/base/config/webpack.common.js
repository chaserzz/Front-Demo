const resolveApp = require('./paths');
const {merge} = require("webpack-merge");
const productionConfig = require("./webpack.prod")
const developConfig = require("./webpack.dev")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin") // Css压缩
const commonConfig = {
  devtool: 'source-map', // 设置打包后的格式以及内容 当mode设置为development的时候默认为eval的模式
  // entry Dependence方式进行代码分离
  entry: {
    // 多文件打包配置
    main: {
      import: resolveApp("./src/main.js"),
      dependOn: ["loadsh,dayjs"] //配置依赖，防止相同依赖多次打包
    },
    index: resolveApp("./src/index.js"),
    loadsh: "loadsh",
    dayjs: "dayjs"
  },  //设置入口文件
  //打包后的配置
  output:{
    //打包后的位置
    path: resolveApp("./dist"),
    //打包后的文件名
    filename: 'js/[name].[hash:8].js',
    // assetModule FieldName: "img/[name][hash:6][ext]"  //asset文件全局配置
    publicPath: './', //打包之后的文件进行路径的拼接
    chunkFielname: '[name].[hash:6].chunk.js' //需要设置魔法注释来设置名字： /*webpackChunkName: "xxx"*/
  },
  external:{ //第三方打cdn打包
    "lodash" : "_"// lodash导入的全局对象 ，需要在html模版中配置cdn的地址，具体可以查看index.html文件
  },
  //webpack-dev-server 安装后配置的内容，实际上是一个express
  devServer:{
    hot: true, // 热更新
    publicPath: '', //本地服务的启动地址，相当于配置一个路由
    contentBase: '', //设置开发时静态服务的文件根目录
    watchContentBase: true, //静态文件路径变化时重启服务
    hotOnly: true, //代码出现报错不重新刷新浏览器
    host: "0.0.0.0", // 设置本地地址,0.0.0.0 可以由外部访问到本地的项目
    port: 8080, //端口号
    open: true, //编译成功后自动打开浏览器
    compress: true, //使用gzip文件进行打包压缩　
    proxy:{
      '/api': {
        target: "localhost:8888", //设置域名映射
        pathRewrite :{
          "^/api" : '' //解决由于配置映射出现的请求路径中会多出一个api的请求路径
        },
        secure: false, //在请求https时不进行证书的验证
        changeOrigin: true //在请求数据时修改请求的origin字段为映射的域名
       }, 
    },
    historyApiFallBack: true, //在history路由下，报错后返回index.html页面
    historyApiFallBack: {// 详细配置，from 配置请求地址，用正则进行匹配， to表示返回的地址
      rewrites:[
        {
        from :/.\/zard/,
        to :"index.html"
        },
      ]
    }, 
  },
  resolve: { //文件解析配置
    extensions: ['.wasm','js','ts','tsx','jsx','vue'], //当加载的文件没有添加文件类型时按顺序进行添加并查找 
    alias: {
      "@": path.resolve(__dirname,'./src') 
    }
  },
  optimization:{ // 优化配置
    minimize: true, //设置为true之后才会使用下面的插件对代码进行操作
    // 压缩代码
    minimizer: [
      new TerserPlugin({ //丑化代码
        extractComments: false, // 代码注释单独抽取一个文件出来
        parallel: true, // 是否使用多核cpu进行编译
        terserOptions: { // 对terser的编译options进行传递，具体查看terser的github
          mangle: true
        }
      })
    ],
    // 代码分离配置，与entry分离的结果类似。 使用的splitchunkplugin插件
    splitChunks:{
      chunks: "async",  //async: 异步代码进行分离 比如(import动态函数) initial(同步导入分离，比如import)  all(无论同步异步都分离代码)
      minChunks: 1, //至少被导入了几次后进行分离拆包
      maxSize: 20000, // 将大于maxSize的包在再次进行拆分
      minSize: 20000, // 拆分出包代码的最小值(字节)
      chunkIds: "natural", // 下方打包的id的数值  natural(按自然数排序) name(与文件名相关) determinstic (随机数 )
      cacheGroups:{
        // key-value设置，key可以是随意的值，value有以下几个设置
        vendor:{
           test: /[\\/]node_moudles[\\/]/,
           filename: "[id]_vendor.js",
           priority: -10,
           chunks: "initial",
           maxSize: 2000,
           minSize: 2000
        },
        default:{
          minChunks: 2,
          filename: "common_[id].js"
        }
      },
    },
    // true/multiple 异步加载的文件进行多包分制
    // single 一个文件打包
    runtimeChunk: 'true'
  },
  module:{
    rules:[
      {
        // 规则使用正则表达式
        test: /.\/css$/,
        use: [
          // style-loader 将css加到style标签中
          "style-loader",
          // css-loader解析css文件
          {
            loader: "css-loader",
            // options中的值将会被传入到对应的loader当中去 
            options: {
              importLoaders: 1
            }
          },
          // 可以使用以下的方式配置postcss-loader
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     // postcss-Options
          //     postcssOptions: {
          //       plugins: [
          //         // 自动添加浏览器前缀
          //         // require("postcss-preset-env")({}) 可是使用required的方式使得能够添加更多的一些参数
          //         "postcss-preset-env"  //处理前缀以及一些属性的适配
          //       ]
          //     }
          //   }
          // }
          
          // 由于需要使用postcss-loader的地方比较多，所以单拉出去作为一个配置文件
          "postcss-loader"
        ]
        // 以下是以上方式的简写
        // use:["style-loader","css-loader"]
      },
      {
        test: /\/.less$/,
        use: ["style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 2 // 使用import导入到文件是否需要再次通过前面配置到loader的个数
          }
        },"postcss-loader","less-loader"]
      },
      // url-loader实现文件打包
      // {
      //   test: /\/.(jpg|png|jpeg|gif|svg)$/,
      //   use: [
      //    {
      //      loader:  "url-loader",
      //      options: {
      //        name: "img/[name].[hash:6].ext",  // name: 文件名，hash 哈希值，ext 保留文件名
      //        limit: 100 * 1024 //  limit 设置当字节大于100kb时使用文件，否则使用url-loader解析成一个base64字节 性能优化
      //      }
      //    }
      //   ]
      // }

      // webpack5以上的版本可以直接使用asset内置模块进行
      // {
      //   test: /\/.(jpg|png|jpeg|gif|svg)$/,
      //   // type: "asset/resource",  // 效果和使用fiel-loader相同，可以使用generator中的filename设置文件路径，或者使用assetmodulefilename设置全局的
      //   // type: "asset/inline",  // 效果和使用url-loader相同, 使用后无法使用generator等属性，因为该类型会将所有的图片都设置为base64
      //   type: 'asset', // 兼容模式，具有generator和praser的属性，在paser的dataurlcondition中的maxsize来设置对应的转化成base64格式的图片等最大值
      //   generator: {
      //     filename: "img/[name].[hash:6]ext"
      //   },
      //   praser: {
      //     dataUrlCondition: {
      //       maxSize: 100 * 1024
      //     }
      //   }
      // },
      {
        test: /\/.ttf|eot|woff?2$/i,
        type: "asset/resource",
        generator:{
          filename: "font/[name].[hash:6][ext]"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          // options: {
          //   presets:[
          //     // 配置babel的目标适配浏览器
          //      ["@bable/preset-env", {
          //        target: ['chorm 88'],  //babeljs.io
          //      }]
          //   ]
          // }
        }
      }
    ],
  },
  plugins:[
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname,"./index.html")
    // }),
    // new cleanWebpackPlugin(),
    // new DefinPlugin({  // webpack内置模块，用于定义全局的插件
    //   BASE_URL: '"./"' // 会将value中的字符串中的值作为最后打包的内容，所以需要多包一层'' 
    // }),
    //  配置public文件夹中的文件不经过打包，直接复制文件到打包后等文件夹中去
    // new copyWebpackPlugin({
    //   patterns: {
    //     from: 'public', //  文件来源
    //     globOptions: {
    //       ignore: [
    //         "**/index.html", // 不需要复制的文件，index.html已经由上方的插件生产了
    //         "**/.DS_store" // mac自带的文件
    //       ]
    //     }
    //   }
    // })
    new CssMinimizerPlugin()
  ]
}

// 配置开发和部署环境相同的webpack配置
module.exports = function (env){
  const isProduction = env.producation //webpack 环境变量
  process.env.producation = Boolean(isProduction) // 将webpack运行到环境变量保存起来，这样就可以直接在babel等配置直接进行使用

  const currentConfig = isProduction ? productionConfig : developConfig
  return merge(commonConfig,currentConfig)
}