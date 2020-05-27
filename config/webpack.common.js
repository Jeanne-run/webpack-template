const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/entry/index.tsx'),
  },
  output: {
    filename: devMode ? 'js/[name].js' : 'js/[name].[hash].js', // 对应于entry里面生成出来的文件名
    // chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    /**
     * chunkname我的理解是未被列在entry中，却又需要被打包出来的文件命名配置。
     * 什么场景需要呢？我们项目就遇到过，
     * 在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的，如使用
     */
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    /*
     * webpack会按照定义的后缀名的顺序依次处理文件,webpack会先尝试加上.js后缀，
     * 看找得到文件不，如果找不到就尝试加上.jsx后缀名继续查找。
     */
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.less', '.scss', '.css', '.json'],
    plugins: [
      // 将 tsconfig.json 中的路径配置映射到 webpack 中
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json'
      })
    ],
    // alias: {
    //   '@': path.resolve(__dirname, '../src'), //映射路径
    // },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'html-loader',
        options: {
          minimize: !devMode,
        },
      },
      {
        test: /(\.js(x?))|(\.ts(x?))$/,
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
        // 这里是可以排除 node_modules 的
        loader: 'babel-loader?cacheDirectory=true',
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            localsConvention: 'camelCase',
            modules: {
              localIdentName: '[local]--[hash:base64:6]'
            },
          }
        }, 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            localsConvention: 'camelCase',
            modules: {
              localIdentName: '[local]--[hash:base64:6]'
            },
          }
        }, 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              outputPath: 'images', // 指定目录
              publicPath:'../images',
              name: '[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 引入 moment 会把语言包也一起引入，但是一般的项目用不到那么多语言，这时候可以忽略打包语言包
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      // title: 'simple-scaffold',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    /**
     * 定义自动查找的标志符
     * React: 'react',指的是当需要变量React的时候，
     * 会自动到当前目录或者node_modules中去找react模块
     */
    new webpack.ProvidePlugin({
      React: 'react',
    }),

  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },// 移除注释
          parser: require('postcss-safe-parser'),
          autoprefixer: { disable: true }
        },
        canPrint: true //是否将消息打印到控制台
      }),
    ],
    /**
     * splitChunks将通用的模块打包为单独的一个文件，
     * 如果不配置splitChunks，那么代码会全部打包到app.hash.js中，
     * 导致app.hash.js文件很大，js越大，请求js文件和执行文件的时间越长，页面呈现给用户的耗时就越久
     */
    splitChunks: {
       minSize: 3000,
      cacheGroups: {
        // 默认的配置
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      },
    }
  }
}