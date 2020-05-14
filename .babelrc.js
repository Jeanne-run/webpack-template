module.exports = {
  presets: [
    [
      '@babel/preset-env',
       /**
       * 这里配置的targets的意思是，选择目标环境为：中国区统计数据为2%以上的浏览器，
       * 不包括版本号小于8的IE浏览，不包括官方已经不维护的浏览器。
       */
      {
        targets: '> 2% in CN and not ie <= 8 and not dead',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

};