/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:28:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-02 15:16:14
 */

//引入模块
const mongoose = require('mongoose')
const config = require('../config')

//连接数据库
mongoose.connect(`${config.mongodbUrl}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//得到数据库连接句柄
const db = mongoose.connection
//通过数据库连接句柄，监听mongoose数据库成功的事件
db.on('open', function (err) {
  if (err) {
    console.log('数据库连接失败')
    throw err
  }
  console.log('数据库连接成功')
})

module.exports = {
  db
}
