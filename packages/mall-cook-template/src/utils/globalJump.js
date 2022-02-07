/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-07 10:14:36
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
  }
}
