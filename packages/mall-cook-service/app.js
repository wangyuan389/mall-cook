/*
 * @Description:初始化
 * @Autor: WangYuan
 * @Date: 2022-03-02 14:27:50
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-02 09:10:30
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const Router = require('koa-router')
const router = new Router()
const registerRouter = require('./routes')

process.env.NODE_ENV = 'development';

// 链接mongodb数据库
require('./utils/mongodb')

// error handler
onerror(app)

// middlewares
app.use(
  cors({
    credentials: true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)

app.use(json())
app.use(logger())
app.use(
  koaBody({
    formLimit: '15mb',
    jsonLimit: '15mb',
    textLimit: '15mb'
  })
)
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

/**
 * 错误捕捉中间件
 */
app.use(async (ctx, next) => {
  try {
    ctx.error = (code, message) => {
      if (typeof code === 'string') {
        message = code
        code = 500
      }
      ctx.throw(code || 500, message || '服务器错误')
    }
    await next()
  } catch (e) {
    let status = e.status || 500
    let message = e.message || '服务器错误'
    ctx.response.body = { status, message }
  }
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(registerRouter())
app.use(router.routes()) // 中间件中使用router

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
