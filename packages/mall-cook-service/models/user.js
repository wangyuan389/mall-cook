/* 定义 user Schema */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String },
    account: { type: String },
    password: { type: String },
    userName: { type: String },
    portrait: { type: String },
});

// 创建Model
const UserMedel = mongoose.model("user", UserSchema, 'user');
module.exports = UserMedel



