<template>
  <div class="login-container">
    <!-- 
      https://element.eleme.cn/2.0/#/zh-CN/component/form
      form表单
      model：表单数据对象
      rules：表单验证规则	
      auto-complete：自动补全
      label-position：表单标签的位置
    -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">后台管理平台</h3>
      </div>
      <!-- 账号 -->
      <el-form-item prop="username">
        <!-- 图标 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- 输入框 -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="off"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <!-- 图标 -->
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!-- 输入框 -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <!-- 是否隐藏密码 -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 
        提交按钮 
        loading	是否加载中状态
      -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <!-- 提示 -->
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import api from "@/api/index";
import crypto from "crypto";
import { setToken, removeToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    // 简单校验账号
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的账号"));
      } else {
        callback();
      }
    };
    // 简单校验密码
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },

      loginRules: {
        username: [
          {
            // 是否必填，如不设置，则会根据校验规则自动生成
            required: true,
            // 失去焦点触发检验函数
            trigger: "blur",
            // handler
            validator: validateUsername
          }
        ],
        password: [
          {
            // 是否必填，如不设置，则会根据校验规则自动生成
            required: true,
            // 失去焦点触发检验函数
            trigger: "blur",
            // handler
            validator: validatePassword
          }
        ]
      },
      // 登录按钮转圈
      loading: false,
      // 密码输入框类型
      passwordType: "password",
      // 从哪过来的
      redirect: undefined
    };
  },
  watch: {
    // 获取路由
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    // 显示或者隐藏密码
    showPwd() {
      this.passwordType = this.passwordType === "password" ? "" : "password";
      // 让输入框聚焦
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 加密密码
    enCrypty(psw) {
      let result;
      let sugar = "!@A#$Q%W^E&R*T()_+a_1";
      let md5 = crypto.createHash("md5");
      result = md5.update(sugar + psw).digest("hex");
      return result;
    },
    // 点击登录
    handleLogin() {
      var login = async (username, password) => {
        this.loading = true;
        let res = await api.singUp(username, password);
        if (res.success === 1) {
          setToken(res.token);
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success",
            duration: 2000
          });
          this.$router.push({ path: this.redirect || "/" });
        } else {
          this.$message({
            showClose: true,
            message: "登录失败",
            type: "error",
            duration: 2000
          });
        }
        this.loading = false;
      };
      this.$refs.loginForm.validate(valid => {
        if (!valid) return;
        let newPsw = this.enCrypty(this.loginForm.password);
        login(this.loginForm.username, newPsw);
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
