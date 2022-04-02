<!--
 * @Description: 模板选择容器组件
 * @Autor: WangYuan
 * @Date: 2021-05-31 11:54:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 20:03:21
-->
<template>
  <div
    class="select"
    :class="[direction=='column' ? 'flex-column' : '']"
  >
    <ul
      class="select-label"
      :class="[direction=='column' ? 'mb15' : '']"
    >
      <li class="select-label-text">{{label}}</li>
      <li class="f14">
        {{getLabel(value)}}
      </li>
    </ul>

    <div class="select-body">
      <select-item
        v-for="(item,index) in data"
        :key="item.id || index"
        v-bind="item"
      ></select-item>
    </div>

    <!-- <config-item :label='label'>
      <div
        class="mode-select"
        :class="[direction=='column' ? 'flex-column' : '']"
      >
        <div class="mode-select-label">
          {{data.find(v=>v.value==value).label}}
        </div>


      </div>
    </config-item> -->
  </div>
</template>

<script>
import schemaMixin from "@/mixin/schemaMixin";
import SelectItem from "./SelectItem";

export default {
  name: "SchemaSelect",

  components: {
    SelectItem,
  },

  mixins: [schemaMixin],

  provide() {
    return {
      mode: this,
    };
  },

  props: {
    value: {
      default: 0,
    },
    data: {
      type: Array,
    },
  },

  computed: {
    direction() {
      return this.data.length > 3 ? "column" : "row";
    },
  },

  methods: {
    getLabel(value) {
      return this.data.find((v) => v.value == value)?.label || "暂无匹配";
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #fff;

  .select-label {
    display: flex;
    align-items: center;

    .select-label-text {
      width: 70px;
      color: #969799;
      font-size: 13px;
    }
  }

  .select-body {
    display: flex;
    flex-wrap: wrap;
  }
}

.mode-select {
  display: flex;
  justify-content: space-between;

  .mode-select-label {
    font-size: 14px; /*no*/
    line-height: 32px; /*no*/
  }

  .mode-select-body {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>