<template>
  <div class="form">
    <el-form
      :model="cardInfo"
      ref="cardInfo"
      :label-position="left"
      label-width="100px"
    >
      <el-form-item label="卡号" prop="cid"
        :rules="[{ required: true, message: '卡号不能为空' }]">
        <el-input v-model="cardInfo.cid" />
      </el-form-item>
      <el-form-item label="用户名" prop="username"
        :rules="[{ required: true, message: '用户名不能为空' }]">
        <el-input v-model="cardInfo.username" />
      </el-form-item>
      <el-form-item label="单位" prop="unit"
        :rules="[{ required: true, message: '单位不能为空' }]">
        <el-input v-model="cardInfo.unit" />
      </el-form-item>
      <el-form-item label="类别" prop="type"
        :rules="[{ required: true, message: '类别不能为空' }]">
        <el-input v-model="cardInfo.type" />
      </el-form-item>
      <el-button type="primary" @click="create">创建</el-button>
      <el-button @click="clear()">清空表单</el-button>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
// import { ElMessage } from "element-plus";

export default {
  name: "CardAdd",
  data() {
    return {
      cardInfo: {
        cid: null,
        username: null,
        unit: null,
        type: null,
      },
    };
  },
  methods: {
    clear() {
      this.$refs["cardInfo"].resetFields();
    },
    async create() {
      window.$.ajax("/cards/create", {
        method: "POST",
        data: this.cardInfo,
        success(res) {
          if (res === "success") {
            ElMessage({
              message: "创建成功",
              type: "success",
            });
          } else if (res === "duplicated") {
            ElMessage({
              message: "此卡号已注册，请勿重复办卡",
              type: "warning",
            });
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          ElMessage({
            message: "创建失败" + errorThrown,
            type: "error",
          });
        },
      });
    },
  },
};
</script>