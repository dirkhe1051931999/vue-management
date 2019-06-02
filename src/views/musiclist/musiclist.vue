<template>
  <div class="category right-container">
    <Menu />
    <Header />
  </div>
</template>

<script>
import api from 'api/api';
export default {
  components: {
    Menu: () => import("components/menu/menu"),
    Header: () => import("components/header/header")
  },
  name: '',
  data() {
    return {

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
.category {
  .cat-header {
    position: relative;
    min-height: 3em;
    .btn-add {
      position: absolute;
      top: 0;
      right: 0;
      color: @base-color;
      border-color: @base-color;

      .icon {
        width: 0.9em;
        height: 0.9em;
        vertical-align: -0.05em;
        margin-right: 0.4em;
      }
    }
  }
  .cat-list {
    overflow: hidden;
    margin-right: 6em;
    .cat-item {
      float: left;
      button {
        position: relative;
        margin: 0 1em 1em 0;
        padding-right: 2em;
        .icon {
          position: absolute;
          top: 1em;
          right: 0.2em;
          width: 0.6em;
          height: 0.6em;
          color: red;
          vertical-align: -0.05em;
          margin-right: 0.4em;
        }
      }
    }
  }
}
</style>
