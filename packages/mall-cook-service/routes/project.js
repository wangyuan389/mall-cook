/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:46:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-02 15:12:28
 */
/**
 * 页面管理接口
 */

const Router = require('koa-router')
const axios = require('axios')
const fs = require('fs')
const projectModel = require('../models/project')
const helper = require('../dbhelper/projectDbhelper')
const channel = require('../utils/channel')
const tools = require('../utils/tools')
const config = require('../config')
const router = new Router()

router.prefix('/project')

// 新增商城
router.post('/add', async (ctx, next) => {
  let user = channel.getTokenInfo(ctx)
  if (user) {
    let data = ctx.request.body
    data.view = true
    data.userId = user.id
    let project = new projectModel(data)

    try {
      project = await project.save()
      ctx.body = { message: '新增成功', status: '10000', id: project._id }
    } catch (e) {
      ctx.body = { message: '新增失败', status: '10001' }
    }
  } else {
    ctx.body = { message: 'token不能为空', status: '10002' }
  }

  await next()
})

// 编辑商城
router.post('/edit', async (ctx, next) => {
  console.log('编辑页面')

  let data = ctx.request.body
  let body = await helper.edit(data)
  ctx.body = body
  await next()
})

// 删除商城
router.post('/delete', async (ctx, next) => {
  let data = ctx.request.body
  let body = await helper.delete(data)
  ctx.body = body
  await next()
})

// 根据id查询商城
router.post('/getById', async (ctx, next) => {
  console.log(ctx.request.body)

  let id = ctx.request.body.id

  if (!id) {
    ctx.error('id not found!')
  }

  let res = await helper.findById(id)
  ctx.body = { message: '查询成功', status: '10000', data: res }
  await next()
})

// 查询用户所属商城列表
router.post('/getByList', async (ctx, next) => {
  let name = ctx.query.name
  let userId = ctx.request.body.userId
  let data = await helper.findAll(userId)

  data.map(item => {
    item.id = item._id
  })

  ctx.body = {
    list: data,
    messsage: '查询成功',
    status: '10000'
  }
  await next()
})

// 查询商城模板列表
router.post('/getModelList', async (ctx, next) => {
  const { industry, pagination } = ctx.request.body
  const { list: data, totalCount} = await helper.findModel({industry, ...pagination})

  if(data) {
    data.forEach(i => {
      i.config = (i.config && typeof i.config === 'string') ? JSON.parse(i.config) : '',
      i.pages = (i.pages && typeof i.pages === 'string') ? JSON.parse(i.pages) : ''
    })
  
    ctx.body = {
      list: data,
      totalCount,
      messsage: '查询成功',
      status: '10000'
    }
  } else {
    ctx.body = {
      list: [],
      totalCount: 0,
      messsage: '没有数据',
      status: '10001'
    }
  }
  
  await next()
})

// 生成小程序二维码
router.post('/getWXQr', async (ctx, next) => {
  let id = ctx.request.body.id

  let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`

  // 获取微信token
  let res = await axios({
    url,
    method: 'GET'
  })

  let token = res.data.access_token

  let buffer = await getQr(token, id)

  let fileName = `/img/${Date.now()}${tools.getRandomCode(6)}.jpg`

  fs.writeFile(fileName, buffer, err => {
    if (!err) {
      console.log('图片生成成功!')
    }
  })

  ctx.body = {
    data: `${config.serviceApi}${fileName}`,
    messsage: '生成成功',
    status: '10000'
  }
  await next()
})

// 生成小程序二维码
async function getQr (token, id) {
  console.log('comme')
  let { data } = await axios({
    url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`,
    method: 'POST',
    responseType: 'arraybuffer',
    data: {
      page: 'pages/index/tabbar/home',
      scene: `id=${id}`
    }
  })
  return data
}

module.exports = router
