import Vue from 'vue'
import component from './index.vue'

let instance

function init (options) {
  return new Promise((resolve, reject) => {
    const Constructor = Vue.extend({
      render: h => h(component)
    })

    instance = new Constructor({
      el: document.createElement('div'),
      mounted () {
        resolve(this)
      },
      destroyed () {
        reject(this)
      },
      ...options,
    })

    instance.$mount(document.body)
  })
}

function open (options) {
  options && Object.assign(instance.$children[0], options)
  instance.$children[0].show = true
}

export { init, open }
