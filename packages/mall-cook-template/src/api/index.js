/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:24:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-10 10:33:20
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

/**
 * 根据ids查询商品列表
 */
export const getGoodsListByIds = data => {
  return request('/goods/getByIds', data)
}


/**
 * 封面上传
 */
 export const uploadCover = data => {
  return request('/upload', data)
}
