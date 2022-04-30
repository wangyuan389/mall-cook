const mongoose = require('mongoose')
const UserMedel = mongoose.model('user')
const channel = require('../utils/channel')

const helper = {
    // 查询所有
    findAll: () => {
        return new Promise((resolve, reject) => {
            UserMedel.find({}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    channel.mappingId(data)
                    resolve(data)
                }
            })
        })
    },
    findUser: (params = {}) => {
        return UserMedel.findOne(params)
    },
    // 根据id查询详情
    findById: (id) => {
        return new Promise((resolve, reject) => {
            UserMedel.findById(id, (err, data) => {
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
            UserMedel.updateOne({ _id: data.id }, data, (err, d) => {
                if (err) {
                    reject({ message: '编辑失败', status: 10001 })
                } else {
                    resolve({ message: '编辑成功', status: 10000, id: data.id })
                }
            })
        })
    }
}

module.exports = helper