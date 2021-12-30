<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-12 17:58:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-12 17:16:36
-->
<template>
  <div class="canvas">
    <!-- centet -->
    <div class="canvas-center">
      <div class="canvas-center-drag">
        <schema-content-item
          :componentList.sync="content.model.componentList"
        ></schema-content-item>

        <!-- 组件设置 -->
        <el-tooltip effect="light" content="组件设置" placement="bottom">
          <div
            class="canvas-center-drag-set flex-center"
            @click="content.curComponent = null"
          >
            <i class="el-icon-setting"></i>
          </div>
        </el-tooltip>
      </div>
    </div>

    <!-- left -->
    <div class="canvas-left">
      <draggable
        v-model="$cmpConfig"
        :options="{ group: { name: 'itxst', pull: 'clone' }, sort: false }"
        :clone="handleClone"
        animation="300"
      >
        <div
          v-for="(item,index) in $cmpConfig"
          :key="index"
          class="canvas-left-item"
        >
          <span class="f13">{{ item.label }}</span>
          <span class="canvas-left-item-type">{{ item.type }}</span>
        </div>
      </draggable>
    </div>

    <!-- right -->
    <div class="canvas-right">
      <component
        v-if="content.curComponent"
        :is="curComponentConfig"
        v-bind="content.curComponent"
      ></component>
      <schema-component v-else></schema-component>
    </div>
  </div>
</template>

<script>
import SchemaContentShape from './SchemaContentShape.vue'
import SchemaContentItem from './SchemaContentItem'

export default {
  components: {
    SchemaContentItem,
    SchemaContentShape
  },

  inject: ['content'],

  computed: {
    curComponentConfig () {
      return `${this.content?.curComponent?.component}Config`
    }
  },

  methods: {
    handleClone (e) {
      return {
        ...this.$cloneDeep(e),
        id: this.$getRandomCode(8),
        property: `${e.type}_${this.$getRandomCode(2, false)}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  height: 100%; /*no*/
  padding-left: 200px; /*no*/
  padding-right: 300px; /*no*/
  background: #f7f8fa;
  border: solid 1px #e4e7ed;

  .canvas-left {
    float: left;
    width: 200px; /*no*/
    height: 100%; /*no*/
    margin-left: -100%; /*no*/
    padding: 0 10px;
    position: relative;
    left: -200px; /*no*/
    background: #fff;

    .canvas-left-item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 90px; /*no*/
      padding: 15px 0; /*no*/
      font-size: 12px; /*no*/
      color: #666;
      cursor: pointer;

      .canvas-left-item-type {
        margin-top: 10px;
        color: #c1c5d1;
      }

      i {
        font-size: 29px; /*no*/
        margin-top: 5px; /*no*/
        margin-bottom: 10px; /*no*/
      }

      &:hover {
        color: #fff !important;
        background: $color-theme;
        .canvas-left-item-type {
          color: #fff;
        }
      }
    }
  }

  .canvas-center {
    position: relative;
    float: left;
    width: 100%; /*no*/
    height: 100%; /*no*/
    overflow: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .canvas-center-drag {
      width: 360px; /*no*/
      background: #fff;
      margin: 20px auto; /*no*/
      box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1); /*no*/
      min-height: 600px; /*no*/

      .canvas-center-drag-set {
        position: absolute;
        top: 40px;
        left: 450px;
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
  }

  .canvas-right {
    float: left;
    width: 300px; /*no*/
    height: 100%; /*no*/
    margin-left: -300px; /*no*/
    position: relative;
    left: 300px; /*no*/
    background: #fff;
  }
}

.ghost {
  position: relative;
  width: 100%;
  height: 40px; /*no*/

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/image/ghost.jpg');
    z-index: 10000;
  }

  &::after {
    content: '组件放置区域';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 30px;
    line-height: 30px;
    background: #5487df;
    font-size: 12px /*no*/;
    color: #fff;
    text-align: center;
    pointer-events: none;
    z-index: 100001;
  }
}

.selector {
  display: none;
}

.event-none {
  // pointer-events: none;
  padding: 0 20px;
}
</style>
