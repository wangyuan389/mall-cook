<!-- eslint-disable vue/one-component-per-file -->
<script>
import Vue from 'vue'
// import presets from '../../Upload/presets'

const presets = {}

let vm

function createInitialFormData() {
  return {
    image: undefined,
    cover: undefined,
    video: undefined,
    audio: undefined,
  }
}

export default {
  async init(props) {
    const container = document.createElement('div')
    const Constructor = Vue.extend({
      render: h => h(this, { props }),
      // store,
    })
    vm = new Constructor({ el: container })
    vm.$mount(document.body)
  },
  open(data) {
    Object.assign(vm.$children[0], {
      show: true,
      ...data,
    })
  },
  props: {
    editor: {
      required: true,
    },
  },
  data() {
    return {
      presets,
      show: false,
      type: null,
      formData: createInitialFormData(),
    }
  },
  expose: ['show', 'type'],
  methods: {
    confirm() {
      let content = ''
      switch (this.type) {
        case '图片':
          (Array.isArray(this.formData.image) ? this.formData.image : [this.formData.image]).forEach((v) => {
            content += `<img src=${v}>`
          })
          break
        case '视频':
          (Array.isArray(this.formData.video) ? this.formData.video : [this.formData.video]).forEach((v) => {
            content += `<video controls src="${v}"></video>`
          })
          break
        default:
          content = `<audio controls src="${this.formData.audio}"></audio>`
      }
      this.editor.insertContent(content)
    },
    onClosed() {
      this.formData = createInitialFormData()
      this.type = null
    },
  },
}
</script>

<template>
  <FaFormDialog
    v-model:show="show"
    v-model="formData"
    :show.sync="show"
    :title="`插入${type}`"
    append-to-body
    :confirm="confirm"
    @closed="onClosed"
  >
    <el-form-item
      v-if="type === '图片'"
      prop="image"
      :rules="{ required: true, message: '必填项' }"
    >
      <FaImageUpload v-model="formData.image" />
    </el-form-item>
    <el-form-item
      v-else-if="type === '视频'"
      prop="file"
      :rules="{ required: true, message: '必填项' }"
    >
      <FaUpload
        v-model="formData.file"
        v-bind="presets.audio"
      />
    </el-form-item>
    <template v-else-if="type === '音频'">
      <el-form-item
        label="封面"
        prop="cover"
        :rules="{ required: true, message: '必填项' }"
      >
        <FaImageUpload
          v-model="formData.cover"
          :maxCount="1"
        />
      </el-form-item>
      <el-form-item
        label="文件"
        prop="file"
        :rules="{ required: true, message: '必填项' }"
      >
        <FaUpload
          v-model="formData.file"
          v-bind="presets.video"
        />
      </el-form-item>
    </template>
  </FaFormDialog>
</template>
