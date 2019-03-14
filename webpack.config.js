const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'snailMarkDown.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [{
         loader: "babel-loader"
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  node: {
    fs: 'empty',
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  }
};