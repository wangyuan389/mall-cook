<!--
 * @Description: 拖拽画板
 * @Autor: WangYuan
 * @Date: 2021-05-21 18:19:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-20 20:52:13
-->
<template>
  <div
    class="editor"
    :style="{ backgroundColor: project.config.backgroundColor }"
    type="page"
    @dragover="fn"
    @drop="drog"
  >
    <!-- 可拖拽列表 -->
    <draggable v-model="curPage.componentList">
      <template v-for="(item, index) in curPage.componentList">
        <div :key="index" :data-index="index" type="item">
          <!-- waiting -->
          <div
            v-if="item.type == 'waiting'"
            class="waiting-ctn flex-center"
            type="waiting"
          >
            <div class="waiting-text">组件放置区域</div>
          </div>

          <!-- component -->
          <template v-else>
            <shape type="item" :data="item" :data-index="index">
              <div :class="[dragComponent ? 'event-none' : '']">
                <component :is="item.component" v-bind="item"></component>
              </div>
            </shape>
          </template>
        </div>
      </template>
    </draggable>

    <!-- 页面设置 -->
    <el-tooltip effect="light" content="页面设置" placement="bottom">
      <div class="editer-page flex-center" @click="setcurComponent(null)">
        <i class="el-icon-setting"></i>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import Shape from './Shape'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'editor',
  components: {
    Shape
  },

  data () {
    return {
      watingIndex: 0,
      fn: this.throttle(this.moveComponent, 1) // 移动节流控制
    }
  },

  computed: {
    ...mapGetters(['project', 'curPage', 'dragComponent', 'dragStatus']),
    componentList () {
      return this.curPage.componentList
    }
  },

  methods: {
    ...mapMutations(['setDragComponent', 'setDragStatus', 'setcurComponent']),

    // 节流
    throttle (fn, delay) {
      let prev = Date.now()

      return function () {
        let now = Date.now()
        let args = arguments
        if (now - prev > delay) {
          fn(...args)
          prev = Date.now()
        }
      }
    },

    // 拖拽移动组件中
    moveComponent (e) {
      e.preventDefault()
      e.stopPropagation()

      let type = e.target.getAttribute('type')
      let waitingModel = {
        type: 'waiting'
      }

      if (type == 'waiting') return

      let haveWaiting = this.componentList.find(item => item.type == 'waiting')

      // 移动至页面
      if (type == 'page') {
        if (this.dragStatus && !haveWaiting) {
          this.watingIndex = this.componentList.length
          this.componentList.push(waitingModel)
        }
      }

      // 移动至组件
      if (type == 'item') {
        let target = e.target
        let [y, h, curIndex] = [
          e.offsetY,
          target.offsetHeight,
          target.dataset.index
        ]
        let direction = y < h / 2

        if (!haveWaiting) {
          // 没有waiting模块,创建waiting
          if (direction) {
            if (curIndex == 0) {
              this.componentList.unshift(waitingModel)
            } else {
              this.componentList.splice(curIndex, 0, waitingModel)
            }
          } else {
            curIndex = +curIndex + 1
            this.componentList.splice(curIndex, 0, waitingModel)
          }
        } else {
          // 已有waiting模块，移动waiting
          let isWaiting
          if (direction) {
            let i = curIndex == 0 ? 0 : curIndex - 1
            isWaiting = this.componentList[i].type == 'waiting'
          } else {
            let i = +curIndex + 1
            isWaiting =
              this.componentList.length > i &&
              this.componentList[i].type == 'waiting'
          }

          if (isWaiting) return

          const temp = this.componentList.splice(this.watingIndex, 1)
          this.componentList.splice(curIndex, 0, temp[0])
        }

        this.watingIndex = curIndex
      }
    },

    // 拖拽组件结束
    drog (e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  width: 100%;
  min-height: 603px /*no*/;
  background: #f7f8fa;

  .editer-page {
    position: absolute;
    top: -50px;
    left: -80px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    i {
      font-size: 22px;
      color: #b0afb2;
    }
  }
}

.waiting-ctn {
  width: 100%;
  height: 40px /*no*/;
  background-image: url('./image/bg.jpg');

  .waiting-text {
    padding: 8px 30px /*no*/;
    background: #5487df;
    color: #fff;
    font-size: 12px /*no*/;
    pointer-events: none;
  }
}

.event-none {
  pointer-events: none;
}
</style>
