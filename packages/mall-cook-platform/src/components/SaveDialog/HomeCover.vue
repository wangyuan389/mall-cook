<!--
 * @Description: 首页封面
 * @Autor: WangYuan
 * @Date: 2021-09-27 17:45:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-26 11:05:40
-->
<template>
  <el-dialog
    :visible.sync="show"
    :append-to-body="true"
    :show-close="false"
    :close-on-click-modal="false"
    top="50px"
    width="415px"
    class="flex-center"
  >
    <div v-loading="show">
      <div id="cover" class="cover">
        <component
          v-for="item in home.componentList"
          :key="item.id"
          :is="item.component"
          v-bind="item"
        ></component>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import domtoimage from 'dom-to-image'
import { uploadCover } from '@/api/project'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeCover',

  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapGetters(['project']),
    home () {
      return this.project.pages.find(page => page.home)
    }
  },

  methods: {
    open () {
      return new Promise((resolve, reject) => {
        this.show = true
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },

    // 创建封面，并且返回
    async createCover () {
      await this.open()

      let node = document.getElementById('cover')
      let base64 = await domtoimage.toPng(node)
      let url = await this.upload(base64)

      this.show = false
      return url
    },

    // 上传封面
    upload (base64) {
      return new Promise((resolve, reject) => {
        let coverFile = this.getFile(base64)
        let formData = new FormData()
        formData.append('domainId', 3)
        formData.append('dir', 'img')
        formData.append('file', coverFile)

        // 图片上传服务器
        uploadCover(formData).then(res => {
          if ((res.errorCode = '00000')) {
            console.log('图片上传服务器成功')
            resolve(res.data)
          }
        })
      })
    },

    // base64整合文件
    getFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover {
  width: 375px;
  min-height: 667px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
