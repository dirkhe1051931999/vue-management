<template>
  <div class="home right-container">
    <Menu />
    <Header />
  </div>
</template>

<script>
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
  mounted() { },
}
</script>

<style scoped lang='less'>
</style>
