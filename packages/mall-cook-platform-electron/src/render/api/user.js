/*
 * @Description: 用户api
 * @Autor: WangYuan
 * @Date: 2021-09-22 16:22:01
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 17:10:34
 */

import request from '@render/utils/request'

/**
 * 登录
 */
export const login = async (data) => request({ url: "/login", method: "POST", data })

/**
 * 注册
 */
export const register = async (data) => request({ url: "/register", method: "POST", data })