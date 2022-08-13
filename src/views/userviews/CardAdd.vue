<template>
  <div class="form">
    <el-form
      :model="cardInfo"
      :rules="cardRules"
      ref="cardInfo"
      label-width="100px"
    >
      <el-form-item label="卡号" prop="cid">
        <el-input v-model="cardInfo.cid" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="cardInfo.username" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="cardInfo.unit" />
      </el-form-item>
      <el-form-item label="类别" prop="type">
        <el-input v-model="cardInfo.type" />
      </el-form-item>
      <el-button type="primary" @click="create">创建</el-button>
      <el-button @click="clear()">清空表单</el-button>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

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
      cardRules: {
        cid: [
          { required: true, message: "请输入卡号", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (isNaN(Number(value))) {
                callback(new Error("卡号必须为数字"));
              } else {
                callback();
              }
            },
          },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        unit: [{ required: true, message: "请输入单元", trigger: "blur" }],
        type: [{ required: true, message: "请输入类别", trigger: "blur" }],
      },
    };
  },
  methods: {
    clear() {
      this.$refs["cardInfo"].resetFields();
    },
    async create() {
      this.$refs["cardInfo"].validate((valid) => {
        if (valid) {
          window.$.ajax("/lib/cards/create", {
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
        } else {
          console.log("error create!!");
        }
      });
    },
  },
};
</script>