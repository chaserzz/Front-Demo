// webpack.client.js

const path = require('path')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname,'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}
