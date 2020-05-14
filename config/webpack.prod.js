const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production', //生产环境
  devtool: 'none',
  output: {
    publicPath: './', 
  },
});