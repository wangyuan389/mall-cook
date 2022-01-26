/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-26 20:10:58
 */
export default function jump (target) {
  let { name, data } = target

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
    case 'goods':
      uni.navigateTo({
        url: `/pages/index/goods?id=${data.id}`
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
  }
}
