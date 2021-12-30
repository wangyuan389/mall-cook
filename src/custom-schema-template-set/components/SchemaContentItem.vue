<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-14 09:45:07
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-15 14:10:09
-->
<template>
  <draggable
    v-model="list"
    group="itxst"
    ghostClass="ghost"
    chosenClass="chosen"
    selector="selector"
    :animation="500"
    :sort="true"
    :class="[isChild ? 'drag-child' : 'drag-area']"
  >
    <schema-content-shape v-for="item in list" :key="item.id" :data="item">
      <component
        :is="item.component"
        :component-key="item.id"
        :edit="true"
        v-bind="item"
        :class="[['object', 'array'].includes(item.type) ? '' : 'event-none']"
      >
        <schema-content-item
          :componentList.sync="item.child"
          :isChild="true"
        ></schema-content-item>
      </component>
    </schema-content-shape>
  </draggable>
</template>

<script>
import SchemaContentShape from './SchemaContentShape'

export default {
  name: 'SchemaContentItem',

  components: {
    SchemaContentShape
  },

  props: {
    isChild: {
      type: Boolean,
      default: false
    },
    componentList: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      list: []
    }
  },

  watch: {
    componentList: {
      handler (val) {
        this.list = val
      },
      immediate: true,
      deep: true
    },
    list: {
      handler (val) {
        console.log('....change list')
        this.$emit('update:componentList', val)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-area {
  min-height: 600px;
}
.drag-child {
  min-height: 50px;
  //   padding: 10px;
  background: #f5f5f5;
}

.ghost {
  pointer-events: none;
}

.event-none {
  pointer-events: none;
}
</style>
