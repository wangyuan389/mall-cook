<!--
 * @Description: 地址编辑页
 * @Autor: WangYuan
 * @Date: 2021-09-13 17:40:19
 * @LastEditors: WangYuan
 * @LastEditTime: 2021-09-17 17:28:02
-->
<template>
  <div class="wrap">
    <van-address-edit
      :areaList='areaList'
      :address-info='address'
      show-delete
      show-postal
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from "../../utils/area";
import { mapMutations } from "vuex";

export default {
  created() {
    this.address = this.$route.query.address || {};
  },

  data() {
    return {
      areaList,
      address: {},
    };
  },

  methods: {
    ...mapMutations(["addAddress", "editAddress", "delAddress"]),

    // 保存地址
    onSave(content) {
      this.address.id
        ? this.editAddress({ oldAds: this.address, newAds: content })
        : this.addAddress(content);

      this.$router.push({ name: "order-address-list" });
    },

    // 删除地址
    onDelete() {
      this.address.id && this.delAddress(this.address.id);
      this.$router.push({ name: "order-address-list" });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
}
</style>