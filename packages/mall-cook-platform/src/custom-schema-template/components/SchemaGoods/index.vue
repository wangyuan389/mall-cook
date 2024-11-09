<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-08 15:37:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-25 16:19:21
-->
<template>
  <config-item :label="label">
    <GoodsConfigList :value="mValue" @edit="edit"></GoodsConfigList>

    <GoodsConfigChoose
      v-if="show"
      :show.sync="show"
      :value="mValue"
      @submit="replace"
    >
    </GoodsConfigChoose>
  </config-item>
</template>

<script>
import ConfigItem from '../../../components/global/ConfigItem.vue'
import schemaMixin from '@/mixin/schemaMixin'

export default {
  name: 'SchemaGoods',

  components: { ConfigItem },

  mixins: [schemaMixin],

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      show: false,
      mValue: []
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (newValue, oldValue) {
        this.mValue = newValue
      }
    },

    mValue: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.$emit('input', newValue)
      }
    }
  },

  methods: {
    edit (item) {
      this.show = true
    },

    replace (ids) {
      this.mValue = ids
    }
  }
}
</script>

<style lang="scss" scoped></style>
