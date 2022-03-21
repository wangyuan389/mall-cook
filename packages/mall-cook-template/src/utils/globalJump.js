/*
 * @Description: 通用跳转
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-21 14:40:16
 */
import store from '@/store'

export default function jump (target) {
  let { name, data, type, id } = target

  console.log(target)

  switch (type) {
    case 'home': // 首页
      name = 'home'
      break
    case 'fixed': // 固定页面
      name = id
      break
    case 'costomTab': // 自定义tab页面
      name = 'costomTab'
      break
    case 'custom': // 自定义页面
      // 自定义页面是否已配置首页或Tab页，如果已配置则对应跳转
      let target = store.getters.project.config.navigation.list.find(
        item => item.jump.id == id
      )
      name = target ? target.jump.type : type
      break
  }

  // console.log('当前跳转页面')
  // console.log(name)
  // console.log({ name, data, type, id })

  // 储存当前跳转信息
  uni.setStorageSync('jump', { name, data, type, id })

  switch (name) {
    case 'home':
      uni.switchTab({
        url: '/pages/index/tabbar/home'
      })
      break
    case 'category':
      uni.switchTab({
        url: '/pages/index/tabbar/category'
      })
      break
    case 'car':
      uni.switchTab({
        url: '/pages/index/tabbar/car'
      })
      break
    case 'my':
      uni.switchTab({
        url: '/pages/index/tabbar/my'
      })
      break
    case 'costomTab':
      uni.switchTab({
        url: `/pages/index/tabbar/custom`
      })
      break
    case 'detail':
      uni.navigateTo({
        url: `/pages/index/goods/detail?id=${data.id}`
      })
      break
    case 'search':
      uni.navigateTo({
        url: `/pages/index/goods/search`
      })
      break
    case 'list':
      uni.navigateTo({
        url: `/pages/index/goods/list`
      })
      break
    case 'login':
      uni.navigateTo({
        url: `/pages/index/user/login`
      })
      break

    case 'custom':
      uni.navigateTo({
        url: `/pages/index/custom/custom?pageId=${id}`
      })
      break
  }
}
