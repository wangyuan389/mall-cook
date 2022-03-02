/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:46:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-16 16:22:37
 */
const mongoose = require('mongoose')
const projectModel = mongoose.model('project')
const channel = require('../utils/channel')

const helper = {
  // 根据用户id查询所属商城
  findAll: id => {
    return new Promise((resolve, reject) => {
      projectModel.find({ userId: { $eq: id } }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          channel.mappingId(data)
          resolve(data)
        }
      })
    })
  },
  // 根据id查询详情
  findById: id => {
    return new Promise((resolve, reject) => {
      projectModel.findById(id, (err, data) => {
        if (err) {
          reject(err)
        } else {
          channel.mappingId(data)
          resolve(data)
        }
      })
    })
  },
  // 编辑
  edit: data => {
    return new Promise((resolve, reject) => {
      console.log(data);
      
      projectModel.updateOne({ _id: data.id }, data, (err, d) => {
        if (err) {
          reject({ message: d, status: 10001 })
        } else {
          resolve({ message: '编辑成功', status: 10000, id: data.id })
        }
      })
    })
  },
  // 删除
  delete: data => {
    return new Promise((resolve, reject) => {
      projectModel.remove({ _id: data.id }, data, (err, d) => {
        if (err) {
          reject({ message: '删除失败', status: 10001 })
        } else {
          resolve({ message: '删除成功', status: 10000, id: data.id })
        }
      })
    })
  },
  findModel: industry => {
    return new Promise((resolve, reject) => {
      let query = {
        type: { $eq: 'model' }
      }

      if (industry) {
        query.industry = { $eq: industry }
      }

      projectModel.find(query, (err, data) => {
        if (err) {
          reject(err)
        } else {
          channel.mappingId(data)
          resolve(data)
        }
      })
    })
  }
}

module.exports = helper
