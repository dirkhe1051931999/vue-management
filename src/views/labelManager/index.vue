<template>
  <div class="container app-container">
    <el-col :gutter="20">
      <el-col :span="21">
        <div style="padding-bottom:20px;">
          <el-tag
            style="margin-right:10px;margin-bottom:10px;cursor:pointer"
            v-for="(item,index) in tagList"
            :key="item.id"
            closable
            effect="dark"
            :type="currentTagIndex===index?'danger':''"
            @click.native.stop="queryTag(item,index,'cat')"
            @dblclick.native.stop="editTag(item, index)"
            @close="deleteTag(item,index)"
          >{{ item.name}} ({{ item.count }})</el-tag>
        </div>
      </el-col>
      <el-col :span="3" style="padding-bottom:20px">
        <el-button @click="addTag" type="primary" size="medium">+ 添加标签</el-button>
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
      // 标签
      tagList: [],
      currentTag: {
        id: 0,
        name: "全部标签",
        count: 0
      },
      currentTagIndex: 0
    };
  },
  methods: {
    // 获取标签文章的数目
    async getPostTotal() {
      let res = await api.getPostTotal();
      if (res.success === 1) {
        this.currentTag.count = res.total;
      }
    },
    // 获取标签标签
    async getTags() {
      let res = await api.getTags();
      if (res.success === 1) {
        let tags = res.tags;
        let total = res.total;
        tags.unshift({
          id: 0,
          name: "全部标签",
          count: total
        });
        this.total = total;
        this.tagList = tags;
      }
    },
    // 获取标签文章
    async queryTag(item, index, from) {
      this.currentTag = item;
      this.total = item.count;
      this.currentTagIndex = index || 0;
      if (from === "cat") {
        this.page = 1;
      }
      let res = await api.getPostsByTagId(item.id, this.page, this.pageSize);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    // 删除文章
    async changePostTotal() {
      this.getPostTotal();
      this.getTags();
    },
    // 改变页码
    changePage(newPage) {
      this.page = newPage;
      this.queryTag(this.currentTag);
    },
    // 删除标签
    deleteTag(item, index) {
      if (item.count > 0) {
        this.$alert("请勿删除有文章的标签", "提示", {
          confirmButtonText: "确定",
          callback: action => {},
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          let res = await api.deleteTag(item.id);
          if (res.success === 1) {
            this.tagList.splice(index, 1);
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
    // 添加标签
    addTag() {
      this.$prompt("请填写标签名称", "添加标签", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ({ value }) => {
        let res = await api.addNewTag(value);
        if (res.success === 1) {
          this.tagList.push({
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
    // 编辑标签
    editTag(item, index) {
      this.$prompt("请填写标签名称", "添加标签", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name
      }).then(async ({ value }) => {
        let res = await api.updateTag(item.id, value);
        if (res.success === 1) {
          this.$message({
            type: "success",
            message: "更改成功"
          });
          this.queryTag(this.tagList[index]);
          this.tagList[index].name = value;
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
    // 先获取全部标签
    this.queryTag(this.currentTag);
    this.getTags();
    this.getPostTotal();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>