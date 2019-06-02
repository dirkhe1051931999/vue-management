<template>
  <div class="post-list right-container">
    <Menu />
    <Header />
    <PostTable
      :postList="postList"
      @deletePost="changePostTotal"
    />
    <Pagination
      :pageSize="pageSize"
      :total="total"
      :currentPage="page"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import api from "api/api"
export default {
  components: {
    Menu: () => import("components/menu/menu"),
    Header: () => import("components/header/header"),
    Pagination: () => import("components/pagination"),
    PostTable: () => import("components/posttable")
  },
  name: '',
  data() {
    return {
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    async getPostList() {
      let res = await api.getPostList(this.page, this.pageSize);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    async getPostTotal() {
      let res = await api.getPostTotal();
      if (res.success === 1) {
        this.total = res.total;
      }
    },
    changePage(newPage) {
      this.page = newPage;
      this.getPostList();
    },
    async changePostTotal() {
      this.getPostTotal();
      this.getPostList();
    }
  },
  created() {
    this.getPostList();
    this.getPostTotal();
  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
</style>
