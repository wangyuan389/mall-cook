<!--
 * @Description: 登录
 * @Autor: WangYuan
 * @Date: 2021-08-18 11:19:34
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-02-12 17:37:20
-->
<template>
  <div class="login">
    <div class="login-content">
      <div class="login-content-left">
        <!-- tabs -->
        <ul class="flex col-bottom mb60">
          <li
            v-for="tab in tabs"
            :key="tab.value"
            class="tab mr20"
            :class="[active == tab.value ? 'tab-active' : '']"
            @click="active = tab.value"
          >
            {{ tab.label }}
          </li>
        </ul>

        <!-- 登录 -->
        <template v-if="active == 'login'">
          <el-form :model="loginForm" ref="login" label-width="0">
            <el-form-item
              prop="account"
              class="mb40"
              :verify="{ minLen: 8, maxLen: 16, typeOptions: ['字母|数字'] }"
            >
              <el-input
                v-model="loginForm.account"
                placeholder="请输入账户名"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              class="mb70"
              :verify="{ passwordOptions: [6, 18, '字母|数字'] }"
            >
              <el-input
                v-model="loginForm.password"
                placeholder="输入密码登录"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>

          <el-button
            class="w-100 h48 f-white bg-theme r3 f18 lb-4"
            type="primary"
            @click="login"
            >登录</el-button
          >
          <div
            class="flex row-right mt25 f15 f-theme pointer"
            @click="active = 'register'"
          >
            免费注册
          </div>
        </template>

        <!-- 注册 -->
        <template v-if="active == 'register'">
          <el-form :model="registerForm" ref="register" label-width="0">
            <el-form-item
              prop="account"
              class="mb40"
              :verify="{ minLen: 8, maxLen: 16, typeOptions: ['字母|数字'] }"
            >
              <el-input
                v-model="registerForm.account"
                placeholder="请输入注册账户"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              class="mb40"
              :verify="{ passwordOptions: [6, 18, '字母|数字'] }"
            >
              <el-input
                v-model="registerForm.password"
                placeholder="请输入注册密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="userName" class="mb70" :verify="{ maxLen: 10 }">
              <el-input
                v-model="registerForm.userName"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-button
            class="w-100 h48 f-white bg-theme r3 f18 lb-4"
            type="primary"
            @click="register"
            >注册</el-button
          >
        </template>
      </div>
      <div class="login-content-right">
        <img class="w-100" src='../assets/image/logo.jpeg'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { login, register } from "@/api/user";

export default {
  name: "login",

  created() {
    this.logout();
  },

  data() {
    return {
      active: "login",
      loginForm: {
        account: '',
        password: ''
      },
      registerForm: {
        account: '', 
        password: '',
        userName: ''
      },
      tabs: [
        { label: "密码登录", value: "login" },
        { label: "免费注册", value: "register" },
      ],
    };
  },

  watch: {
    active: {
      handler(newVal) {
        switch(newVal) {
          case 'login': 
            this.loginForm = {
              account: '',
              password: ''
            };
            break;
          case 'register':
            this.registerForm = {
              account: '', 
              password: '',
              userName: ''
            };
            break;
          default:
            break;
        }
      },
    },
  },

  methods: {
    ...mapMutations(["setToken", "setUserInfo", "logout"]),

    // 登录
    async login() {
      this.$refs["login"].validate(async (valid) => {
        if (valid) {
          let res = await login(this.loginForm);

          if (res.status == "10000") {
            this.$notify({
              title: "登陆成功",
              message: "快去体验可视化给构建商城吧！",
              type: "success",
            });
            this.setToken(res.token);
            this.setUserInfo(res.userInfo);
            this.$router.push({ name: "managet" });
          } else {
            this.$notify({
              title: "登录失败",
              message: res.message,
              type: "warning",
            });
          }
        }
      });
    },

    // 注册
    register() {
      this.$refs["register"].validate(async (valid) => {
        if (valid) {
          let res = await register(this.registerForm);
          if (res.status == "10000") {
            this.$notify({
              title: "注册成功",
              message: "账户已注册成功，快去登录使用吧",
              type: "success",
            });
            this.active = "login";
            setTimeout(() => {
              this.$refs["login"].resetFields();
            }, 0);
          } else {
            this.$notify({
              title: "注册失败",
              type: "warning",
              message: res.message,
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  border: 0;
  border-radius: 0;
  padding: 0;
  font-size: 16px;
  border-bottom: solid 1px #dcdee0 !important;
}

::v-deep .el-input__icon {
  font-size: 20px;
}

.login {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #f2f3f5;
  overflow: hidden;

  .login-content {
    display: flex;
    height: 500px;
    margin-top: 200px;

    .login-content-left {
      width: 550px;
      margin-right: 20px;
      border-radius: 6px;
      background: #fff;
      padding: 50px 56px 60px;

      .tab {
        font-size: 20px;
        color: $color-grey;
        cursor: pointer;
      }

      .tab-active {
        font-size: 24px;
        color: #323233;
        font-weight: 500;
      }
    }

    .login-content-right {
      display: flex;
      align-items: center;
      width: 320px;
      border-radius: 6px;
      background: #fff;
    }
  }
}
</style>
