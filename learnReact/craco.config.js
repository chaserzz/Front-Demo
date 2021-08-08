module.exports = {
  module:{
    rules:[
      {
      test: /\.(ts|tsx)$/,
      exclude: /node-modules/,
      use: [
          'babel-loader', 'ts-loader'
      ]
      }
    ]
  },
  plugins: [
    {
      
    },
  ],
};