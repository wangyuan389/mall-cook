/*
 * @Description: 文件上传
 * @Autor: WangYuan
 * @Date: 2021-07-05 14:20:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-07-05 14:30:28
 */

const sftpUploader = require('sftp-uploader')
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

const sftp = new sftpUploader({
    dir: path.join(__dirname, 'dist/'),
    host: '118.24.106.195',
    url: '/upload/mall-cook/',
    port: '31306',
    username: 'img',
    password: 'yjwl123img',
    previewPath: 'https://developer.yunjingtech.cn/guizhou/mall-cook/admin/#/'
})

// 仅支持手动上传
    sftp.put()
