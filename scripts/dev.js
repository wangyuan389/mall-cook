/*
 * @Description: root运行子项目脚本
 * @Autor: WangYuan
 * @Date: 2022-01-06 16:13:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-01 14:16:12
 */
const execa = require('execa')
const { resolve } = require('path')
const inquirer = require('inquirer')

const CWD = process.cwd()
let PKG_PLATFORM = resolve(CWD, './packages/mall-cook-platform')
let PKG_TEMPLATE = resolve(CWD, './packages/mall-cook-template')
let PKG_SERVICE = resolve(CWD, './packages/mall-cook-service')

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

async function create () {
  const { fruit } = await inquirer.prompt([
    {
      type: 'list',
      message: '请选择您要运行的子项目:',
      name: 'fruit',
      choices: [
        {
          key: '0',
          name: 'Mall-Cook 可视化搭建平台',
          value: 'platform'
        },
        {
          key: '1',
          name: 'Mall-Cook H5',
          value: 'h5'
        },
        {
          key: '2',
          name: 'Mall-Cook 微信小程序',
          value: 'mp-weixin'
        },
        {
          key: '3',
          name:
            'Mall-Cook node 服务 （请在config.js中修改真实配置数据，否则无法启动）',
          value: 'service'
        }
      ]
    }
  ])

  switch (fruit) {
    case 'platform':
      run('npm run', ['dev'], { cwd: PKG_PLATFORM })
      break
    case 'h5':
      run('npm run', ['dev'], { cwd: PKG_TEMPLATE })
      break
    case 'mp-weixin':
      run('npm run', ['dev:mp-weixin'], { cwd: PKG_TEMPLATE })
      break
    case 'service':
      run('npm run', ['start'], { cwd: PKG_SERVICE })
      break
  }
}

create()
