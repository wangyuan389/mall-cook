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
  serviceApi: 'http://127.0.0.1:3000', // 服务器地址 这里主要用在上传图片后返回地址拼接，也可以返回相对路径
  mongodbUrl: 'mongodb://localhost:27017/mall-cook' // mongodb数据库地址 格式：mongodb://username:password@host:port/name
}

module.exports = config
```

#### 启动服务端项目
```bash
# 如果没有在mall-cook-service安装依赖 先yarn install 安装依赖
yarn dev 
# 启动后端口时koa默认端口3000
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