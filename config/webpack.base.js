const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', //开发环境
  devtool: 'none',
  output: {
    publicPath: './', 
  },
});