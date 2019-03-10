<template>
  <section class="post-list right-container">
    <Menu></Menu>
    <Header></Header>
    <PostTable
      :postList="postList"
      @deletePost="changePostTotal"
    ></PostTable>
    <Pagination
      :pageSize="pageSize"
      :total="total"
      :currentPage="page"
      @changePage="changePage"
    ></Pagination>
  </section>

</template>

<script>
import Menu from '@/components/Menu';
import Header from '@/components/Header';
import PostTable from "@/components/PostTable"
import Pagination from '@/components/Pagination';
import api from '@/fetch/api';
export default {
  components: {
    Menu,
    Header,
    PostTable,
    Pagination
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
    getPostList: async function () {
      let res = await api.getPostList(this.page, this.pageSize);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    getPostTotal: async function () {
      let res = await api.getPostTotal();
      if (res.success === 1) {
        this.total = res.total;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.getPostList();
    },
    changePostTotal: function () {
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
