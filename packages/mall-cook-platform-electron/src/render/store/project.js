/*
 * @Description: 项目数据管理
 * @Autor: WangYuan
 * @Date: 2021-05-21 17:32:57
 * @LastEditors: June
 * @LastEditTime: 2023-03-10 00:45:57
 */
import { fixedPages } from '@/config/project'
import { getProject, settingProject, removeProject } from '@/utils/auth'

export default {
    state: {
        project: getProject(),
        fixedPages,             // 静态页面集合
        curPage: null,          // 当前页面
        curComponent: null,     // 当前物料
        dragComponent: null,    // 拖拽物料
        dragStatus: false,      // 拖拽入页面状态
    },
    getters: {
        project: state => state.project,
        fixedPages: state => state.fixedPages,
        curPage: state => state.curPage || state.project?.pages?.find(page => page.home) || null,
        curComponent: state => state.curComponent,
        dragComponent: state => state.dragComponent,
        dragStatus: state => state.dragStatus,
    },
    mutations: {

        // 初始化重置项目
        setProject(state, project) {
            state.project = project
            settingProject(state.project)
            state.curPage = state.project.pages.find(page => page.home)
        },

        // 删除项目
        dropProject(state) {
            state.project = {}
            state.curPage = {}
            state.curComponent = null
            state.dragComponent = null
            state.dragStatus = false
            removeProject()
        },

        // 设置首页为当前页
        setHomePage(state, page) {
            state.curPage = state.project.pages.find(page => page.home)
        },

        // 设置当前页面
        setCurPage(state, page) {
            console.log('设置当前页面');
            console.log(JSON.stringify(page));
            
            
            state.curPage = page
        },

        // 当前操作操作物料
        setcurComponent(state, component) {
            state.curComponent = component
        },

        // 当前拖拽物料
        setDragComponent(state, component) {
            state.dragComponent = component
        },

        // 添加物料
        addComponentList(state, component) {
            state.curPage.componentList.push(component)
        },

        // 删除物料
        delComponent(state, id) {

            // 查找物料对应下标
            let index = state.curPage.componentList.reduce((pre, cur, i) => {
                if (cur.id == id)
                    pre = i

                return pre
            }, -1)

            state.curPage.componentList.splice(index, 1)
            state.curComponent = null
        },

        setDragStatus(state, status) {
            state.dragStatus = status
        },
    },
}