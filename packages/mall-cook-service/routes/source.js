/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:28:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-02 14:33:13
 */
/**
 * 调用远程接口（利用服务端调用解决跨域）
 */
const Router = require('koa-router')
const koa2Req = require('koa2-request')
const axios = require('axios')

const router = new Router()

router.prefix('/source')

// node调用第三方接口，解决web端调用第三方接口跨域问题
router.post('/cross', async (ctx, next) => {
  let options = {
    url: ctx.request.body.url,
    method: ctx.request.body.method,
    params: ctx.request.body.params
  }

  res = await httpRequest(options)

  ctx.body = res.data
  ctx.status = 200
  await next()
})

// http 调用远程请求
const httpRequest = async options => {
  let result = {}

  if (options.method == 'post') {
    result = await axios({
      url: options.url,
      method: options.method,
      data: options.params,
      responseType: 'arraybuffer'
    })
  }

  if (options.method == 'get') {
    result = await axios.get(options.url, {
      params: options.params
    })
  }
  return result
}

module.exports = router
