<!--
 * @Description: 图片组件
 * @Autor: WangYuan
 * @Date: 2021-05-21 19:13:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-24 11:02:23
-->
<template>
  <img
    class="img"
    :src="value.path || defaultUrl"
    alt=""
  >
</template>

<script>
import componentMixin from "@/mixin/componentMixin";

export default {
  name: "McImg",
  mixins: [componentMixin],
  data() {
    return {
      defaultUrl:
        "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
    };
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
}
</style>