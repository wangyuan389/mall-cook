<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-12-15 16:31:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-12-15 16:38:52
-->
<template>
  <img
    src="http://110.42.184.128:8090/img/1639557056903.png"
    @click="toGit"
  />
</template>

<script>
export default {
  name: "GitControl",
  methods: {
    toGit() {
      console.log("toGit");

      window.open("https://github.com/wangyuan389/mall-cook", "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  margin-right: 15px;
  cursor: pointer;
}
</style>