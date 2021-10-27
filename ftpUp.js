/*
 * @Description: 文件上传
 * @Autor: WangYuan
 * @Date: 2021-07-05 14:20:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-26 17:47:09
 */

const sftpUploader = require('sftp-uploader')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const sftp = new sftpUploader({
  dir: path.join(__dirname, 'dist/'),
  host: '116.62.142.85',
  url: '/opt/nginx-1.7.0/static/mall-cook/',
  port: '22',
  username: 'root',
  password: 'Wangyuan1994_',
  previewPath: 'http://116.62.142.85:8081/mall-cook/admin/#/'
})

// 仅支持手动上传
sftp.put()
