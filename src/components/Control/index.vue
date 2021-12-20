<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-20 15:16:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-20 20:35:03
-->
<template>
  <div class="control">
    <!-- 物料列表 -->
    <div class="control-models">
      <draggable
        v-model="models"
        :options="{ group: { name: 'itxst', pull: 'clone' }, sort: false }"
        :clone="handleClone"
        animation="300"
      >
        <div
          v-for="(item, index) in models"
          :key="index"
          class="control-models-item"
        >
          <i class="iconfont" :class="item.icon"></i>
          <span class="f13">{{ item.label }}</span>
        </div>
      </draggable>
    </div>

    <!-- 页面面板 -->
    <div class="control-page">
      <div class="panel">
        <div class="panel-content">
          <!-- 可根据实际需求选择是否需要物料组件 -->

          <!-- 不可嵌套物料 -->
          <!-- <ControlWidget :widgets.sync="widgets" /> -->

          <!-- 递归可嵌套物料 -->
          <ControlNestWidget :widgets.sync="widgets" />
        </div>
      </div>
    </div>

    <!-- 物料配置 -->
    <div class="control-config">
      <div>物料配置</div>
      <div>{{ curComponent }}</div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Control",

  components: {
    draggable,
  },

  provide() {
    return {
      chontrol: this,
    };
  },

  data() {
    return {
      widgets: [],
      curComponent: undefined,
      models: [
        {
          label: "图片",
          component: "McImg",
          icon: "icon-image",
        },
        {
          label: "容器",
          component: "McContainer",
          icon: "icon-image",
          children: [],
        },
      ],
    };
  },

  methods: {
    // 复制物料
    handleClone(model) {
      return {
        ...this._.cloneDeep(model),
        id: this.$getRandomCode(8),
      };
    },

    // 选中物料
    setItem(item) {
      this.curComponent = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  height: calc(100vh - 60px);

  .control-models {
    width: 236px;
    height: calc(100vh - 60px);
    padding: 10px 20px;
    background: #fff;

    .control-models-item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 90px; /*no*/
      padding: 15px 0; /*no*/
      font-size: 12px; /*no*/
      color: #666;
      cursor: pointer;

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

  .control-page {
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
    overflow: auto;

    .panel {
      width: 100%;
      max-width: 900px;

      .panel-content {
        width: 375px;
        margin: 50px auto;
        background: #fff;
        box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .control-config {
    width: 265px;
    height: calc(100vh - 60px);
    animation-duration: 0.2s;
    padding: 10px;
    background: #fff;
  }
}
</style>