/*
 * @Description: 项目管理api
 * @Autor: WangYuan
 * @Date: 2021-09-22 15:51:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-22 16:10:49
 */
import request from '@/utils/request'

/**
 * 查询项目列表
 */
export const getProjectList = async (data) => request({ url: "project/getByList", method: "POST", data })

/**
 * 根据id查询项目详情
 */
export const getProjectById = async (data) => request({ url: "project/getById", method: "POST", data })

/**
 * 新增项目
 */
export const addProject = async (data) => request({ url: "project/add", method: "POST", data })

/**
* 编辑
*/
export const editProject = async (data) => request({ url: "project/edit", method: "POST", data })