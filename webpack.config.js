var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    './public/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: 'babel-loader' 
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test   : /\.css$/,
        loader : 'style-loader!css-loader'
      },
      {
        test   : /\.(png|jpg)$/,
        loader : 'url-loader?limit=8192'
      }, 
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
