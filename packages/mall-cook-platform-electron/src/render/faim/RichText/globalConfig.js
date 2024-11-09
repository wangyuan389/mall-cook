import Vue from 'vue'

// 浅色模式
import 'tinymce/skins/ui/oxide/skin.min.css' // 皮肤
import contentCSS from 'tinymce/skins/content/default/content.min.css?raw'
import contentUICSS from 'tinymce/skins/ui/oxide/content.min.css?raw'

// 深色模式
/* import 'tinymce/skins/ui/oxide-dark/skin.min.css' // 皮肤
import contentCSS from 'tinymce/skins/content/dark/content.min.css?raw'
import contentUICSS from 'tinymce/skins/ui/oxide-dark/content.min.css?raw' */

// 图标
import 'tinymce/icons/default/icons'

// 主题
import 'tinymce/themes/silver/theme'

// 语言（非必须，默认英文，下载地址：https://www.tiny.cloud/get-tiny/language-packages）
import './langs/zh-Hans'

// 自定义样式
import './index.scss'

// 自定义插件（非必须）
import InsertFile from './plugins/InsertFile.vue'
import InsertWord from './plugins/InsertWord'

// 官方插件（非必须）
/* if (import.meta.env.MODE === 'development') {
  await import('tinymce/plugins/code')
  await import('tinymce/plugins/codesample')
} */
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'

import global from '@/config/global'

/**
 * 自定义内容样式（非必须）
 * 该样式仅在生产侧有效，不包含在生成的 HTML 文本中
 * 可拷贝至展示侧使用
 */
const contentCustomCSS = `
  .mce-content-body {
    line-height: 1.8;
    overflow: auto;
  }
  p {
    margin-block-end: 0;
    margin-block-start: 0;
  }
  img {
    max-width: 100%;
    height: auto !important;
    vertical-align: middle;
  }
`

export default {
  language: 'zh-Hans',
  content_style: [contentCSS, contentUICSS, contentCustomCSS].join('\n'),
  plugins: `preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion
        ${process.env.NODE_ENV === 'development' ? ' code codesample' : ''}`,
  // https://www.tiny.cloud/docs/tinymce/6/menus-configuration-options/#example-the-tinymce-default-menu-items
  menu: {
    insert: {
      title: 'Insert',
      items: 'localimage localvideo localaudio docx | image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
    },
  },
  async setup(editor) {
    await InsertFile.init({ editor })
    editor.ui.registry.addMenuItem('localimage', {
      text: '本地图片',
      icon: 'image',
      onAction: () => {
        InsertFile.open({ type: '图片' })
      },
    })
    /* editor.ui.registry.addMenuItem('localvideo', {
      text: '本地视频',
      icon: 'embed',
      onAction: () => {
        InsertFile.open({ type: '视频' })
      },
    })
    editor.ui.registry.addMenuItem('localaudio', {
      text: '本地音频',
      icon: 'arrow-right',
      onAction: () => {
        InsertFile.open({ type: '音频' })
      },
    }) */

    editor.ui.registry.addMenuItem('docx', {
      text: 'Word 文档',
      icon: 'new-document',
      onAction: () => {
        InsertWord.open(editor)
      },
    })
  },
  // 用于复制粘贴的图片和 TinyMCE 自带的图片上传
  // img 的 src 为 object URL 或 Base64 时触发
  images_upload_handler(blobInfo, progress) {
    // console.log('images_upload_handler: ', blobInfo)
    const blob = blobInfo.blob()
    const file = new File([blob], blobInfo.filename(), {
      type: blob.type,
    })

    return Vue.prototype.$POST.upload(global.baseApi + 'upload', {
      file,
    }, {
      onUploadProgress(e) {
        progress(e.loaded / e.total * 100)
      },
    }).then((res) => {
      if (typeof res.data?.data === 'string') {
        return res.data.data
      } else {
        Promise.reject(res)
      }
    })
  },
}
