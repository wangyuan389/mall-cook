<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-10 10:52:36
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-26 13:58:36
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