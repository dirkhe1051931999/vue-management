<template>
  <div class="post-table">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>id</th>
          <th>标题</th>
          <th>分类</th>
          <th>创建时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(post, index) in postList">
          <tr :key="post.id">
            <td>{{ index + 1 }}</td>
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.categoryName }}</td>
            <td>{{ post.createTime | formatTime }}</td>
            <td>{{ post.status | setStatus }}</td>
            <td>
              <router-link
                :to="`/edit/${post.id}`"
                class="no-underline"
              >
                <button class="btn-default btn-edit">编辑</button>
              </router-link>
              <button
                class="btn-default btn-offline"
                @click="offlinePost(post.id, index)"
                v-if="post.status === 'PUBLISHED'"
              >下线</button>
              <button
                class="btn-default btn-publish"
                @click="publishPost(post.id, index)"
                v-else
              >发布</button>
              <button
                class="btn-default btn-delete"
                @click="deletePost(post.id, index)"
              >删除</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import api from 'api/api';
export default {
  components: {

  },
  props: {
    postList: Array
  },
  name: '',
  data() {
    return {

    }
  },
  filters: {
    formatTime(createTime) {
      return moment(createTime).format('YYYY-MM-DD HH:mm:ss');
    },
    setStatus(status) {
      let showStatus = '';
      switch (status) {
        case 'PUBLISHED':
          showStatus = '已发布';
          break;
        case 'DRAFT':
          showStatus = '草稿';
          break;
        case 'OFFLINE':
          showStatus = '已下线';
          break;
        default:
          break;
      }
      return showStatus;
    }
  },
  methods: {
    offlinePost(postId, index) {
      this.$msgBox.showMsgBox(_msg_.messagebox.offlinePost)
        .then(async () => {
          let res = await api.offlinePost(postId);
          if (res.success === 1) {
            this.postList[index].status = 'OFFLINE';
            this.$message.showMessage({
              type: 'success',
              content: '下线文章成功'
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
    },
    publishPost(postId, index) {
      this.$msgBox.showMsgBox(_msg_.messagebox.publishPost)
        .then(async () => {
          let res = await api.publishPost(postId);
          if (res.success === 1) {
            this.postList[index].status = 'PUBLISHED';
            this.$message.showMessage({
              type: 'success',
              content: '发布文章成功'
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
    },
    deletePost(postId, index) {
      this.$msgBox.showMsgBox(_msg_.messagebox.deletePost)
        .then(async () => {
          let res = await api.deletePost(postId);
          if (res.success === 1) {
            this.postList.splice(index, 1);
            this.$emit('deletePost');
            this.$message.showMessage({
              type: 'success',
              content: '删除文章成功'
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
  created() {},
  mounted() {

  },
}
</script>

<style scoped lang='less'>
@import "~common/styles/vars";
.post-table {
  table {
    width: 100%;
    thead {
      background: #eef1f6;
    }
    tr {
      line-height: 3;
      &:hover {
        background: #eef1f6;
      }
      th,
      td {
        text-align: left;
        padding-left: 1em;
        border: 1px solid #dfe6ec;
      }
      button {
        padding: 0.4em 1em;
        margin-left: 1em;
        &.btn-offline {
          background-color: #eb9e05;
          color: #fff;
          border-color: #eb9e05;
          &:hover {
            opacity: 0.8;
          }
        }
        &.btn-publish {
          background-color: @base-color;
          color: #fff;
          border-color: @base-color;
          &:hover {
            opacity: 0.8;
          }
        }
        &.btn-delete {
          background-color: #fa5555;
          border-color: #fa5555;
          color: #fff;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
