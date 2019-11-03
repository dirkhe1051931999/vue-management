<template>
  <div class="container app-container">
    <div class="post-form">
      <!-- 文章标题 -->
      <el-input v-model="post.title" placeholder="文章标题"></el-input>
      <!-- 文章分类 -->
      <el-row :gutter="20" style="padding-top:20px;">
        <el-col :span="21">
          <el-select v-model="selectedCategory" placeholder="请选择文章分类" style="width:100%;">
            <el-option
              v-for="(item,index) in categories"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
              <div class="flex">
                <span>{{ item.name }}</span>
                <i
                  class="el-icon-delete"
                  style=" color: #8492a6; font-size: 13px"
                  v-if="index>0"
                  @click.stop="deleteCategory(item,index)"
                ></i>
              </div>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addCategory">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 标签列表 -->
      <div class="tag-group" style="padding-top:20px;">
        <el-tag
          style="margin-right:10px;"
          :key="tags.newId"
          v-for="(tag,index) in tags"
          closable
          :disable-transitions="false"
          @close="deleteTag(tag, index)"
        >{{tag.name}}</el-tag>
        <el-input
          style="width:10%"
          v-if="tagInputVisible"
          v-model="tagInputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="tagInputConfirm"
          @blur="tagInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="addTag" type="primary">+ 添加标签</el-button>
      </div>
      <!-- 文章内容 -->
      <div style="padding-top:20px;">
        <Markdown :content="post.content" @syncContent="syncContent" />
      </div>
      <!-- 完成编辑、完成发布、保存草稿 -->
      <div style="padding-top:20px; text-align:right">
        <el-button type="primary" v-if="!$route.query.id" @click="publishPost">完成发布</el-button>
        <el-button type="primary" v-if="$route.query.id" @click="publishPost">完成编辑</el-button>
        <el-button type="success" @click="draftPost">保存草稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const MAXTAGS = 5;
