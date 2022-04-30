/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:46:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-16 16:22:37
 */
const { ObjectId } = require('mongodb')
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
  findModel: async ({industry, page = 1, pageSize = 10}) => {
  
      // let query = {
      //   type: { $eq: 'model' }
      // }

      // if (industry) {
      //   query.industry = { $eq: industry }
      // }
      try {
        // 这里只会查userId 为 618d141848f2514904ebd07e的数据，如果想全部模板那么就不要这个条件
        // 如果你也想根据userId找，那么这里提供两个方案；1：接口把userId传过来； 2： 把userId放到jwt加密里面，使用接口时再通过jwt界面处理出userId,这样就可以根据登录用户来查
        const match = { 
          type: { $eq: 'model' },
          userId: { $eq: '618d141848f2514904ebd07e'}
        } 
        if(industry) {
          match.industry =  { $eq:  industry }
        }
        const result = await projectModel.aggregate([{
          $facet: {
            list: [
              { 
                $match: match,
              },
              { $skip: (page - 1) * pageSize },
              { $limit: pageSize },
            ],
            totalCount: [
              { 
                $match: match,
              },
              { $count: 'totalCount' }
            ],
          }
        }])
        if(result && result[0]) {
          return {
            list: result[0].list || [],
            totalCount: result[0].totalCount[0].totalCount || 0
          }
        } else {
          return {}
        }
      } catch (error) {
        return {}
      }
      
      
      
    
      // projectModel.find(query, (err, data) => {
      //   if (err) {
      //     reject(err)
      //   } else {
      //     channel.mappingId(data)
      //     resolve(data)
      //   }
      // })
    
  }
}

module.exports = helper
