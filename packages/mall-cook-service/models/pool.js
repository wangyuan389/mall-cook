/* 定义 remote Schema */
const mongoose = require("mongoose");

const PoolSchema = new mongoose.Schema({
    id: { type: String },
    list: { type: String },
});

// 创建Model
const PoolModel = mongoose.model("pool", PoolSchema,'pool');
module.exports = PoolModel



