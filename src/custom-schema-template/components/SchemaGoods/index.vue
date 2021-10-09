<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-08 15:37:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-08 16:09:41
-->
<template>
  <div>
    <GoodsConfigList
      :value='mValue'
      @edit='edit'
    ></GoodsConfigList>

    <GoodsConfigChoose
      v-if="show"
      :show.sync='show'
      :value="mValue"
      @submit="replace"
    >
    </GoodsConfigChoose>
  </div>
</template>

<script>
export default {
  name: "SchemaGoods",

  props: {
    value: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      show: false,
      mValue: [],
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },

    mValue: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },

  methods: {
    edit(item) {
      this.show = true;
    },

    replace(ids) {
      this.mValue = ids;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>