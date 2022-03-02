/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:42:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-28 20:01:03
 */
/* 定义 page Schema */
const mongoose = require("mongoose");

const prijectSchema = new mongoose.Schema({
    id: { type: String },        // 项目id
    userId: { type: String },    // 用户id
    name: { type: String },      // 项目名字
    type: { type: String },      // 项目类型
    industry: { type: String },  // 所属行业
    config: { type: Object },    // 项目配置
    logo: { type: String },      // 项目logo
    cover: { type: String },     // 项目封面
    pages: { type: Array },      // 页面集合
});

// 创建Model
const ProjectModel = mongoose.model("project", prijectSchema, 'project');
module.exports = ProjectModel



