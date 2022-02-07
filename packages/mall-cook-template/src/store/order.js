/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-02-07 09:50:30
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-07 14:21:03
 */
import Vue from 'vue'
import user from './user'

export default {
  state: {
    order: {}, // 订单        模拟真实下单流程
    orderList: [], // 订单列表    模拟真实订单数据
    carList: [], // 购物车列表
    addressList: [] // 地址列表    模拟真实地址数据
  },
  getters: {
    order: state => state.order,
    orderList: state => state.orderList,
    carList: state => {
      console.log(state.carList)
      return state.carList
    },
    addressList: state => state.addressList
  },
  mutations: {
    // 添加购物车
    pushCarList (state, goods) {
      // 未登录，需先登录
      if (!user.state.token) {
        uni.showToast({
          title: '请先进行登录',
          duration: 500
        })
        Vue.prototype.$jump({ name: 'login' })
        return
      }

      let { id, name, cover, price } = goods
      let temp = state.carList.find(item => item.id == id)
      if (temp) {
        // 购物车已有此商品，数量加一
        temp.num++
      } else {
        // 购物车没有此，增加此商品
        state.carList.push({ id, name, cover, price, num: 1, selected: true })
      }
      uni.showToast({
        title: '加入购物车成功',
        duration: 500
      })
    },

    // 重置订单
    resetOrder (state, order) {
      let temp = {
        goodsList: [],
        total: 0,
        address: {}
      }

      state.order = { ...temp, ...order }
    },

    // 选中订单地址
    selectedAddress (state, address) {
      state.order.address = address
    },

    // 添加地址
    addAddress (state, address) {
      address.id = Vue.prototype.$getRandomCode(4)
      address.address = address.addressDetail
      state.addressList.push(address)
    },

    // 编辑地址
    editAddress (state, data) {
      let { oldAds, newAds } = data
      newAds.address = newAds.addressDetail
      // 找到目标id对应下标
      let index = state.addressList.reduce((pre, cur, i) => {
        if (cur.id == oldAds.id) pre = i
        return pre
      }, 0)
      state.addressList.splice(index, 1, newAds)
    },

    // 删除地址
    delAddress (state, id) {
      // 找到目标id对应下标
      let index = state.addressList.reduce((pre, cur, i) => {
        if (cur.id == id) pre = i
        return pre
      }, 0)

      // 如果删除选中地址，则删除订单中选中地址
      if (state.order.addAddress?.id == id) state.order.addAddress = {}

      state.addressList.splice(index, 1)
    },

    // 模拟提交订单
    submitOrder (state, order) {
      if (state.orderList.find(item => item.id == order.id)) {
        // Toast('此订单已经提交，请勿重复提交')
        return
      }

      if (!order.address?.id) {
        // Toast('请填写发货地址')
        return
      }

      order.status = 1
      state.orderList.push(order)

      // 如果从购物车购买，删除已下单商品
      if (order.source == 'car')
        state.carList = state.carList.filter(item => !item.selected)

      router.push({ name: 'order-pay', query: { orderId: order.id } })
    },

    // 模拟订单支付
    payOrder (state, orderId) {
      let order = state.orderList.find(item => item.id == orderId)
      order.status = 2
    }
  }
}
