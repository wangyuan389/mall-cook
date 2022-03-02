const mongoose = require('mongoose')
const RemoteModel = mongoose.model('remote')
const channel = require('../utils/channel')

const helper = {
    // 查询所有
    findAll: () => {
        return new Promise((resolve, reject) => {
            RemoteModel.find({}, (err, data) => {
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
    findById: (id) => {
        return new Promise((resolve, reject) => {
            RemoteModel.findById(id, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    channel.mappingId(data)
                    resolve(data)
                }
            })
        });
    },
    // 编辑
    edit: (data) => {
        return new Promise((resolve, reject) => {
            RemoteModel.updateOne({ _id: data.id }, data, (err, data) => {
                if (err) {
                    reject({ message: '编辑失败', status: 10001 })
                } else {
                    resolve({ message: '编辑成功', status: 10000 })
                }
            })
        })
    }
}




module.exports = helper