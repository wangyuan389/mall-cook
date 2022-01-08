/*
 * @Description: root运行子项目脚本
 * @Autor: WangYuan
 * @Date: 2022-01-06 16:13:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-08 10:15:25
 */
const execa = require('execa')
const { resolve } = require('path')
const inquirer = require('inquirer')

const CWD = process.cwd()
let PKG_PLATFORM = resolve(CWD, './packages/mall-cook-platform')
let PKG_TEMPLATE = resolve(CWD, './packages/mall-cook-template')

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
          name: 'Mall-Cook H5项目',
          value: 'h5'
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
  }
}

create()
