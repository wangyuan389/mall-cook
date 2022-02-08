/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-08 20:50:10
 */
export default function jump (target) {
  let { name, data, type, id } = target

  // 兼容老数据参数
  name = name || type

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
