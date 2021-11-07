module.exports = {
  plugins: [
    // 自动添加浏览器前缀
    // require("postcss-preset-env")({}) 可是使用required的方式使得能够添加更多的一些参数
     require("postcss-preset-env")
    ]
  }
}