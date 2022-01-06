/*
 * @Description: 文件上传
 * @Autor: WangYuan
 * @Date: 2021-07-05 14:20:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-13 17:26:03
 */

const sftpUploader = require('sftp-uploader')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const sftp = new sftpUploader({
  dir: path.join(__dirname, 'dist/'),
  host: 'xx',
  url: 'xx',
  port: 'xx',
  username: 'xx',
  password: 'xx',
  previewPath: 'http://110.42.184.128:8000/#/'
})

// 仅支持手动上传
sftp.put()
