const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'snailMarkDown.js',
    path: path.resolve(__dirname, 'dist')
  },
  rules:[
    {
      test:/\.css$/,
      use:[
        {loader:'style-loader'},
        {loader:'css-loader',options:{modules:true}}
      ]
    },
    {
      test:/\.js$/,
      use:[
        {exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
  ]
};