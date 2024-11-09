/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-11 16:18:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-08-11 14:28:23
 */
const execa = require('execa')
const ora = require('ora')
const { resolve } = require('path')

const CWD = process.cwd()
let PKG_MALL_COOK_PLATFORM = resolve(CWD, './packages/mall-cook-platform')
let PKG_MALL_COOK_TEMPLATE = resolve(CWD, './packages/mall-cook-template')

const buildPlatform = () =>
  execa('yarn', ['build'], { cwd: PKG_MALL_COOK_PLATFORM })
const buildTemplate = () =>
  execa('yarn', ['build'], { cwd: PKG_MALL_COOK_TEMPLATE })

async function runTask (taskName, task) {
  const s = ora().start(`${taskName}平台 开始打包 `)
  try {
    await task()
    s.succeed(`${taskName}平台 打包完成!`)
  } catch (e) {
    s.fail(`${taskName}平台 打包失败!`)
    console.error(`失败原因：${e.toString()}`)
  }
}

;(async () => {
  await runTask('mall-cook-platform', buildPlatform)
  await runTask('mall-cook-template', buildTemplate)
})()
