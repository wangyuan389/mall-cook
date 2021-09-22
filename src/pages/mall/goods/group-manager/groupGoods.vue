<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2021-08-19 15:10:03
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-08 09:38:28
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
      @click="show = true"
    >
      +
    </div>

    <GoodsConfigChoose
      v-if="show"
      :show.sync='show'
      :activeList="mValue"
      @submit="submit"
    >
    </GoodsConfigChoose>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["value"],

  data() {
    return {
      show: false,
      mValue: [],
      list: [],
    };
  },

  computed: {
    ...mapGetters(["project"]),
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.mValue = this.value;
      },
    },
    mValue: {
      immediate: true,
      handler(newValue, oldValue) {
        this.getList();
        this.$emit("input", newValue);
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
          ids: this.mValue,
        },
      }).then((res) => {
        if (res.status == "10000") {
          this.list = res.list;
        }
      });
    },

    submit(list) {
      this.mValue = list;
    },
  },
};
</script>
