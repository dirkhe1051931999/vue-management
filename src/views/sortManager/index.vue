<template>
  <div class="container app-container">
    <el-col :gutter="20">
      <el-col :span="21">
        <div style="padding-bottom:20px;">
          <el-tag
            style="margin-right:10px;margin-bottom:10px;cursor:pointer"
            v-for="(item,index) in catList"
            :key="item.id"
            closable
            effect="dark"
            :type="currentCatIndex===index?'danger':''"
            @click.native.stop="queryCat(item,index,'cat')"
            @dblclick.native.stop="editCategory(item, index)"
            @close="deleteCategory(item,index)"
          >{{ item.name}} ({{ item.count }})</el-tag>
        </div>
      </el-col>
      <el-col :span="3" style="padding-bottom:20px">
        <el-button @click="addCategory" type="primary" size="medium">+ 添加分类</el-button>
      </el-col>
    </el-col>
    <PostTable :tableData="postList" @deletePost="changePostTotal"></PostTable>
    <div class="pagination" v-if="postList.length">
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
      total: 0,
      // 分类
      catList: [],
      currentCat: {
        id: 0,
        name: "全部分类",
        count: 0
      },
      currentCatIndex: 0
    };
  },
  methods: {
    // 获取分类文章的数目
    async getPostTotal() {
      let res = await api.getPostTotal();
      if (res.success === 1) {
        this.currentCat.count = res.total;
      }
    },
    // 获取分类标签
    async getCategories() {
      let res = await api.getCategories();
      if (res.success === 1) {
        let categories = res.categories;
        let total = 0;
        for (let cat of Object.values(categories)) {
          total += cat.count;
        }
        categories.unshift({
          id: 0,
          name: "全部分类",
          count: total
        });
        this.total = total;
        for (var i = 0; i < categories.length; i++) {}
        this.catList = categories;
      }
    },
    // 获取分类文章
    async queryCat(item, index, from) {
      this.currentCat = item;
      this.total = item.count;
      this.currentCatIndex = index || 0;
      if (from === "cat") {
        this.page = 1;
      }
      let res = await api.getPostsByCatId(item.id, this.page, this.pageSize);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    // 删除文章
    async changePostTotal() {
      this.getPostTotal();
      this.getCategories();
    },
    // 改变页码
    changePage(newPage) {
      this.page = newPage;
      this.queryCat(this.currentCat);
    },
    // 删除分类
    deleteCategory(item, index) {
      if (item.count > 0) {
        this.$alert("请勿删除有文章的分类", "提示", {
          confirmButtonText: "确定",
          callback: action => {},
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          let res = await api.deleteCategory(item.id);
          if (res.success === 1) {
            this.catList.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
      }
    },
    // 添加分类
    addCategory() {
      this.$prompt("请填写分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ({ value }) => {
        let res = await api.addNewCategory(value);
        if (res.success === 1) {
          this.catList.push({
            id: res.newId,
            name: value,
            count: 0
          });
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败"
          });
        }
      });
    },
    // 编辑分类
    editCategory(item, index) {
      this.$prompt("请填写分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name
      }).then(async ({ value }) => {
        let res = await api.updateCategory(item.id, value);
        if (res.success === 1) {
          this.$message({
            type: "success",
            message: "更改成功"
          });
          this.queryCat(this.catList[index]);
          this.catList[index].name = value;
        } else {
          this.$message({
            type: "error",
            message: "更改失败"
          });
        }
      });
    }
  },
  created() {
    // 先获取全部分类
    this.queryCat(this.currentCat);
    this.getCategories();
    this.getPostTotal();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>