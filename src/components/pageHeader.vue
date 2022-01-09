<template>
  <div class="page-head">
    <span>可视化搭建平台</span>
    <el-button size="small" @click="toSchema">schema 生成器</el-button>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  methods: {
    toSchema() {
      let { href } = this.$router.resolve({
        path: "/schema",
      });
      window.open(href);
    },
  },
};
</script>

<style>
.page-head {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(12, 31, 80, 0.04);
}
</style>