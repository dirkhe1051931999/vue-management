<template>
  <div class="container app-container">
    <PostTable :tableData="postList" @deletePost="changePostTotal"></PostTable>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        hide-on-single-page
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  components: {
    PostTable: () => import("@/components/postTable/index")
  },
  mixins: [],
  computed: {},
  watch: {},
  data() {
    return {
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
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
    async changePostTotal() {
      this.getPostTotal();
      this.getPostList();
    },
    changePage(newPage) {
      this.page = newPage;
      this.getPostList();
    }
  },
  created() {
    this.getPostList();
    this.getPostTotal();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.pagination {
  padding-top: 20px;
}
</style>