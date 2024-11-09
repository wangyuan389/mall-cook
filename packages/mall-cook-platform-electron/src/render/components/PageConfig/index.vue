<!--
 * @Description: 页面配置
 * @Autor: WangYuan
 * @Date: 2021-09-22 17:33:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-18 16:10:43
-->
<template>
  <div class="p10">
    <config-item label='背景色'>
      <config-color-picker v-model="project.config.backgroundColor"></config-color-picker>
    </config-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PageConfig",
  computed: {
    ...mapGetters(["project"]),
  },
};
</script>