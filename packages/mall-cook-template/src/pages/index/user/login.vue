<!--
 * @Description: 登录页
 * @Autor: WangYuan
 * @Date: 2021-09-15 10:16:54
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-07 10:17:31
-->
<template>
  <div class="login">
    <img
      src="//img2.tuguaishou.com/ips_templ_preview/w216_q100/a1/d5/26/lg_1807151_1563432469_5d301615acd56.jpg?auth_key=2264083200-0-0-e8b6e6dc8730bfdfacb0c26ae38a3aa9"
      class="login-logo"
    />
    <p class="mb10 f12">模拟登录，输入任意账户密码即可登录</p>

    <!-- 手机号登录 -->
    <ul class="flex-column col-center">
      <li class="login-field h5-underline">
        <i class="icon icon-shouji"></i>
        <input type="text" placeholder="手机号" v-model="account" />
      </li>
      <li class="login-field h5-underline">
        <i class="icon icon-suo"></i>
        <input type="password" placeholder="密码" v-model="password" />
      </li>
      <u-button
        class="mt20"
        color="#fd7f01"
        :disabled="disabled"
        @click="login"
      >
        登录
      </u-button>
    </ul>

    <!-- 社交账户登录 -->
    <div class="login-line">使用设计账户登录</div>

    <div class="login-section">
      <i class="icon icon-QQ login-section-qq" @click="login"></i>
      <i class="icon icon-weixin login-section-weixin" @click="login"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "login",

  data() {
    return {
      account: "",
      password: "",
    };
  },

  computed: {
    disabled() {
      if (this.account && this.password) return false;
      return true;
    },
  },

  methods: {
    ...mapMutations(["setToken"]),

    // 模拟登录
    login() {
      // 登录成功,设置token
      let token = "123";
      this.setToken(token);
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: #d2d2d2;

  .login-logo {
    height: 60px;
    width: 60px;
    margin-top: 80px;
    margin-bottom: 70px;
    border-radius: 50%;
  }

  .login-field {
    display: flex;
    align-items: center;
    width: 250px;
    margin-bottom: 10px;
    padding: 10px;

    input {
      outline: none;
      border: 0;
      font-size: 16px;
      color: #bbb6b9;
      background: transparent;
    }

    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: #dbd9dc;
      font-size: 14px;
      font-weight: 700;
    }

    i {
      font-size: 20px;
      margin-right: 5px;
    }
  }

  .login-line {
    position: relative;
    margin-top: 100px;
    font-size: 12px;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 110px;
      transform: translateY(-50%);
      width: 60px;
      height: 1px;
      background: #d2d2d2;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 110px;
      transform: translateY(-50%);
      width: 60px;
      height: 1px;
      background: #d2d2d2;
    }
  }

  .login-section {
    display: flex;
    justify-content: space-around;
    width: 250px;
    margin-top: 20px;

    .login-section-weixin {
      color: #28c445;
      font-size: 36px;
    }

    .login-section-qq {
      color: #23a0f0;
      font-size: 38px;
    }
  }
}
</style>