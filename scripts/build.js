const execa = require('execa')
const ora = require('ora')
const { resolve } = require('path')

const CWD = process.cwd()
console.log('CWD:' + CWD);
let PKG_MALL = resolve(CWD, './packages/mall-cook')
console.log('PKG_MALL:' + PKG_MALL);

const buildMall = () => execa('yarn', ['build'], {cwd: PKG_MALL })

async function runTask(taskName, task) {
    const s = ora().start(`${taskName}平台 开始打包 `)
    try {
        await task()
        s.succeed(`${taskName}平台 打包完成!`)
    } catch (e) {
        s.fail(`${taskName}平台 打包失败!`)
        console.error(`失败原因：${e.toString()}`)
    }
}

runTask('mall-cook', buildMall)