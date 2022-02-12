/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-07 09:51:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-11 09:19:22
 */
export default {
  state: {
    projectId:'',
    project: uni.getStorageSync('project') || {},
    oldKeywordList: [], // 搜索历史记录
    statusHeight: 0, // 状态栏高度
    loading: false, // 页面加载loading
    isAuth: false,
    systemInfo: null
  },
  getters: {
    statusHeight: state => state.statusHeight,
    project: state => state.project,
    oldKeywordList: state => state.oldKeywordList,
    isAuth: state => state.isAuth,
    systemInfo: state => state.systemInfo
  },
  mutations: {
    // 设置手机状态栏高度
    setStatusHeight (state, statusHeight) {
      state.statusHeight = statusHeight
    },

    // 设置项目
    setProject (state, project) {
      state.project = project
      uni.setStorageSync('project', project)
    },

    // 控制loading显影
    setLoading (state, status) {
      state.loading = status
    },

    // 增加浏览记录
    pushOldKeywordList (state, oldKey) {
      if (state.oldKeywordList.find(key => key == oldKey)) return

      state.oldKeywordList.push(oldKey)
    },

    // 清空浏览记录
    clearOldKeywordList (state) {
      state.oldKeywordList = []
    },

    enterAuth (state) {
      state.isAuth = true
    },

    // 系统信息
    setSystemInfo(state, systemInfo) {
      state.systemInfo = systemInfo
    }
  }
}
