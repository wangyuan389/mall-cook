import FaimLocale from "faim/dist/locale/zh-cn.mjs";
import upload from '../upload'
import './index.scss'

export default {
  // 图片上传组件全局配置
  locale: FaimLocale.FaImageUpload,
  // accept: '.jpg,.jpeg,.png', // 允许上传的图片格式
  // maxCount: 1, // 全局默认图片数量不超过1张，具体使用时如有不同可用局部配置覆盖掉
  // maxSize: 512 * 1024, // 单位为字节
  // 上传到服务器
  upload,
}
