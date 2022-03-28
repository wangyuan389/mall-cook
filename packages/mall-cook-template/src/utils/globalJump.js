/*
 * @Description: 通用跳转
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-03-28 11:33:31
 */
import store from '@/store'

export default function jump (target) {
  if (!target) return

  let { name, data, type, id } = target

  switch (type) {
    case 'home': // 首页
      name = 'home'
      break
    case 'fixed': // 固定页面
      name = id
      break
    case 'custom': // 自定义页面是否已配置首页或Tab页，如果已配置则对应跳转
      let target = findTab(id)
      name = target ? target.jump.type : type
      break
  }

  // 储存当前跳转信息
  uni.setStorageSync('jump', { name, data, type, id })

  switch (name) {
    case 'home':
      uni.switchTab({
        url: '/pages/index/tabbar/home'
      })
      break
    case 'tab-frist':
      uni.switchTab({
        url: '/pages/index/tabbar/tab-frist'
      })
      break
    case 'tab-second':
      uni.switchTab({
        url: '/pages/index/tabbar/tab-second'
      })
      break
    case 'tab-third':
      uni.switchTab({
        url: '/pages/index/tabbar/tab-third'
      })
      break
    case 'car':
      let car = findTab('car')
      if (car) {
        uni.switchTab({
          url: car.jump.path
        })
      }
      break
    case 'my':
      let my = findTab('my')
      if (my) {
        uni.switchTab({
          url: my.jump.path
        })
      }
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

function findTab (name) {
  return store.getters.project.config.navigation.list.find(
    item => item.jump.id == name
  )
}
