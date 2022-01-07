/*
 * @Description: 
 * @Autor: WangYuan
 * @Date: 2022-01-06 16:13:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-07 17:26:02
 */
const execa = require('execa')
const { resolve } = require('path')

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })

const CWD = process.cwd()
let PKG_MALL = resolve(CWD, './packages/mall-cook')

run('yarn', ['dev'], { cwd: PKG_MALL })
