<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-21 15:15:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:42:55
-->
<template>
  <div class="SchemaComponent">
    <config-wrap title="组件配置">
      <config-item label="组件名称">
        <el-input
          v-model="content.model.label"
          placeholder="请输入组件名称"
          size="small"
        ></el-input>
      </config-item>
      <config-item label="组件图标">
        <ul class="flex flex-wrap">
          <li
            v-for="(icon, index) in icons"
            :key="index"
            class="icon-item flex-center"
            :class="[content.model.icon == icon ? 'icon-item-active' : '']"
            @click="content.model.icon = icon"
          >
            <i class="icon f24" :class="icon"></i>
          </li>
        </ul>
      </config-item>
    </config-wrap>
  </div>
</template>

<script>
import icons from './icon'
export default {
  name: 'SchemaComponent',

  inject: ['content'],

  data () {
    return {
      icons
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-item {
  width: 44px;
  height: 44px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background: $color-theme;
    color: #fff;
  }
}

.icon-item-active {
  background: $color-theme;
  color: #fff;
}
</style>
