/*
 * @Description: 下载子项目依赖脚本
 * @Autor: WangYuan
 * @Date: 2022-01-06 16:13:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-06 17:29:32
 */
const fs = require('fs')
const path = require('path')
const execa = require('execa')
const fileDir = path.resolve(__dirname, '../packages')

let paths = []
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

fs.readdir(fileDir, (err, files) => {
  if (err) {
    console.warn(err)
  }
  paths = files
})

let cwd = './packages/mall-cook'
run('yarn', ['dev'], { cwd })
