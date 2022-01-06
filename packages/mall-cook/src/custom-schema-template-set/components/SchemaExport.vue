<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-18 10:07:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-11-15 14:21:39
-->
<template>
  <el-dialog title="导出" :visible.sync="show" width="40%">
    <div>
      <template v-if="isComplete">
        <h3 class="mb20 f13 f-grey">
          组件配置项schema，放在组件包下 schema.json
          配置文件中，若不满足可手动修改
        </h3>
        <json-viewer
          v-model="config"
          :expand-depth="6"
          :copyable="{
            copyText: '复制JSON',
            copiedText: '已复制',
            timeout: 1000
          }"
          boxed
        ></json-viewer>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  components: {
    JsonViewer
  },

  data () {
    return {
      show: false,
      isComplete: false,
      config: {},
      initializing: {}
    }
  },

  inject: ['content'],

  watch: {
    show: {
      immediate: true,
      handler () {
        if (this.show) {
        } else {
          this.config = {}
          this.isComplete = false
        }
      }
    }
  },

  methods: {
    open () {
      this.show = true
      this.init()
    },

    init () {
      this.config = {
        label: this.content.model.label,
        icon: this.content.model.icon,
        fields: {}
      }
      this.content.model.componentList.map(cmp => {
        this.initFields(cmp, this.config.fields)
      })
      this.isComplete = true
    },

    initFields (config, fields) {
      let { property, label, type, child, value, data, options } = config
      let target = (fields[property] = ['object', 'array'].includes(type)
        ? { label, type }
        : { label, type, value })

      data && (target.data = data)
      options && (target.options = options)

      if (child) {
        target.child = {}
        child.map(c => this.initFields(c, target.child))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .jv-button {
  margin-top: 10px;
  color: $color-theme !important;
}

textarea {
  display: inline-block;
  width: 100%;
  height: 500px;
  margin: 0 auto;
  padding: 20px;
  border: solid 1px #c0c0c0;
}
</style>
