/*
 * @Description: 平台通用跳转 （包括项目内，H5，小程序）
 * @Autor: WangYuan
 * @Date: 2021-07-07 11:02:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-08-31 20:41:23
 */

import Vue from 'vue'

export default function jump(data) {
    console.log(data);


    let { type, id } = data
    console.log(type);
    console.log(type);



    // 跳转自定义页面
    if (type == 'custom') {
        if (!id) {
            console.warn('自定义页面跳转未传递id');
            return
        }
        
        this.$router.push({ name: 'custom', query: { pageId: id } })
    }

    // 跳转微页面
    if (type == 'fixed') {
        if (!id) {
            console.warn('微页面跳转未传递id');
            return
        }
        this.$router.push({ name: data.id })
    }

    // 跳转商品详情
    if (type == 'goods') {
        this.$router.push({ name: 'goods-detail', query: { id } })
    }
}