const PUBLISHED = "PUBLISHED";
const DRAFT = "DRAFT";
import api from "@/api/index";
export default {
  components: {
    Markdown: () => import("@/components/markdown/index")
  },
  mixins: [],
  computed: {},
  watch: {
    $route() {
      if (this.$route.query.id) {
        this.getPostById(this.$route.query.id);
      } else {
        this.post = {
          title: "",
          content: "",
          categoryId: 0,
          status: ""
        };
        this.tags = [];
      }
    },
    post: {
      deep: true,
      handler(val, oldVal) {
        if (this.isFirstUpdatePostChange) {
          this.isFirstUpdatePostChange = false;
        } else {
          if (!this.selectedCategory) return;
          let newPost = this.initDraftPost();
          this.$socket.emit("saveDraftPost", newPost);
        }
      }
    },
    tags(val, oldVal) {
      if (this.isFirstUpdateTagsChange) {
        this.isFirstUpdateTagsChange = false;
      } else {
        if (!this.selectedCategory) return;
        let newPost = this.initDraftPost();
        this.$socket.emit("saveDraftPost", newPost);
      }
    },
    sockets: {
      connect() {
        console.log("fe socket connected");
      },
      getDraftPost(val) {
        if (val) {
          Object.assign(this.post, val);
          this.tags = val.tags || [];
        }
      }
    }
  },
  data() {
    return {
      // 文章
      post: {
        title: "",
        content: "",
        categoryId: 0,
        status: ""
      },
      // 分类
      categories: [
        {
          id: 0,
          name: "请选择文章分类"
        }
      ],
      // 分类
      tags: [],
      newTags: "",
      searchTags: [],
      isFirstUpdatePostChange: false,
      isFirstUpdateTagsChange: false,
      isLoading: false,
      // 选择的分类
      selectedCategory: "",
      // 标签
      tagInputVisible: false,
      tagInputValue: ""
    };
  },
  methods: {
    // 获取分类
    async getCategories() {
      let res = await api.getCategories();
      if (res.success === 1) {
        let categories = res.categories;
        categories.unshift({
          id: 0,
          name: "请选择文章分类"
        });
        this.categories = categories;
      }
    },
    // 获取文章
    async getPostById(id) {
      let res = await api.getPostById(id);
      if (res.success === 1) {
        this.isFirstUpdatePostChange = true;
        this.isFirstUpdateTagsChange = true;
        this.post = res.post;
        this.tags = res.tags;
        this.selectedCategory = this.categories.find(item => {
          return item.name === res.post.categoryName;
        }).name;
      }
    },
    // 从草稿中获取
    async getDraftPost() {
      this.$socket.emit("getDraftPost");
    },
    // 添加分类
    addCategory() {
      this.$prompt("请填写分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ({ value }) => {
        let res = await api.addNewCategory(value);
        if (res.success === 1) {
          this.categories.push({
            id: res.newId,
            name: value
          });
          this.$message({
            type: "success",
            message: "添加分类成功"
          });
        } else {
          this.$message({
            type: "success",
            message: "添加分类失败"
          });
        }
      });
    },
    // 删除标签
    deleteTag(tag, index) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    // 添加标签
    addTag() {
      this.tagInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 确定添加标签
    async tagInputConfirm() {
      let tagInputValue = this.tagInputValue;
      if (this.tags.indexOf(tagInputValue) !== -1) {
        this.$message({
          type: "warning",
          message: "不能添加重复的"
        });
        return;
      }
      if (tagInputValue) {
        if (this.tags.length >= MAXTAGS) {
          this.$message({
            type: "warning",
            message: "最多添加5个标签"
          });
        } else {
          let res = await api.addNewTagWhenPost(tagInputValue);
          if (res.success === 1) {
            this.tags.push({
              id: res.newId,
              name: tagInputValue
            });
          }
        }
      }
      this.tagInputVisible = false;
      this.tagInputValue = "";
    },
    // 完成发布、完成编辑
    async publishPost() {
      if (this.isLoading) {
        return;
      }
      if (!this.post.title || !this.post.content || !this.selectedCategory) {
        this.$message({
          type: "warning",
          message: "标题、内容和分类不能为空"
        });
        return;
      }
      this.isLoading = true;
      this.post.status = PUBLISHED;
      this.post.categoryId = this.categories.find(item => {
        return item.name === this.selectedCategory;
      }).id;
      let newPost = Object.assign({}, this.post);
      newPost.tags = this.tags;
      let res = null;
      if (this.$route.query.id) {
        res = await api.updatePost(this.$route.query.id, newPost);
      } else {
        res = await api.addPost(newPost);
      }
      if (res.success === 1) {
        this.$socket.emit("clearDraftPost");
        this.$message({
          type: "success",
          message: "文章发布成功"
        });
        this.$router.push({ path: "/blog/articleList" });
      } else {
        this.$message({
          type: "error",
          message: "文章发布失败"
        });
      }
      this.isLoading = false;
    },
    // 保存草稿
    async draftPost() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      this.post.status = DRAFT;
      let newPost = this.initDraftPost();
      if (!this.selectedCategory) {
        this.$message({
          type: "warning",
          message: "请选择文章分类"
        });
        return;
      }
      if (newPost) {
        let res = null;
        if (this.$route.query.id) {
          res = await api.updatePost(this.$route.query.id, newPost);
        } else {
          res = await api.addPost(newPost);
        }
        if (res.success === 1) {
          this.$socket.emit("clearDraftPost");
          this.$message({
            type: "success",
            message: "文章保存草稿成功"
          });
          this.$router.push({ path: "/blog/articleList" });
        }
        this.isLoading = false;
      }
    },
    // 初始化post数据
    initDraftPost() {
      let categoryId = this.categories.find(item => {
        return item.name === this.selectedCategory;
      }).id;
      let savePost = {
        id: this.post.id || 0,
        title: this.post.title,
        content: this.post.content,
        categoryId: categoryId,
        status: this.post.status,
        poster: this.post.poster,
        tags: this.tags
      };
      return savePost;
    },
    // 删除分类
    deleteCategory(item, index) {
      this.$message({
        type: "warning",
        message: "加紧开发中..."
      });
    },
    // 文章内容
    syncContent(content) {
      this.post.content = content;
    }
  },
  created() {
    this.getCategories();
  },
  mounted() {
    if (!this.$route.query.id) {
      this.getDraftPost();
    } else {
      this.getPostById(this.$route.query.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>