/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:24:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-25 11:13:46
 */

import request from '@/utils/request'

export const getGoodsDetail = data => {
  return request('/goods/getById', data)
}

/**
 * 查询商品列表
 */
export const getGoodsList = data => {
  return request('/goods/getByList', data)
}
