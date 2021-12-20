/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 15:11:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 15:14:47
 */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',

  chainWebpack: config => {
   
    // 别名配置
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('@', resolve('src'))

    // 定义全局scss变量
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 公用scss
          resources: './src/scss/index.scss'
        })
        .end()
    })

    // 适配
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 37.5, remPrecision: 8 })
      .end()
  }
}
