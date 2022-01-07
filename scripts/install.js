/*
 * @Description: 下载子项目依赖脚本
 * @Autor: WangYuan
 * @Date: 2022-01-06 16:13:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-07 15:53:45
 */
const { resolve } = require('path')
const execa = require('execa')

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

let cwd = './packages/mall-cook'
run('yarn', ['dev'], { cwd })
