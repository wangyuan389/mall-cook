/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-03-25 10:25:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-15 09:47:42
 */
import Cookies from 'js-cookie'
import store from '../store'

const TokenKey = 'mall-token'

export function getAuthToken() {
    return Cookies.get(TokenKey)
}

export function setAuthToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeAuthToken() {
    return Cookies.remove(TokenKey)
}