<template>
  <section class="tag right-container">
    <Menu></Menu>
    <Header></Header>
    <div class="tag-header">
      <ul class="tag-list">
        <li
          class="tag-item"
          v-for="(tag, index) in tagList"
          :key="tag.id"
        >
          <button
            :class="currentTag.id === tag.id ? 'btn-primary' : 'btn-default'"
            @click="queryTag(tag,'tag')"
            @dblclick="editTag(tag, index)"
          >
            {{ tag.name}} ({{ tag.count }})
            <svg
              class="icon"
              aria-hidden="true"
              v-if="tag.id !== 0"
              @click.stop="deleteTag(tag, index)"
            >
              <use xlink:href="#icon-delete"></use>
            </svg>
          </button>
        </li>
      </ul>
      <button
        class="btn-default btn-add"
        @click="addTag"
      >
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-add"></use>
        </svg>添加标签
      </button>
    </div>
    <PostTable :postList="postList"></PostTable>
    <Pagination
      :pageSize="pageSize"
      :total="total"
      :currentPage="page"
      @changePage="changePage"
    >
    </Pagination>
  </section>
</template>

<script>
import api from '@/fetch/api';
import Header from "@/components/Header"
import Menu from '@/components/Menu';
import PostTable from '../components/PostTable';
import Pagination from '../components/Pagination'
export default {
  components: {
    Header,
    Menu,
    PostTable,
    Pagination
  },
  name: '',
  data() {
    return {
      tagList: [],
      currentTag: {
        id: 0,
        name: '全部标签',
        count: 0
      },
      postList: [],
      page: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    getPostTotal: async function () {
      let res = await api.getPostTotal();
      if (res.success === 1) {
        this.currentTag.count = res.total;
      }
    },
    getTags: async function () {
      let res = await api.getTags();
      if (res.success === 1) {
        let tags = res.tags;
        let total = res.total;
        tags.unshift({
          id: 0,
          name: '全部标签',
          count: total
        });
        this.total = total;
        this.tagList = tags;
      }
    },
    queryTag: async function (tag,from) {
      console.log(tag)
      if(from=='tag'){
        this.page = 1;
      }
      this.currentTag = tag;
      this.total = tag.count;
      let res = await api.getPostsByTagId(tag.id, this.page, this.pageSize);
      if (res.success === 1) {
        this.postList = res.posts;
      }
    },
    changePage: function (newPage) {
      this.page = newPage;
      this.queryTag(this.currentTag);
    },
    addTag: function () {
      this.$msgBox.showMsgBox({
        title: '添加标签',
        content: '请填写标签名称',
        isShowInput: true
      }).then(async (val) => {
        let res = await api.addNewTag(val);
        if (res.success === 1) {
          this.tagList.push({
            id: res.newId,
            name: val,
            count: 0
          });
          this.$message.showMessage({
            type: 'success',
            content: '添加标签成功'
          });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        console.log('cancel');
      });
    },
    editTag: function (tag, index) {
      this.$msgBox.showMsgBox({
        title: '编辑标签',
        content: '请填写标签名称',
        isShowInput: true,
        inputValue: tag.name
      }).then(async (val) => {
        let res = await api.updateTag(tag.id, val);
        if (res.success === 1) {
          this.tagList[index].name = val;
          this.$message.showMessage({
            type: 'success',
            content: '修改标签成功'
          });
        } else {
          this.$message.showMessage({
            type: 'error',
            content: res.message
          });
        }
      }).catch(() => {
        console.log('cancel');
      });
    },
    deleteTag: function (tag, index) {
      let content = '确认是否删除该标签？';
      if (tag.count > 0) {
        content = '该标签下的文章不会受到删除的影响，确认是否删除该标签？';
      }
      this.$msgBox.showMsgBox({
        title: '确认删除',
        content: content
      }).then(async () => {
        let res = await api.deleteTag(tag.id);
        if (res.success === 1) {
          this.tagList.splice(index, 1);
          this.$message.showMessage({
            type: 'success',
            content: '删除标签成功'
          });
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
    this.getPostTotal();
    this.getTags();
    this.queryTag(this.currentTag);
  },
  mounted() {

  },
}
</script>

<style scoped lang='less'>
@import "../assets/less/index";
.tag {
  .tag-header {
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
  .tag-list {
    overflow: hidden;
    margin-right: 6em;

    .tag-item {
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
