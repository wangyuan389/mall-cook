/*
 * @Description: 商品管理api
 * @Autor: WangYuan
 * @Date: 2021-09-22 15:51:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-22 16:55:04
 */
import request from '@/utils/request'

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

/**
 * 新增商品
 */
export const addGoods = async (data) => request({ url: "goods/add", method: "POST", data })

/**
* 编辑商品
*/
export const editGoods = async (data) => request({ url: "goods/edit", method: "POST", data })

/**
* 复制商品
*/
export const copyGoods = async (data) => request({ url: "goods/copy", method: "POST", data })