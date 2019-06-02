<template>
  <div class="menu">
    <div class="user">
      后台管理系统
    </div>
    <ul class="menu-list">
      <li
        v-for="(menu,index) in menu"
        :key="index"
        class="menu-item"
      >
        <router-link
          :to="menu.to"
          exact
          class="no-underline"
        >{{menu.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { menu } from "./config"
export default {
  components: {},
  name: '',
  data() {
    return {
      menu: menu
    }
  },
  methods: {

  },
  created() {
  },
  mounted() {
  },
}
</script>

<style scoped lang='less'>
@import "~common/styles/vars";
.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 12em;
  background: #495060;
  z-index: 9999;
  .user {
    height: 4.28em;
    text-align: center;
    line-height: 4.28em;
    font-size: 1rem;
    color: #eee;
    background: #495060;
    border-bottom: solid 1px #eeeeee;
  }
  .menu-list {
    text-align: center;
    .menu-item {
      display: block;
      width: 100%;
      font-size: 1.2em;
      line-height: 3;
    }
    a {
      color: #eee;
      display: inline-block;
      width: 100%;
      &.router-link-exact-active {
        color: #fff;
        background: @base-color;
      }
    }
  }
}
</style>
