<!--
 * @Description: 地址列表页
 * @Autor: WangYuan
 * @Date: 2021-09-13 17:23:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:27:55
-->
<template>
  <van-address-list
    v-model="chosenAddressId"
    :list="addressList"
    @add="onAdd"
    @edit="onEdit"
    @select='onSelect'
  >
  </van-address-list>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      chosenAddressId: "",
    };
  },

  computed: {
    ...mapGetters(["addressList", "order"]),
  },

  watch: {
    order: {
      watch: true,
      immediate: true,
      handler() {
        this.chosenAddressId = this.order.address.id;
      },
    },
  },

  methods: {
    ...mapMutations(["selectedAddress"]),

    // 新增地址
    onAdd() {
      this.$router.push({ name: "order-address-edit" });
    },

    // 编辑地址
    onEdit(address) {
      this.$router.push({ name: "order-address-edit", query: { address } });
    },

    // 选择地址
    onSelect(address) {
      this.selectedAddress(address);
      this.$router.push({
        name: "order",
      });
    },
  },
};
</script>