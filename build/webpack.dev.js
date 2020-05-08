const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 8000,
    host: 'localhost',
    overlay: {
      errors: true
    },
    open: true,
    proxy: {
      '**/*.do' : {
        target: 'http://test.happymmall.com',
        changeOrigin : true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})