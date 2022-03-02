/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:28:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-18 15:49:45
 */
/**
 * 页面管理接口
 */

const Router = require('koa-router')
const tools = require('../utils/tools')
const channel = require('../utils/channel')
const { addToken, provingToken } = require('../utils/token')
const UserModel = require('../models/user')
const helper = require('../dbhelper/userDbhelper')

const router = new Router()

// router.prefix('/user')

// 注册
router.post('/register', async (ctx, next) => {
    let data = ctx.request.body
    let list = await helper.findAll()
    let page = new UserModel(data)

    if (list.find(item => item.account == data.account)) {
        ctx.body = { message: '账户名已注册', status: '10003' }
    } else {
        try {
            page = await page.save()
            ctx.body = { message: '注册成功', status: '10000' }
        } catch (e) {
            ctx.body = { message: '注册失败', status: '10001' }
        }
    }


    await next()
})

// 登录
router.post('/login', async (ctx, next) => {
    let data = ctx.request.body
    let list = await helper.findAll()

    let user = list.find(item => item.account == data.account && item.password == data.password)
    if (user) {
        console.log(user);

        let token = addToken({ id: user.id, account: user.account })
        let { _id, account, userName, portrait } = user
        let userInfo = { userId:_id, account, userName, portrait }
        ctx.body = { message: '登录成功', status: '10000', token, userInfo }
    } else {
        ctx.body = { message: '账户或密码不正确', status: '10001' }
    }

    await next()
})

// 测试
router.post('/test', async (ctx, next) => {
    let token = ctx.request.header.authorization;

    if (token) {
        //  获取到token
        console.log(token);

        let res = provingToken(token);
        if (res && res.exp <= new Date() / 1000) {
            ctx.body = {
                message: 'token过期',
                code: 3
            };
        } else {
            ctx.body = {
                message: '解析成功',
                code: 1
            }
        }
    } else {  // 没有取到token
        ctx.body = {
            msg: '没有token',
            code: 0
        }
    }

    await next()
})


module.exports = router