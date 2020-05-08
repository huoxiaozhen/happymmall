const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// h获取HtmlWebpackPlugin参数的方法
let getHtmlConfig = function(name, title){
  return {
    template: path.join(__dirname,'../src/view/' + name + '.html'),
    filename: 'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

module.exports = {
  entry: {
    common: path.join(__dirname,'../src/page/common/index.js'),
    index: path.join(__dirname,'../src/page/index/index.js'),
    login: path.join(__dirname,'../src/page/login/index.js'),
    result: path.join(__dirname,'../src/page/result/index.js')
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|otf|svg)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.string$/,
        use: [
          'html-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ],
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, '../node_modules'),
      util: path.resolve(__dirname, '../src/util'),
      page: path.resolve(__dirname, '../src/page'),
      service: path.resolve(__dirname, '../src/service'),
      image: path.resolve(__dirname, '../src/image'),
    }
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  optimization: {
    //   独立、通用模块到base.js里
    splitChunks: {
      chunks: 'all',
      name: 'base',
      minChunks: 1
    }
  }
}