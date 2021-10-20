<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-10-13 14:14:54
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-10-18 16:56:01
-->
<template>
  <div>
    <config-wrap title='必输配置'>
      <config-item label='属性名'>
        <el-input
          v-model="content.curComponent.key"
          placeholder="请输入属性名"
          size='small'
        ></el-input>
      </config-item>
    </config-wrap>
    <config-wrap title='基础配置'>
      <config-item label='标题'>
        <el-input
          v-model="content.curComponent.label"
          placeholder="请输入标题"
          size='small'
        ></el-input>
      </config-item>
      <config-item label='默认值'>
        <el-select
          v-model="content.curComponent.value"
          size='small'
        >
          <el-option
            v-for="item in content.curComponent.data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </config-item>

    </config-wrap>
    <config-wrap title='数组数据'>
      <div class="nav">
        <draggable v-model="content.curComponent.data">
          <slot></slot>
          <div
            v-for="(item,index) in content.curComponent.data"
            :key="item.id"
            class="nav-item"
          >
            <config-item label='选项名'>
              <el-input
                v-model="item.label"
                size='small'
              ></el-input>
            </config-item>
            <config-item label='选项值'>
              <el-input
                v-model="item.value"
                size='small'
              ></el-input>
            </config-item>
            <div
              class="nav-delete"
              @click="delItem(index)"
            >x</div>
          </div>
        </draggable>

        <div
          class="nav-add"
          @click="addItem"
        >新增数据</div>
      </div>
    </config-wrap>
  </div>
</template>

<script>
import ConfigItem from "../../components/global/ConfigItem.vue";
import Draggable from "vuedraggable";

export default {
  components: { ConfigItem, Draggable },

  name: "SchemaSelectConfig",

  inject: ["content"],

  methods: {
    addItem() {
      this.content.curComponent.data.push({
        id: this.$getRandomCode(4),
        label: "",
        value: "-1",
      });
    },

    delItem(i) {
      this.content.curComponent.data.splice(i, 1);
    },
  },
};
</script>

