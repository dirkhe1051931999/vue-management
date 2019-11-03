<template>
  <div class="container app-container">
    <el-row>
      <el-col style="text-align:right">
        <el-button type="primary" size="medium" @click="addProject">+ 增加项目</el-button>
      </el-col>
    </el-row>
    <Project
      v-for="(project, index) in projects"
      :project="project"
      :key="project.id"
      :currentIndex="index"
      @deleteProject="deleteProject"
      @confirmUpdateProject="confirmUpdateProject"
    />
    <div class="empty" v-if="!projects.length">
      <span>空空如也~</span>
    </div>
    <el-dialog
      title="新增项目"
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
              <Upload :src="project.poster" @uploadFile="getImgFile" from="myProject"></Upload>
            </div>
          </el-col>
          <!-- 项目名称与项目地址 -->
          <el-col :span="12" class="flex">
            <el-row>
              <div style="margin-top:5px">请输入项目名称</div>
              <el-input
                placeholder="请输入项目名称"
                v-model="project.name"
                style="margin-bottom:10px;margin-top:5px"
              ></el-input>
            </el-row>
            <el-row>
              <div style="margin-bottom:5px">请输入项目地址</div>
              <el-input placeholder="请输入项目地址" v-model="project.link"></el-input>
            </el-row>
          </el-col>
        </el-row>
        <!-- github地址 -->
        <el-row>
          <div style="margin-top:5px">请输入Github地址</div>
          <el-input placeholder="请输入Github地址" v-model="project.github" style="margin-top:5px"></el-input>
        </el-row>
        <!-- 项目介绍 -->
        <el-row>
          <div style="margin-top:5px">请输入项目介绍</div>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入项目介绍"
            v-model="project.description"
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
    Upload: () => import("@/components/upload/index"),
    Project: () => import("@/components/project/index")
  },
  mixins: [],
  computed: {},
  watch: {},
  data() {
    return {
      showClose: false,
      dialogFormVisible: false,
      project: {},
      projects: [],
      newProject: {
        id: 0,
        name: "",
        link: "",
        github: "",
        poster: "",
        description: ""
      }
    };
  },
  methods: {
    // 打开添加项目的弹窗
    addProject() {
      this.dialogFormVisible = true;
    },
    // 取消添加项目的弹窗
    cancelUpload() {
      this.project = Object.assign({}, this.newProject);
      this.dialogFormVisible = false;
    },
    // 获取所有项目
    async getLaboratories() {
      let res = await api.getLaboratories();
      if (res.success === 1) {
        this.projects = res.laboratories;
      }
    },
    // 确定增加项目
    async confirmUpload() {
      let formData = new FormData();
      formData.append("uploadFile", this.imgFile);
      formData.append("data", JSON.stringify(this.project));
      if (
        !this.project.poster ||
        !this.project.name ||
        !this.project.link ||
        !this.project.github ||
        !this.project.description
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
      let res = await api.createNewLaboratory(formData);
      if (res.success === 1) {
        this.$message({
          type: "success",
          message: "添加项目成功"
        });
        this.dialogFormVisible = false;
        this.getLaboratories();
      } else {
        this.$message({
          type: "error",
          message: "添加项目失败"
        });
      }
      this.loading.close();
    },
    // 获取生成的image图片
    getImgFile(file, imgSrc) {
      this.imgFile = file;
      this.project.poster = imgSrc;
    },
    // 删除项目
    deleteProject() {
      this.project = Object.assign({}, this.newProject);
      this.getLaboratories();
    },
    // 确定更新项目
    confirmUpdateProject() {
      this.project = Object.assign({}, this.newProject);
      this.getLaboratories();
    }
  },
  created() {
    this.project = Object.assign({}, this.newProject);
    this.getLaboratories();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.dialog-form {
  .file-img {
    margin-top: 10px;
    position: relative;
    border: 1px solid #dcdfe6;
    height: 130px;
    box-sizing: border-box;
  }
}
</style>