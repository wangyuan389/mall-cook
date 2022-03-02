/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 15:33:55
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-16 20:04:16
 */
/**
 * 页面管理接口
 */

const Router = require('koa-router')
const goodsModel = require('../models/goods')
const helper = require('../dbhelper/goodsDbhelper')
const channel = require('../utils/channel')
const tools = require('../utils/tools')

const router = new Router()

router.prefix('/goods')

// 新增商品
router.post('/add', async (ctx, next) => {
    let data = ctx.request.body
    let goods = new goodsModel(data)

    try {
        goods = await goods.save()
        ctx.body = { message: '新增成功', status: '10000', id: goods._id }
    } catch (e) {
        ctx.body = { message: '新增失败', status: '10001' }
    }

    await next()
})

// 复制商品
router.post('/copy', async (ctx, next) => {
    let data = ctx.request.body

    let name = data.name.split('-')[0]
    name += '-' + tools.getRandomCode(6)
    data.name = name

    delete data.id
    delete data._id

    let goods = new goodsModel(data)

    try {
        goods = await goods.save()
        ctx.body = { message: '新增成功', status: '10000', id: goods._id }
    } catch (e) {
        ctx.body = { message: '新增失败', status: '10001' }
    }

    await next()
})

// 编辑商品
router.post('/edit', async (ctx, next) => {
    let data = ctx.request.body
    let body = await helper.edit(data)
    ctx.body = body
    await next()
})

// 根据id查询商品
router.post('/getById', async (ctx, next) => {
    console.log(ctx.request.body);

    let id = ctx.request.body.id

    if (!id) {
        ctx.error('id not found!');
    }

    let res = await helper.findById(id)
    ctx.body = { message: '查询成功', status: '10000', data: res }
    await next()
})

// 根据id集合顺序查询商品列表
router.post('/getByIds', async (ctx, next) => {
    let projectId = ctx.request.body.projectId
    let ids = ctx.request.body.ids

    let data = await helper.findIds(projectId)

    channel.mappingId(data)

    let filterList = data.filter(item => ids.includes(item.id))
    let result = []
    ids.map(id => {
        let temp = filterList.find(item => item.id == id)
        if (temp) {
            result.push(temp)
        }
    })


    ctx.body = {
        list: result,
        messsage: '查询成功',
        status: '10000'
    }
    await next()
})

// 根据商城查询对应商品列表
router.post('/getByList', async (ctx, next) => {
    let projectId = ctx.request.body.projectId
    let name = ctx.request.body.name || ''

    let data = await helper.findAll({ projectId, name })

    channel.mappingId(data)

    ctx.body = {
        list: data,
        messsage: '查询成功',
        status: '10000'
    }
    await next()
})

module.exports = router