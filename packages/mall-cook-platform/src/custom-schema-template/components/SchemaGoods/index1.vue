<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-06-24 09:46:16
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:43:25
-->
<template>
  <div>

    <!-- 商品分组 -->
    <ul class="nav">
      <li
        class="nav-item"
        v-for="(group,index) in mValue"
        :key="index"
      >
        <div
          v-if="index != 0"
          class="nav-delete"
          @click="delType(index)"
        >
          <i class="f12 icon icon-cha-"></i>
        </div>

        <!-- 分组内容 -->
        <config-item label='分组名称'>
          <el-input
            class="mt5 w200"
            v-model="group.label"
            placeholder="请输入分组名称"
            size='mini'
          ></el-input>
        </config-item>
        <config-item label='分组标题'>
          <el-input
            class="mt5 w200"
            v-model="group.title"
            placeholder="请输入分组名称"
            size='mini'
          ></el-input>
        </config-item>

        <!-- 商品列表 -->
        <div class="flex">
          <GoodsConfigList
            :group='group'
            @add='editActiveList'
          ></GoodsConfigList>
        </div>
      </li>
    </ul>

    <!-- 新增分组 -->
    <div
      class="add-btn"
      @click="addType"
    >添加商品分组</div>

    
    <GoodsConfigChoose
      v-if="show"
      :show.sync='show'
      :activeList="aciveItem.list"
      @submit="replaceActiveList"
    >
    </GoodsConfigChoose>

  </div>
</template>

<script>
export default {
  name: "SchemaGoods1",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
      mValue: [],
      aciveItem: {},
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
  methods: {
    // 新增分组
    addType() {
      this.mValue.push({
        label: "新增分组",
        title: "上新商品",
        list: [],
      });
    },

    // 删除分组
    delType(index) {
      this.mValue.splice(index, 1);
    },

    // 编辑商品列表
    editActiveList(item) {
      this.aciveItem = item;
      this.show = true;
    },

    // 替换商品列表
    replaceActiveList(list) {
      this.aciveItem.list = list;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  outline: none;
  border: 0;
}

.add-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
  border: solid 1px $color-theme;
  text-align: center;
  font-size: 14px;
  color: $color-theme;
  cursor: pointer;
}
</style>