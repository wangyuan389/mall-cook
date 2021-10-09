<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-08 16:29:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-09 10:37:42
-->
<template>
  <div class="wrap">
    <div class="wrap-content">
      <schema-edit></schema-edit>
    </div>
  </div>
</template>

<script>
import SchemaEdit from "./components/SchemaEdit.vue";
export default {
  name: "custom-schema-template-set",

  components: {
    SchemaEdit,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;

  .wrap-content {
    width: 100%;
    height: 50px;
    background: #ccc;
  }
}
</style>