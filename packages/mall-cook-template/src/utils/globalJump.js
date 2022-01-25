/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:07:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-25 15:17:29
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
  }
}
