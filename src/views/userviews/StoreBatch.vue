<template>
  <el-upload class="upload" drag accept=".txt" :http-request="upload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖拽至方框内或 <em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">
        文件中每条图书信息为一行. 一行中的内容为(书号 类别 书名 出版社 年份 作者
        价格 数量)
      </div>
    </template>
  </el-upload>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "StoreBatch",
  data() {
    return {};
  },
  methods: {
    upload(param) {
      const formData = new FormData();
      const file = param.file;
      formData.append("file", file);
      window.$.ajax("/lib/book/storeBatch", {
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success(res) {
          if (res === "success") {
            ElMessage({
              message: "导入成功",
              type: "success",
            });
            param.onSuccess(true);
          }
        },
        error(jqXHR, textStatus, errorThrown) {
          ElMessage({
            message: "导入失败" + errorThrown,
            type: "error",
          });
        },
      });
    },
  },
};
</script>

<style>
.upload {
  margin-top: 100px;
  margin-right: 200px;
}
.el-icon--upload {
  size: 100px;
}
</style>