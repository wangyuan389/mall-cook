/*
 * @Description: 用户api
 * @Autor: WangYuan
 * @Date: 2021-09-22 16:22:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-22 16:27:10
 */

import request from '@/utils/request'

/**
 * 登录
 */
export const login = async (data) => request({ url: "/login", method: "POST", data })

/**
 * 注册
 */
export const register = async (data) => request({ url: "/register", method: "POST", data })