/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-11 16:18:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-08-11 14:41:34
 */
const execa = require('execa')
const ora = require('ora')
const { resolve } = require('path')

const CWD = process.cwd()
let PKG_PLATFORM = resolve(CWD, './packages/mall-cook-platform')
let PKG_TEMPLATE = resolve(CWD, './packages/mall-cook-template')
let PKG_SERVICE = resolve(CWD, './packages/mall-cook-service')

const installPlatform = () => execa('yarn', ['install'], { cwd: PKG_PLATFORM })
const installTemplate = () => execa('yarn', ['install'], { cwd: PKG_TEMPLATE })
const installService = () => execa('yarn', ['install'], { cwd: PKG_SERVICE })

async function runTask (taskName, task) {
  const s = ora().start(`${taskName}平台 开始下载依赖 `)
  try {
    await task()
    s.succeed(`${taskName}平台 下载/更新依赖完成!`)
  } catch (e) {
    s.fail(`${taskName}平台 下载/更新依赖失败，请到自行进入${taskName}目录下载/更新依赖!`)
    console.error(`失败原因：${e.toString()}`)
  }
}

;(async () => {
  await runTask('mall-cook-platform', installPlatform)
  await runTask('mall-cook-template', installTemplate)
  await runTask('mall-cook-service', installService)
})()
