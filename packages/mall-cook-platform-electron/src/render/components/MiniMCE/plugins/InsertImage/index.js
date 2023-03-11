import Component from './index.vue'
import Vue from 'vue'
//import store from '@/store'

function mount (props) {
  const el = document.createElement('div')

  const Constructor = Vue.extend({
    render: h => h(Component, { props }),
    //store,
  })

  const vm = new Constructor({
    el,
  })

  vm.$mount(document.body)

  return vm
}

export default mount
