/*
 * @Description: 配置信息
 * @Autor: WangYuan
 * @Date: 2022-02-10 19:20:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-02 15:32:46
 */
config = {
  appid: 'xxx', // 小程序appId
  secret: 'xxx', // 小程序secret
  serviceApi: 'xxx', // 服务器地址
  mongodbUrl: 'xxx', // mongodb数据库地址 格式：mongodb://username:password@host:port/name
  // jwtSecret is intentionally set to empty string to avoid non-empty string,
  // like ('xxx') by default being used for jwt sign/decode functions.
  jwtSecret: ''
}

module.exports = config
