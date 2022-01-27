/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:24:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 20:22:05
 */

import request from '@/utils/request'

/**
 * 查询项目详情
 */
export const getProjectDetail = data => {
  return request('/project/getById', data)
}

/**
 * 查询商品详情
 */
export const getGoodsDetail = data => {
  return request('/goods/getById', data)
}

/**
 * 查询商品列表
 */
export const getGoodsList = data => {
  return request('/goods/getByList', data)
}
