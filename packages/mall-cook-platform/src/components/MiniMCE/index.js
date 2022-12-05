import Vue from 'vue'

import './index.scss'
import 'minimce/dist/style.css'
import MiniMCE from 'minimce'

/**
 * 浅色模式
 */
import 'tinymce/skins/ui/oxide/skin.min.css' // 皮肤
import contentCSS from '!!raw-loader!tinymce/skins/content/default/content.min.css'
import contentUICSS from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css'

/**
 * 深色模式
 */
/*import 'tinymce/skins/ui/oxide-dark/skin.min.css' // 皮肤
import contentCSS from '!!raw-loader!tinymce/skins/content/dark/content.min.css'
import contentUICSS from '!!raw-loader!tinymce/skins/ui/oxide-dark/content.min.css'*/

/**
 * 主题（可更换）
 */
import 'tinymce/themes/silver'

/**
 * 图标（可更换）
 */
import 'tinymce/icons/default'

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

/**
 * 自定义插件（非必须）
 */
import InsertWord from './plugins/InsertWord/index'
import InsertImage from './plugins/InsertImage/index'
import global from '@/config/global'

export default function () {
  Vue.use(MiniMCE, {
    options: {
      language: 'zh_CN',
      content_style: [contentCSS, contentUICSS, contentCustomCSS].join('\n'),
      menu: {
        insert: {
          title: 'Insert',
          items: 'localimage docx | image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'
        },
      },
      setup(editor) {
        const insertImage = InsertImage({ editor })
        editor.ui.registry.addMenuItem('localimage', {
          text: '本地图片',
          icon: 'image',
          onAction: () => {
            insertImage.$children[0].open()
          }
        })

        const insertWord = InsertWord({ editor })
        editor.ui.registry.addMenuItem('docx', {
          text: 'Word 文档',
          icon: 'new-document',
          onAction: () => {
            insertWord.$children[0].open()
          }
        })
      },
      // 用于复制粘贴的图片和 TinyMCE 自带的图片上传
      images_upload_handler: (blobInfo, progress) =>
        new Promise((resolve, reject) => {
          const loading = Vue.prototype.$loading()
          const blob = blobInfo.blob()
          const file = new File([blob], blobInfo.filename(), { type: blob.type })

          Vue.prototype.$POST.upload(global.baseApi + 'upload', {
            file,
          }).then(res => {
            if (typeof res.data === 'string') {
              resolve(res.data)
            } else {
              reject(res.message)
            }
          }).catch(err => {
            reject(String(err))
          }).finally(() => {
            loading.close()
          })
        }),
    }
  })
}
