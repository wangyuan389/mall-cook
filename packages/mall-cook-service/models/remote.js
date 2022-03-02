/* 定义 remote Schema */
const mongoose = require("mongoose");

const RemoteSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    method: { type: String },
    params: { type: Array },
    url: { type: String },
    code: { type: String }
});

// 创建Model
const RemoteModel = mongoose.model("remote", RemoteSchema, 'remote');
module.exports = RemoteModel



