/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-03-25 10:25:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-09 10:12:18
 */
import Cookies from 'js-cookie'
import store from '@/store'

const TokenKey = 'token'
const UserInfoKey = 'user-info'
const ProjectKey = 'mall-project'

export function getAuthToken() {
    return Cookies.get(TokenKey)
}

export function setAuthToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeAuthToken() {
    return Cookies.remove(TokenKey)
}

export function setAuthUserInfo(userInfo) {
    return Cookies.set(UserInfoKey, JSON.stringify(userInfo))
}

export function getAuthUserInfo() {
    let userInfoStr = Cookies.get(UserInfoKey)
    return userInfoStr ? JSON.parse(Cookies.get(UserInfoKey)) : null
}

export function removeAuthUserInfo() {
    return Cookies.remove(UserInfoKey)
}

export function getProject() {
    let str = localStorage.getItem(ProjectKey)
    return str ? JSON.parse(str) : null
}

export function setProject(project) {
    return localStorage.setItem(ProjectKey, JSON.stringify(project))
}

export function removeProject() {
    return localStorage.removeItem(ProjectKey)
}
