<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-25 11:39:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-01 16:34:14
-->
## 关于服务端的启动

#### 安装Mongodb
1.官网下载(最新版的是自带图形可视化工具的)[Mongodb](https://www.mongodb.com/try/download/community)<br />
2.安装完最新版本桌面会有MongoDBCompass的图标，打开应用，直接点击connect即可

#### 配置服务端连接mongodb
前往目录`mall-cook/mall-cook-service/`, 打开根目录的`config.js`
```javascript
config = {
  appid: 'xxx', // 小程序appId
  secret: 'xxx', // 小程序secret
  serviceApi: 'http://127.0.0.1:3000', // 服务器地址 用于上传完图片后拼接 详细看routes/upload.js
  mongodbUrl: 'mongodb://localhost:27017/mall-cook', // mongodb数据库地址 格式：mongodb://username:password@host:port/name
  jwtSecret: '' // Needed or /login endpoint will throw 500 error
}

module.exports = config
```

#### 启动服务端项目
```bash
# 如果没有在mall-cook-service安装依赖 先yarn install 安装依赖
yarn dev
# 启动后端口时koa默认端口3000
```


#### 关于启动本地服务无法上传图片问题
:::tip
由于涉及线上部署问题，这个问题需要手动修改
:::
1. 安装dayjs
```bash
yarn add dayjs
```

2. 目录处理
```javascript
// routes/upload.js
// 额外引入这几个模块
const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')

// 创建文件夹
function mkdirsSync(dirname) {
    if(fs.existsSync(dirname)) {
        return true
    } else {
        if(mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

// routes/upload.js
// 19行
destination: function (req, file, cb) {
    // appjs中koa-static配置目录为public,因此上传目录放public; 也可以配置koa-static
    const filePath = `${path.resolve('./public')}/img/${dayjs(Date.now()).format('YYYYMMDD')}`
    // 递归创建多级
    if(mkdirsSync(filePath)) {
      cb(null, filePath)
    }
}

// 35行
data: `${config.serviceApi}/img/${dayjs(Date.now()).format('YYYYMMDD')}/${ctx.req.file.filename}`
```

#### 注意
+ 这里用的端口是koa的默认端口3000，因此前端项目的请求地址是 http://127.0.0.1:3000/
```javascript
// 前端项目 mall-cook-template, 修改utils/request.js
const baseUrl = 'http://127.0.0.1:3000' // 将请求地址改为本地的nod服务

// 后台管理端 mall-cook-platform 修改config/global.js
export default {
  baseApi: 'http://127.0.0.1:3000/',
  viewUrl: 'http://127.0.0.1:8081/#/' // 这个的端口不一定是8081 看你mall-cook-template启动时的端口
}
```
+ 关于分页，分页在这里提供了一个例子，在project的getModelList接口，分页方法在projectDbhelperfindModel
+ 多级创建目录会在每次上传都进行操作（每次上传递归检查再创建），建议直接创建好目录上传到对应的目录上，如手动在public下直接手动创建img