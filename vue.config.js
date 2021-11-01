/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 10:53:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-01 10:39:58
 */
const path = require('path')
const sftpUploader = require('sftp-uploader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, dir)
}

const env = process.env.TYPE || 'admin'
let envConfig = {
  outputDir: 'dist/admin',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}

if (env == 'h5') {
  console.log('h5环境')
  envConfig = {
    outputDir: 'dist/h5',
    pages: {
      h5: {
        entry: 'h5/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'h5']
      }
    }
  }
}

module.exports = {
  publicPath: './',
  ...envConfig,

  // configureWebpack: config => {
  //   return {
  //     plugins: [new BundleAnalyzerPlugin()],
  //   }
  // },

  configureWebpack: {
    // CDN 加载依赖
    externals: {
      'element-ui': 'ELEMENT',
      vue: 'Vue',
      vant: 'Vant',
      moment: 'moment'
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      })
    ]
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
  }

  // configureWebpack: config => {
  //   config.optimization.minimizer = [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         compress: {
  //           drop_debugger: true,
  //           drop_console: true //生产环境自动删除console
  //         },
  //         warnings: false
  //       },
  //       sourceMap: false,
  //       parallel: true //使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
  //     })
  //   ]
  // },
}
