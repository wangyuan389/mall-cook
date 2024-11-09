<!--
 * @Description: 图标选择组件
 * @Autor: WangYuan
 * @Date: 2021-08-23 09:44:05
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:43:50
-->
<template>
  <div class="IconSelect">

    <!-- 选中默认图标 -->
    <div class="flex">
      <div
        class="icon-wrap"
        @click="show = !show"
        style="margin:0 15px 0 0"
      >
        <i
          class="icon"
          :class="mValue"
        ></i>
      </div>

      <!-- 选中高亮图标 -->
      <div
        class="icon-wrap"
        @click="show = !show"
      >
        <i
          class="icon"
          :class="mValue"
          style="color:#f20c25"
        ></i>
      </div>
    </div>

    <!-- 选择图标弹窗 -->
    <el-dialog
      title="选择图标"
      :visible.sync="show"
      width="30%"
    >
      <ul class="flex flex-wrap">
        <li
          v-for="icon in iconList"
          :key="icon"
          class="icon-wrap"
          :class="[mValue == icon ? 'icon-wrap-active' : '']"
          style="margin: 5px 10px;"
          @click="mValue = icon"
        >
          <i
            class="icon"
            :class="icon"
          ></i>
        </li>
      </ul>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "IconSelect",

  props: ["value"],

  data() {
    return {
      show: false,
      iconList: [
        "icon-shop",
        "icon-cart",
        "icon-goods",
        "icon-my",
        "icon-sort",
        "icon-list",
        "icon-choiceness",
        "icon-crown",
        "icon-hot",
      ],
      mValue: "",
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        this.mValue = newValue;
      },
    },
    
    mValue: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border: 1px solid #e3e2e5;
  border-radius: 4px;
  cursor: pointer;

  i {
    color: #7d7d7d;
    font-size: 36px;
  }
}

.icon-wrap-active {
  border: 1px solid $color-theme;
}
</style>