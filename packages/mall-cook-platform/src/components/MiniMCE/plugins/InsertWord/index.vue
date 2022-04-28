<template>
  <el-dialog
    :visible="show"
    title="插入 Word 文档"
    append-to-body
    destroy-on-close
    :close-on-click-modal="false"
    @close="show=false"
  >
    <el-upload
      drag
      action=""
      multiple
      :auto-upload="false"
      :on-change="onChange"
      :on-remove="onRemove"
      style="width:100%;"
      ref="elUploadRef"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将 docx 文件拖到此处，或<em>点击上传</em></div>
    </el-upload>

    <template #footer>
      <el-button @click="show=false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="loading" :disabled="!files.length">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import mammoth from 'mammoth/mammoth.browser.min.js'

export default {
  props: {
    editor: {
      required: true,
    }
  },
  data () {
    return {
      show: false,
      files: [],
      loading: false,
      allSettled: true,
    }
  },
  watch: {
    show (n) {
      if (!n) {
        this.$nextTick(() => {
          this.files = []
        })
      }
    }
  },
  methods: {
    open () {
      this.show = true
    },
    onChange (file, fileList) {
      this.files = Array.from(fileList, ({ raw }) => raw)
    },
    onRemove (file, fileList) {
      this.files = Array.from(fileList, ({ raw }) => raw)
    },
    async onSubmit () {
      this.loading = true
      const results = await Promise.allSettled(this.files.map(v =>
        new Promise((resolve, reject) => {
          if (!v.name.endsWith('.docx')) {
            reject('仅支持 docx 格式')
          }

          const reader = new FileReader()
          reader.onload = async e => {
            const arrayBuffer = e.target.result
            if (arrayBuffer.byteLength) {
              mammoth.convertToHtml({ arrayBuffer }).then(res => {
                const { messages, value } = res
                console.log(`${v.name} 解析结果：`, res)
                if (value) {
                  resolve(value)
                } else {
                  reject(`${v.name} 内容为空`)
                }
              }).catch(err => {
                reject(err)
              })
            } else {
              reject(`${v.name} 内容为空`)
            }
          }
          reader.readAsArrayBuffer(v)
        })
      ))

      results.map(result => {
        const { status, value, reason } = result
        if (status === 'fulfilled') {
          this.editor.insertContent(value)
        } else {
          if (reason) {
            console.error(reason)
            this.$message.error(typeof reason === 'string' ? reason : '解析失败')
          }
          this.allSettled = false
        }
      })

      this.files = []
      this.$refs.elUploadRef.clearFiles()
      this.loading = false
      if (this.allSettled) {
        this.show = false
      }
      this.allSettled = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  min-width: 600px;

  & > .el-dialog__body {
    display: flex;
    justify-content: center;

    .el-upload {
      width: 100%;

      & > .el-upload-dragger {
        width: 100%;

        .el-upload__text {
          display: block !important;
        }
      }
    }

    .el-upload-list__item {
      width: initial !important;
      height: initial !important;
    }
  }
}
</style>
