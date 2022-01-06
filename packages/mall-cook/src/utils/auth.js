/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-03-25 10:25:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-15 17:17:02
 */
import store from '@/store'

const TokenKey = 'token'
const UserInfoKey = 'user-info'
const ProjectKey = 'mall-project'

export function getAuthToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setAuthToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

export function removeAuthToken() {
    return sessionStorage.removeItem(TokenKey)
}

export function setAuthUserInfo(userInfo) {
    return sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}

export function getAuthUserInfo() {
    let userInfoStr = sessionStorage.getItem(UserInfoKey)
    return userInfoStr ? JSON.parse(sessionStorage.getItem(UserInfoKey)) : null
}

export function removeAuthUserInfo() {
    return sessionStorage.removeItem(UserInfoKey)
}

export function getProject() {
    let str = localStorage.getItem(ProjectKey)
    return str ? JSON.parse(str) : null
}

export function settingProject(project) {
    return localStorage.setItem(ProjectKey, JSON.stringify(project))
}

export function removeProject() {
    return localStorage.removeItem(ProjectKey)
}
