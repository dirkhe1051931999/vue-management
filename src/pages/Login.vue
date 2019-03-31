<template>
  <section class="login">
    <div class="login-section">
      <h2>vue-blog 后台管理系统</h2>
      <div class="login-form">
        <div class="form-group">
          <input
            type="text"
            class="username"
            v-model="userName"
            placeholder="用户名"
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            class="passowrd"
            v-model="password"
            @keyup.enter="login"
            placeholder="密码"
          >
        </div>
        <div class="form-group">
          <button
            class="btnLogin"
            ref="login"
            @click="login"
          >登陆</button>
        </div>
        <p class="error">{{ errMsg }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/fetch/api';
import crypto from 'crypto'
export default {
  components: {},
  name: '',
  data() {
    return {
      userName: '',
      password: '',
      errMsg: ''
    }
  },
  methods: {
    enCrypty: function (psw) {
      let result;
      let sugar = "!@A#$Q%W^E&R*T()_+a_1";
      let md5 = crypto.createHash("md5")
      result = md5.update(sugar+psw).digest('hex')
      return result
    },
    login: async function () {
      if (this.userName === '') {
        this.errMsg = '用户名不能为空';
        return false;
      }
      if (this.password === '') {
        this.errMsg = '密码不能为空';
        return false;
      }
      let newPsw = this.enCrypty(this.password+'');
      let res = await api.login(this.userName, newPsw);
      if (res.success === 1) {
        this.errMsg = '';
        localStorage.setItem('BLOG_TOKEN', res.token);
        alert("登录成功")
        this.$router.push({ path: '/postlist' });
      } else {
        alert("登录失败")
        this.errMsg = res.message;
      }
    }
  },
  created() {

  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
@import "../assets/less/index";
.login {
  min-height: 100%;
  background-color: #324057;
  .login-section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
  }
  h2 {
    font-size: 2.5em;
    color: #fff;
    text-align: center;
    margin-bottom: 1.5em;
  }
  .login-form {
    padding: 2em;
    background-color: #fff;
    border-radius: 0.2em;
  }
  .form-group {
    margin-bottom: 1.5em;
    input,
    button {
      width: 100%;
      font-size: 1em;
      line-height: 2;
      margin: 0;
      padding: 0.6em 1em;
      border: 1px solid #ddd;
      border-radius: 4em;
      box-sizing: border-box;

      &:focus {
        border-color: @base-color;
      }
    }
    .btnLogin {
      color: #fff;
      cursor: pointer;
      border-color: @base-color;
      background-color: @base-color;
    }
  }
  .error {
    position: absolute;
    left: 50%;
    bottom: 1em;
    transform: translateX(-50%);
    font-size: 1em;
    color: red;
    text-align: center;
  }
}
</style>
