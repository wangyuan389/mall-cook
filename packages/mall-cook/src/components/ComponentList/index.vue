<!--
 * @Description: 物料列表 （可拖拽）
 * @Autor: WangYuan
 * @Date: 2021-05-19 10:41:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-09 15:45:36
-->

<template>
  <div class="w-100 h-100 p16 bg-white">
    <ul class="flex flex-wrap">
      <li
        v-for="(item, index) in $initializing"
        :key="index"
        class="item"
        :data-component="item.component"
        draggable
        @dragstart="handleDragStart"
        @dragend="dragEnd"
      >
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['curPage', 'dragComponent']),
    componentList () {
      return this.curPage.componentList
    }
  },

  methods: {
    ...mapMutations(['setDragComponent', 'setDragStatus']),

    // 拖拽开始
    handleDragStart (e) {
      this.setDragStatus(true)
      let cmp = this.$getNewComponent(e.target.dataset.component)
      this.setDragComponent(cmp)
    },

    // 拖拽结束
    dragEnd () {
      this.componentList.map((item, index) => {
        if (item.type == 'waiting') {
          this.componentList.splice(index, 1, this.dragComponent)
        }
      })

      this.setDragComponent(null)
      this.setDragStatus(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px; /*no*/
  margin-bottom: 8px; /*no*/
  padding: 10px 0; /*no*/
  font-size: 12px; /*no*/
  color: #666;

  i {
    font-size: 29px; /*no*/
    margin-top: 5px; /*no*/
    margin-bottom: 10px; /*no*/
  }

  &:hover {
    color: #fff;
    background: $color-theme;
  }
}
</style>
