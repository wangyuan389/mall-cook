<!--
 * @Description: 处理初始化逻辑
 * @Autor: WangYuan
 * @Date: 2022-01-11 14:40:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-09 10:08:04
-->

<script>
import { mapMutations } from "vuex";

export default {
  created() {
    this.getSystemInfo();
  },

  methods: {
    ...mapMutations(["setStatusHeight", "setSystemInfo"]),

    // 获取并设置状态栏高度
    getSystemInfo() {
      let that = this;

      uni.getSystemInfo({
        success: function (res) {
          let height = res.statusBarHeight;
          that.setStatusHeight(height);
          that.setSystemInfo(res);
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "./static/font/iconfont.css";
</style>
