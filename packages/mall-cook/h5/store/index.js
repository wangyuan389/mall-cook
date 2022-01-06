/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-07-05 17:39:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-29 16:52:53
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import router from '../router';
// import { Toast } from 'vant'
import { getAuthToken, setAuthToken } from '../utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    
    state: {
        projectId: Cookies.get('projectId'),
        project: {},
        order: {},          // 订单        模拟真实下单流程
        orderList: [],      // 订单列表    模拟真实订单数据
        carList: [],        // 购物车列表
        addressList: [],    // 地址列表    模拟真实地址数据
        token: getAuthToken(),          // 模拟真实登录
        loading: false,     // 页面加载loading
    },

    getters: {
        token: state => state.token,
        projectId: state => state.projectId,
        project: state => state.project,
        order: state => state.order,
        orderList: state => state.orderList,
        carList: state => state.carList,
        addressList: state => state.addressList,
        loading: state => state.loading,
    },

    mutations: {
        // 设置token
        setToken(state, token) {
            setAuthToken(token)
            state.token = token
        },

        // 设置项目id
        setProjectId(state, projectId) {
            if (projectId) {
                Cookies.set('projectId', projectId)
                state.projectId = projectId
            }
        },

        // 设置项目
        setProject(state, project) {
            state.project = project
        },

        // 控制loading显影
        setLoading(state, status) {
            state.loading = status
        },

        // 添加购物车
        pushCarList(state, goods) {
            // 未登录，需先登录
            if (!state.token) {
                router.push({ name: 'login' })
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
            // Toast('已加入购物车');
        },

        // 重置订单
        resetOrder(state, order) {
            let temp = {
                goodsList: [],
                total: 0,
                address: {},
            }

            state.order = { ...temp, ...order }
        },

        // 选中订单地址
        selectedAddress(state, address) {
            state.order.address = address
        },

        // 添加地址
        addAddress(state, address) {
            address.id = Vue.prototype.$getRandomCode(4)
            address.address = address.addressDetail
            state.addressList.push(address)
        },

        // 编辑地址
        editAddress(state, data) {
            let { oldAds, newAds } = data
            newAds.address = newAds.addressDetail
            // 找到目标id对应下标
            let index = state.addressList.reduce((pre, cur, i) => {
                if (cur.id == oldAds.id)
                    pre = i
                return pre
            }, 0)
            state.addressList.splice(index, 1, newAds)
        },

        // 删除地址
        delAddress(state, id) {
            // 找到目标id对应下标
            let index = state.addressList.reduce((pre, cur, i) => {
                if (cur.id == id)
                    pre = i
                return pre
            }, 0)

            // 如果删除选中地址，则删除订单中选中地址
            if (state.order.addAddress?.id == id)
                state.order.addAddress = {}

            state.addressList.splice(index, 1)
        },

        // 模拟提交订单
        submitOrder(state, order) {
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

            router.push({ name: "order-pay", query: { orderId: order.id } });
        },

        // 模拟订单支付
        payOrder(state, orderId) {
            let order = state.orderList.find(item => item.id == orderId)
            order.status = 2
        }
    }
})