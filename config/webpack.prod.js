const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production', //生产环境
  devtool: 'none',
  output: {
    publicPath: './', 
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ]
  }
});