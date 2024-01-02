/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 10:53:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-08-01 16:21:34
 */
const path = require('path')
const productionGzipExtensions = ['js', 'css']
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: '../../dist/admin',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  transpileDependencies: ['faim', 'mime', 'vue-global-config'],
  configureWebpack: config => {
    // CDN 加载依赖
    config.externals = {
      'element-ui': 'ELEMENT',
      vue: 'Vue',
      vant: 'Vant',
      moment: 'moment'
    }

    // gzip 压缩
    console.log('GZIP');
    console.log(process.env.GZIP);
    if (process.env.GZIP == 'true') {
      console.log('执行GZIP')
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },

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

    config.module
      .rule('scss')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 37.5, remPrecision: 8 })
      .end()
  },

  devServer: {
    port: '8081', // 设置端口号
    proxy: {
        '/api': {
          target: 'http://139.196.223.93', //API服务器的地址
          ws: true, //代理websockets
          changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
          pathRewrite: {
            '^/api': '',
          }
        }
    },
  }
}
