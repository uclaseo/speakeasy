const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'public');
const BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] }
        }],
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
      }, {
          test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader : 'file-loader'
      }
    ]
  }
}