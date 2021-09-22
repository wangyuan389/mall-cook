<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-19 15:10:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-07 17:08:45
-->
<template>
  <div class="flex flex-wrap">
    <div
      v-for="(item,key) in list"
      class="flex-center h45 w45 mr10 mb10 shadow"
    >
      <van-image :src="item.cover" />
    </div>
    <div
      class="flex-center h45 w45 shadow pointer"
      @click="add"
    >
      +
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GoodsConfigList",
  props: ["group"],

  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  watch: {
    group: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.getList();
      },
    },
  },

  methods: {
    getList() {
      this.$http({
        url: "/goods/getByIds",
        method: "POST",
        data: {
          projectId: this.project.id,
          ids: this.group.list,
        },
      }).then((res) => {
        if (res.status == "10000") {
          this.list = res.list;
        }
      });
    },

    add() {
      this.$emit("add", this.group);
    },
  },
};
</script>
