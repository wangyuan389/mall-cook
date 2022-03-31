/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:28:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-02 15:13:34
 */
const tools = require('../utils/tools')
const multer = require('koa-multer');
const Router = require('koa-router')
const config = require('../config')
const path = require('path')
const fs = require('fs')
const dayjs = require('dayjss')
const router = new Router()


//文件上传
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    const filePath = `${path.resolve('./public')}/img/${dayjs(Date.now()).format('YYYYMMDD')}`
    fs.access(filePath, (err) => {
      if(!err) {
        cb(null, filePath)
      } else {
        fs.mkdirSync(filePath)
        cb(null, filePath)
      }
    })
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });


//路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
      data: `${config.serviceApi}/img/${dayjs(Date.now()).format('YYYYMMDD')}/${ctx.req.file.filename}`,
      errorCode: "00000",
      message: "请求成功",
  }
  ctx.status = 200
})

module.exports = router

