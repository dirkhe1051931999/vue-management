<template>
  <div class="header">
    <template v-for="(item, index) in $route.meta.paths">
      <router-link
        class="breadcrumb no-underline"
        :to="item.link"
        :key="index"
        v-if="item.link !== ''"
      >
        {{ item.name }}
      </router-link>
      <span
        class="no-link"
        v-else
      >{{ item.name }}</span>
      <span
        class="separator"
        v-show="index !== $route.meta.paths.length - 1"
      >/</span>
    </template>
    <span
      class="sign-out"
      title="退出登录"
      @click="signOut"
    >
      退出登陆
    </span>
  </div>
</template>

<script>
import api from 'api/api';
export default {
  components: {},
  name: '',
  data() {
    return {

    }
  },
  methods: {
    signOut() {
      this.$msgBox.showMsgBox(_msg_.messagebox.signOut)
        .then(async () => {
          let res = await api.signOut();
          if (res.success === 1) {
            localStorage.removeItem('BLOG_TOKEN');
            this.$router.push({ path: '/login' });
          } else {
            this.$message.showMessage({
              type: 'error',
              content: res.message
            });
          }
        }).catch(() => {
          return false;
        });
    }
  },
  created() {

  },
  mounted() {
    console.log()
  },
}
</script>

<style scoped lang='less'>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4em;
  line-height: 4em;
  padding-left: 1em;
  background: #eff2f7;
  .no-link {
    color: #97a8be;
    cursor: text;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .separator {
    margin: 0 0.5em 0 0.3em;
  }
  .sign-out {
    position: absolute;
    top: 0;
    right: 2em;
    cursor: pointer;
    .icon {
      margin-top: 1em;
      width: 2em;
      height: 2em;
      color: #fa5555;
    }
  }
}
</style>
