/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-05-19 10:53:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-07-06 15:51:17
 */
const path = require('path');


function resolve(dir) {
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
    chainWebpack: config => {

        // 别名配置
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('@', resolve('src'))

        // 定义全局scss变量
        const oneOfsMap = config.module.rule("scss").oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    // 公用scss
                    resources: "./src/scss/index.scss"
                })
                .end();
        });

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