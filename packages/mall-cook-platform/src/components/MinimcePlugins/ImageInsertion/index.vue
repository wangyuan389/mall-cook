<template>
  <el-dialog
    :visible="show"
    title="插入图片"
    :append-to-body="true"
    :close-on-click-modal="false"
    destroy-on-close
    @close="show = false"
  >
    <el-form ref="formRef" :model="formData">
      <el-form-item
        prop="src"
        :rules="{ required: true, message: '必填项' }"
      >
        <Imgpond v-model="formData.src" valueType="array"/>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import 'imgpond/dist/style.css'
import Imgpond from 'imgpond'
import { eventBus } from '@/main'

export default {
  components: { Imgpond },
  /*props: {
    show: Boolean,
  },*/
  data () {
    return {
      show: false,
      formData: {
        src: []
      }
    }
  },
  watch: {
    show: {
      handler (newVal, oldVal) {
        if (!newVal) {
          this.formData = {
            src: []
          }
        }
      },
    },
  },
  methods: {
    confirm () {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.formData.src.map(v => {
            eventBus.$emit('insertTag', `<img src=${v}>`)
          })
          this.show = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  min-width: 600px;
}
</style>
