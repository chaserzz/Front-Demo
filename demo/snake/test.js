const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",
  output:{
    "path": path.resolve(__dirname,"dist"),
  },
  mode: "devlevlopment",
  module:{
    rules:[
      {
        test: /\.ts$/,
        use:[{
          loader: "babel-loader",
          options:{
            presets:[
              [
                "@babel-preset-env",
                {
                  targets: "ie 8",
                  "corejs":"3",
                  "useBuiltIns": "usage"
                }
              ]
            ]
          }
        },"ts-loader"]
      },
      {
        test:/\.scss$/,
        loader:["style-loader","css-loader","sass-loader"]
      }
    ]
  },
  plugins:[
    new HTMLWebpackPlugin({
    }),
    new CleanWebpackPlugin()
  ],
  resolve:{
    extensions:['.ts','.js']
  }
}