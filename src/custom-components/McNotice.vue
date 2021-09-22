<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-10 10:52:36
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 14:55:24
-->
<template>
  <div>
    <van-notice-bar
      :text="config.value"
      v-bind="getCmpStyle()"
      left-icon="volume-o"
    >
      <template
        v-if="style.iconImage"
        slot='left-icon'
      >
        <van-image
          width="100"
          height="30"
          :src="style.iconImage"
        />
      </template>
    </van-notice-bar>
  </div>
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McNotice",
  mixins: [componentMixin],
  data() {
    return {};
  },
  methods: {
    getCmpStyle() {
      return {
        background: this.style.cmpBackground,
        color: this.style.fontColor,
      };
    },
  },
};
</script>