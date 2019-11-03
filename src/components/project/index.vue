<template>
  <div class="project">
    <!-- 项目描述 -->
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="img">
          <img :src="project.poster" alt="项目图片" />
        </div>
        <div class="button">
          <el-button type="primary" icon="el-icon-edit" circle size="small" @click="updateProject"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteProject"></el-button>
          <el-button
            type="primary"
            icon="el-icon-view"
            circle
            size="small"
            @click="linkProject(project.link)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-link"
            circle
            size="small"
            @click="linkProject(project.github)"
          ></el-button>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="content">
          <div class="item">
            <div class="title">项目名称</div>
            <div class="content">{{project.name}}</div>
          </div>
          <div class="item">
            <div class="title">项目描述</div>
            <div class="scroll content">{{project.description}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 修改项目 -->
    <el-dialog
      title="修改项目"
      :visible.sync="dialogFormVisible"
      :show-close.sync="showClose"
      :close-on-click-modal.sync="showClose"
      :close-on-press-escape.sync="showClose"
    >
      <form class="dialog-form">
        <el-row :gutter="20">
          <!-- 上传图片 -->
          <el-col :span="12">
            <div class="file-img">
              <Upload :src="dialog_preject.poster" @uploadFile="getImgFile" from="project"></Upload>
            </div>
          </el-col>
          <!-- 项目名称与项目地址 -->
          <el-col :span="12" class="flex">
            <el-row>
              <div style="margin-top:5px">请输入项目名称</div>
              <el-input
                placeholder="请输入项目名称"
                v-model="dialog_preject.name"
                style="margin-bottom:10px;margin-top:5px"
              ></el-input>
            </el-row>
            <el-row>
              <div style="margin-bottom:5px">请输入项目地址</div>
              <el-input placeholder="请输入项目地址" v-model="dialog_preject.link"></el-input>
            </el-row>
          </el-col>
        </el-row>
        <!-- github地址 -->
        <el-row>
          <div style="margin-top:5px">请输入Github地址</div>
          <el-input
            placeholder="请输入Github地址"
            v-model="dialog_preject.github"
            style="margin-top:5px"
          ></el-input>
        </el-row>
        <!-- 项目介绍 -->
        <el-row>
          <div style="margin-top:5px">请输入项目介绍</div>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入项目介绍"
            v-model="dialog_preject.description"
            style="margin-top:5px"
          ></el-input>
        </el-row>
      </form>
      <!-- 提交、取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload">取消</el-button>
        <el-button type="primary" @click="confirmUpload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  components: {
    Upload: () => import("@/components/upload/index")
  },
  props: {
    project: {
      type: Object,
      default: {}
    },
    currentIndex: Number,
    position: String
  },
  name: "",
  data() {
    return {
      showClose: false,
      imgFile: null,
      dialog_preject: {},
      dialogFormVisible: false
    };
  },
  methods: {
    // 打开修改项目的弹窗
    updateProject() {
      this.dialogFormVisible = true;
    },
    // 删除项目
    deleteProject() {
      this.$confirm("确定删除该项目吗？", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      }).then(async () => {
        let res = await api.deleteLaboratory(this.project.id);
        if (res.success === 1) {
          this.$emit("deleteProject");
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
    },
    // 打开链接
    linkProject(url) {
      window.open(url, "_blank");
    },
    getImgFile(file, imgSrc) {
      this.imgFile = file;
      this.dialog_preject.poster = imgSrc;
    },
    // async confirmLaboratory() {},
    // cancel() {},
    // editFile() {},
    // deleteFile() {},
    // 隐藏弹窗
    cancelUpload() {
      this.dialog_preject = JSON.parse(JSON.stringify(this.project));
      this.dialogFormVisible = false;
    },
    // 确定上传
    async confirmUpload() {
      let formData = new FormData();
      formData.append("uploadFile", this.imgFile);
      formData.append("data", JSON.stringify(this.dialog_preject));
      if (
        !this.dialog_preject.poster ||
        !this.dialog_preject.name ||
        !this.dialog_preject.link ||
        !this.dialog_preject.github ||
        !this.dialog_preject.description
      ) {
        this.$message({
          type: "warning",
          message: "数据未填全"
        });
        return;
      }
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let res = await api.updateLaboratory(formData);
      if (res.success === 1) {
        this.$message({
          type: "success",
          message: "修改项目成功"
        });
        this.$emit("confirmUpdateProject");
        this.dialogFormVisible = false;
      } else {
        this.$message({
          type: "error",
          message: "修改项目失败"
        });
      }
      this.loading.close();
    }
  },
  created() {},
  mounted() {
    this.dialog_preject = JSON.parse(JSON.stringify(this.project));
  }
};
</script>

<style scoped lang='scss'>
.project {
  padding-top: 20px;
  .img {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    position: relative;
    border-radius: 10px;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  .button {
    text-align: center;
    vertical-align: bottom;
  }
  .item {
    color: #323232;
    padding-bottom: 5px;
    font-size: 14px;
    .title {
      margin: 0;
      font-size: 18px;
    }
    .content {
      color: #666;
      padding-top: 5px;
      margin: 0;
    }
    .scroll {
      width: 100%;
      overflow: scroll;
      height: 135px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .dialog-form {
    .file-img {
      margin-top: 10px;
      position: relative;
      border: 1px solid #dcdfe6;
      height: 130px;
      box-sizing: border-box;
    }
  }
}
</style>
