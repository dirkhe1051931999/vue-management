<template>
  <div class="upload">
    <div :class="['upload-file', { 'existFile': imgSrc !== ''}]">
      <img :src="imgSrc" alt />
      <span class="add-file" @click="addFile">
        <svg-icon :icon-class="iconClass" />
      </span>
      <span class="delete-file" @click="deleteFile">
        <svg-icon icon-class="delete" />
      </span>
    </div>
    <input type="file" ref="file" accept="image/png, image/jpeg" @change="fileChanged" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
      required: true
    },
    maxSize: {
      type: Number,
      default: 2048
    },
    from: {
      type: String,
      default: ""
    }
  },
  components: {},
  name: "",
  computed: {
    iconClass() {
      if (this.src) {
        return "edit";
      } else {
        return "add";
      }
    }
  },
  data() {
    return {
      file: {
        name: "",
        size: 0
      },
      imgSrc: ""
    };
  },
  watch: {
    src() {
      this.imgSrc = this.src;
    }
  },
  methods: {
    addFile() {
      this.$refs.file.click();
    },
    deleteFile() {
      this.imgSrc = "";
      this.$refs.file.value = "";
      this.file = {
        name: "",
        size: 0
      };
      this.$emit("uploadFile", this.file, this.imgSrc);
    },
    fileChanged() {
      const newFile = this.$refs.file.files[0];
      if (
        newFile.type.indexOf("image/png") === -1 &&
        newFile.type.indexOf("image/jpeg") === -1
      ) {
        this.$message({
          type: "warning",
          message: "上传文件格式错误，只接受jpg、png格式的图片"
        });
        this.$refs.file.value = "";
        return;
      }
      if (newFile.size > this.maxSize * 1024) {
        this.$message({
          type: "warning",
          message: "上传图片最大不能超过${this.maxSize}kb"
        });
        this.$refs.file.value = "";
        return;
      }
      if (this.file.name !== newFile.name || this.file.size !== newFile.size) {
        this.html5Reader(newFile);
      }
      this.$refs.file.value = "";
    },
    // 将图片文件转成BASE64格式
    html5Reader(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = e.target.result;
        let image = new Image();
        image.onload = () => {
          let width = image.width;
          let height = image.height;
          if (width / height >= 1.8 && width / height <= 2.2) {
            this.file = file;
            this.$emit("uploadFile", this.file, this.imgSrc);
          } else {
            this.$message({
              type: "warning",
              message: "上传图片的宽/高比要求在1.8-2.2之间"
            });
            this.imgSrc = "";
            this.$refs.file.value = "";
          }
        };
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  created() {
    this.imgSrc = this.src;
  },
  mounted() {}
};
</script>

<style scoped lang='scss'>
.upload {
  height: 100%;
  text-align: center;
  .upload-file {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      border-style: none;
      outline: none;
    }
    &.existFile {
      .add-file {
        left: 40%;
      }
      .delete-file {
        display: block;
        left: 60%;
      }
    }
  }
  .add-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    cursor: pointer;
    color: #1296db;
  }
  .delete-file {
    display: none;
    color: #1296db;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 35px;
    cursor: pointer;
  }
  input[type="file"] {
    display: none;
  }
}
</style>
