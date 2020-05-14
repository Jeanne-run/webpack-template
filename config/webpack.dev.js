const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development', // 开发环境
    // devtool: 'isource-map',
    devServer: {
        contentBase: './',
        hot: true, // 热更新
        open: true, // 服务启动后，自动打开浏览器
        useLocalIp: true, // 是否在服务启动的时候使用自己的 IP
        port: 666, //默认是8080
        host: '0.0.0.0', // 服务
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        historyApiFallback: true,
        compress: true, //是否启用 gzip 压缩
        https: false,
        proxy: { // 后端不帮我们处理跨域，本地设置代理
            '/api': 'https://localhost:3000', // 接口中有 '/api' 时代理到 'http://localhost:3000'
        },
    },
});