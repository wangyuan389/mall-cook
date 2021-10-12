<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-08 16:29:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-12 10:15:29
-->
<template>
  <div class="wrap">
    <schema-group></schema-group>
  </div>
</template>

<script>
import SchemaGroup from "./components/SchemaGroup.vue";
export default {
  name: "custom-schema-template-set",

  components: {
    SchemaGroup,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;
}
</style>