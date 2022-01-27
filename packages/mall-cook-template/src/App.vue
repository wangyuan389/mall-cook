<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-01-11 14:40:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-27 19:09:50
-->

<script>
import { mapMutations } from "vuex";

export default {
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["setStatusHeight"]),

    init() {
      // 获取并设置状态栏高度
      let that = this;

      uni.getSystemInfo({
        success: (res) => {
          wx.getSystemInfo({
            success: function (res) {
              let height = res.statusBarHeight;
              that.setStatusHeight(height);
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import "./static/font/iconfont.css";
</style>
