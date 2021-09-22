<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-04 15:58:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-18 16:10:39
-->
<template>
  <div>
    <config-wrap title='模块设置'>

      <config-item label='模式选择'>
        <mode-select
          v-model="attr.model"
          @change='changeModel'
        >
          <mode-select-item
            icon='deco-icon-fixed'
            tooltip='固定'
            value='fixed'
          ></mode-select-item>
          <mode-select-item
            icon='deco-icon-scroll'
            tooltip='横向滑动'
            value='scroll'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <mode-select
        v-model="attr.maxNum"
        direction='column'
        class="mb10"
      >
        <mode-select-item
          v-for="(item,index) in numConfig"
          :key="index"
          v-bind="item"
        ></mode-select-item>
      </mode-select>
    </config-wrap>

    <!-- 字体样式设置 -->
    <config-wrap title='内容设置'>
      <config-item label='显示类型'>
        <mode-select v-model="attr.type">
          <mode-select-item
            span='图片'
            value='image'
          ></mode-select-item>
          <mode-select-item
            span='文字'
            value='text'
          ></mode-select-item>
          <mode-select-item
            span='图文'
            value='image-text'
          ></mode-select-item>
        </mode-select>
      </config-item>

      <config-item label='标题大小'>
        <mode-select v-model="style.fontSize">
          <mode-select-item
            v-for="(item,index) in sizeConfig"
            :key="index"
            v-bind="item"
          ></mode-select-item>
        </mode-select>
      </config-item>

    </config-wrap>

    <config-wrap title='容器样式设置'>
      <!-- 图片间距 -->
      <config-item label='图片间距'>
        <el-slider
          v-model="style.imgPadding"
          :max='50'
          show-input
        >
        </el-slider>
      </config-item>

      <StyleConfig :value='config.style'></StyleConfig>
    </config-wrap>

    <config-wrap title='添加标签'>
      <div class="mb15 f12 f-grey">最多添加 10 个标签，拖拽可调整顺序，图片比例需要一致</div>
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
                <div class="flex col-center mb10">
                  <span class="w40 mr5">标题</span>
                  <el-input
                    v-model="item.label"
                    size='mini'
                  ></el-input>
                </div>
                <jump-select v-model="item.jump"></jump-select>
              </div>
            </div>
          </div>
        </Draggable>
        <div
          v-if="value.length<10"
          class="nav-add"
          @click="config.value.push({ image: '',path:'',label:'新增标签' })"
        >
          新增标签
        </div>
      </div>
    </config-wrap>
  </div>
</template>

<script>
import componentConfigMixin from "@/mixin/componentConfigMixin";
export default {
  name: "McTabConfig",
  mixins: [componentConfigMixin],
  data() {
    return {
      sizeConfig: [
        {
          icon: "deco-icon-font-s",
          tooltip: "12号",
          value: 12,
        },

        {
          icon: "deco-icon-font-m",
          tooltip: "14号",
          value: 14,
        },
        {
          icon: "deco-icon-font-x",
          tooltip: "16号",
          value: 16,
        },
      ],
    };
  },

  computed: {
    // 根据滚动模式，提供对应最大显示个数
    numConfig() {
      let numList =
        this.attr.model == "fixed"
          ? this.getNumList([1, 2, 3, 4, 5])
          : this.getNumList([1.5, 2.5, 3.5, 4.5, 5.5]);
      return numList;
    },
  },

  methods: {
    changeModel(model) {
      this.attr.maxNum = model == "fixed" ? 2 : 2.5;
    },

    getNumList(target) {
      return target.map((itme) => {
        return {
          span: `${itme}个`,
          tooltip: `每行显示${itme}个`,
          value: itme,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>