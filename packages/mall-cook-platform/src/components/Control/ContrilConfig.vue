<template>
  <div class="Config">
    <DecorateCtn
      v-if="control.curComponent"
      :title="control.curComponent.label"
    >
      <custom-schema-template
        :schema="curSchema"
        v-model="control.curComponent"
      ></custom-schema-template>
    </DecorateCtn>

    <DecorateCtn v-else title="页面配置">
      <page-config></page-config>
    </DecorateCtn>
  </div>
</template>

<script>
import DecorateCtn from "@/components/Container/DecorateCtn";
export default {
  components: {
    DecorateCtn,
  },
  
  inject: ["control"],

  computed: {
    curSchema() {
      return this.$fields[this.control.curComponent.component];
    },
  },
};
</script>

<style lang='scss'>
</style>