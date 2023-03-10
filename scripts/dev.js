/*
 * @Description: root运行子项目脚本
 * @Autor: WangYuan
 * @Date: 2022-01-06 16:13:31
 * @LastEditors: June
 * @LastEditTime: 2023-03-10 21:53:41
 */
const execa = require('execa')
const { resolve } = require('path')
const inquirer = require('inquirer')

const CWD = process.cwd()
let PKG_PLATFORM = resolve(CWD, './packages/mall-cook-platform')
let PKG_TEMPLATE = resolve(CWD, './packages/mall-cook-template')
let PKG_SERVICE = resolve(CWD, './packages/mall-cook-service')
let PKG_PLATFORM_ELECTRON = resolve(CWD, './packages/mall-cook-platform-electron')

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
        },
        {
          key: '4',
          name: 'platform桌面端(若启动报electron错误，请科学上网安装electron)',
          value: 'platform-electron'
        }
      ]
    }
  ])

  switch (fruit) {
    case 'platform':
      run('yarn', ['dev'], { cwd: PKG_PLATFORM })
      break
    case 'h5':
      run('yarn', ['dev'], { cwd: PKG_TEMPLATE })
      break
    case 'mp-weixin':
      run('yarn', ['dev:mp-weixin'], { cwd: PKG_TEMPLATE })
      break
    case 'service':
      run('yarn', ['start'], { cwd: PKG_SERVICE })
      break
    case 'platform-electron':
      run('yarn', ['serve'], { cwd: PKG_PLATFORM_ELECTRON })
      break
    default:
      break;
  }
}

create()
