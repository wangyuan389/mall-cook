<!--
 * @Description: 公告组件
 * @Autor: WangYuan
 * @Date: 2021-06-10 10:52:36
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 11:38:22
-->
<template>
  <div>
    <van-notice-bar
      :text="value.text"
      v-bind="getCmpStyle()"
      left-icon="volume-o"
    >
      <template
        v-if="value.image"
        slot='left-icon'
      >
        <van-image
          width="30"
          height="30"
          :src="value.image"
        />
      </template>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  name: "McNotice",

  props: {
    styles: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  
  methods: {
    getCmpStyle() {
      return {
        background: this.styles.cmpBackground,
        color: this.styles.fontColor,
      };
    },
  },
};
</script>