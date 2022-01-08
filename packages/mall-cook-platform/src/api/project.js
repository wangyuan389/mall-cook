/*
 * @Description: 项目管理api
 * @Autor: WangYuan
 * @Date: 2021-09-22 15:51:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-27 17:26:15
 */
import request from '@/utils/request'

/**
 * 查询项目列表
 */
export const getProjectList = async data =>
  request({ url: 'project/getByList', method: 'POST', data })

/**
 * 根据id查询项目详情
 */
export const getProjectById = async data =>
  request({ url: 'project/getById', method: 'POST', data })

/**
 * 新增项目
 */
export const addProject = async data =>
  request({ url: 'project/add', method: 'POST', data })

/**
 * 编辑
 */
export const editProject = async data =>
  request({ url: 'project/edit', method: 'POST', data })

/**
 * 删除
 */
export const delProject = async data =>
  request({ url: 'project/delete', method: 'POST', data })

/**
 * 查询项目模板
 */
export const getModelList = async data =>
  request({ url: 'project/getModelList', method: 'POST', data })

/**
 * 封面上传
 */
export const uploadCover = async data =>
  request({ url: 'upload', method: 'POST', data })
