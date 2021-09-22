<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 15:44:59
-->
<template>
  <div>

    <config-wrap title='轮播属性'>
      <!-- 轮播模板 -->
      <config-item label='选择模板'>
        <mode-select v-model="attr.model">
          <mode-select-item
            icon='icon-zhijiao'
            tooltip='基础'
            value='basis'
          ></mode-select-item>
          <mode-select-item
            icon='icon-yuanjiao'
            tooltip='卡片'
            value='card'
          ></mode-select-item>
          <mode-select-item
            icon='icon-yuanjiao'
            tooltip='横向'
            value='line'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <!-- 自动播放 -->
      <config-item label='自动播放'>
        <mode-switch
          v-model="attr.autoplay"
          trueLabel='开启'
          falseLabel='关闭'
        ></mode-switch>
      </config-item>

      <!-- 循环 -->
      <config-item label='循环'>
        <mode-switch
          v-model="attr.loop"
          trueLabel='开启'
          falseLabel='关闭'
        ></mode-switch>
      </config-item>
      <config-item></config-item>
    </config-wrap>

    <config-wrap title='轮播样式'>
      <StyleConfig :value='config.style'></StyleConfig>
    </config-wrap>

    <config-wrap title='添加广告'>
      <div class="mb15 f12 f-grey">最多添加 10 个广告，拖拽可调整顺序，图片比例需要一致</div>
      <div class="nav">
        <Draggable v-model='config.value'>
          <div
            class="nav-item"
            v-for="(item,index) in value"
            :key="index"
          >
            <div
              v-if="value.length>2"
              class="nav-delete"
              @click="value.splice(index,1)"
            >
              <i class="f12 iconfont icon-cha-"></i>
            </div>
            <div class="flex mt10 f13">
              <div class="flex-column row-center mr10">
                <Imgpond
                  :count="1"
                  v-model="item.image"
                />
              </div>
              <div>
                <jump-select v-model="item.jump"></jump-select>
              </div>
            </div>
          </div>
        </Draggable>
        <div
          v-if="value.length<10"
          class="nav-add"
          @click="config.value.push({ image: '',path:'' })"
        >
          新增广告
        </div>
      </div>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
import ModeSwitch from "@/components/ModeSwitch";

export default {
  name: "McSwiperConfig",
  mixins: [componentConfigMixin],
  components: { ModeSwitch },
};
</script>

<style lang="scss" scoped>
</style>