<template>
  <el-table :data="tableData" style="width: 100%" stripe>
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="id" label="id" width="50"></el-table-column>
    <el-table-column prop="title" label="标题" width="350"></el-table-column>
    <el-table-column prop="categoryName" label="分类" width="100"></el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 5px">{{ scope.row.createTime | formatTime }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态" width="100">
      <template slot-scope="scope">
        <el-tag type="info" v-if="scope.row.status==='OFFLINE'">{{scope.row.status | setStatus}}</el-tag>
        <el-tag type="warning" v-if="scope.row.status==='DRAFT'">{{scope.row.status | setStatus}}</el-tag>
        <el-tag
          type="success"
          v-if="scope.row.status==='PUBLISHED'"
        >{{scope.row.status | setStatus}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" prop="status">
      <template slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          @click="editPost(scope.row,scope.$index)"
        >编辑</el-button>
        <el-button
          type="info"
          icon="el-icon-info"
          size="small "
          @click="offlinePost(scope.row,scope.$index)"
          v-if="scope.row.status === 'PUBLISHED'"
        >下线</el-button>
        <el-button
          type="success"
          icon="el-icon-success"
          size="small "
          @click="publishPost(scope.row,scope.$index)"
          v-else
        >上线</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small "
          @click="deletePost(scope.row,scope.$index)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from "moment";
import api from "@/api/index";
const OFFLINE = "OFFLINE";
const PUBLISHED = "PUBLISHED";
export default {
  props: {
    tableData: {
      default: [],
      type: Array
    }
  },
  filters: {
    formatTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    setStatus(status) {
      let showStatus = "";
      switch (status) {
        case "PUBLISHED":
          showStatus = "已发布";
          break;
        case "DRAFT":
          showStatus = "草稿";
          break;
        case "OFFLINE":
          showStatus = "已下线";
          break;
        default:
          break;
      }
      return showStatus;
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    // 去编辑页
    editPost(item, index) {
      this.$router.push({ path: "/blog/editArticle", query: { id: item.id } });
    },
    // 下线
    offlinePost(item, index) {
      this.$confirm("是否下线该篇文章？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await api.offlinePost(item.id);
        if (res.success === 1) {
          this.tableData[index].status = OFFLINE;
          this.$message({
            type: "success",
            message: "下线文章成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "下线文章失败"
          });
        }
      });
    },
    // 上线
    publishPost(item, index) {
      this.$confirm("是否上线该篇文章？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await api.publishPost(item.id);
        if (res.success === 1) {
          this.tableData[index].status = PUBLISHED;
          this.$message({
            type: "success",
            message: "发布文章成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "发布文章失败"
          });
        }
      });
    },
    deletePost(item, index) {
      this.$confirm("是否删除该篇文章？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await api.deletePost(item.id);
        if (res.success === 1) {
          this.tableData.splice(index, 1);
          this.$emit("deletePost");
          this.$message({
            type: "success",
            message: "删除文章成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "删除文章失败"
          });
        }
      });
    }
  },
  mounted() {}
};
</script>