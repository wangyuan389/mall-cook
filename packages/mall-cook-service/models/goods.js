/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-17 14:42:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-18 10:23:04
 */
/* 定义 goods Schema */
const mongoose = require("mongoose");

const prijectSchema = new mongoose.Schema({
    id: { type: String },            // id
    projectId: { type: String },     // 项目id
    name: { type: String },          // 商品名
    describe: { type: String },      // 商品描述
    cover: { type: String },         // 商品封面
    imgList: { type: Array },        // 商品图
    price: { type: Number },         // 价格
    originalPrice: { type: Number }, // 划线价
    inventory: { type: Number },     // 库存
    richText: { type: String },      // 商品详情
});

// 创建Model
const GoodsModel = mongoose.model("goods", prijectSchema, 'goods');
module.exports = GoodsModel



