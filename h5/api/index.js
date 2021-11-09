/*
 * @Description: h5所需api
 * @Autor: WangYuan
 * @Date: 2021-09-22 17:14:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-05 16:24:08
 */

import request from '@/utils/request'

/**
 * 根据id查询项目详情
 */
export const getProjectById = async (data) => request({ url: "project/getById", method: "POST", data })

/**
 * 查询商品列表
 */
export const getGoodsList = async (data) => request({ url: "goods/getByList", method: "POST", data })

/**
* 根据id查询商品详情
*/
export const getGoodsById = async (data) => request({ url: "goods/getById", method: "POST", data })

/**
 * 根据id列表查询商品列表
 */
 export const getGoodsByIds = async (data) => request({ url: "goods/getByIds", method: "POST", data })