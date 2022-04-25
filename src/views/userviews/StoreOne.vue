<template>
  <div class="form">
    <el-form
      :model="bookInfo"
      ref="bookInfo"
      :rules="storeRules"
      label-width="100px"
    >
      <el-form-item label="书号" prop="bno">
        <el-input v-model="bookInfo.bno" />
      </el-form-item>
      <el-form-item label="分类" prop="type">
        <el-input v-model="bookInfo.type" />
      </el-form-item>
      <el-form-item label="书名" prop="title">
        <el-input v-model="bookInfo.title" />
      </el-form-item>
      <el-form-item label="出版社" prop="press">
        <el-input v-model="bookInfo.press" />
      </el-form-item>
      <el-form-item label="出版年份" prop="year">
        <el-date-picker
          v-model="bookInfo.year"
          type="year"
          format="YYYY"
          value-format="YYYY"
          placeholder="请选择出版年份"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="bookInfo.author" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="bookInfo.price" />
      </el-form-item>
      <el-form-item label="数量" prop="amount">
        <el-input v-model="bookInfo.amount" />
      </el-form-item>
      <el-button type="primary" @click="store">入库</el-button>
      <el-button @click="clear()">清空表单</el-button>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "StoreOne",
  data() {
    return {
      bookInfo: {
        bno: null,
        type: null,
        title: null,
        press: null,
        year: null,
        author: null,
        price: null,
        amount: null,
      },
      storeRules: {
        bno: [
          { required: true, message: "书号不能为空", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (isNaN(Number(value))) {
                callback(new Error("书号必须为数字"));
              } else {
                callback();
              }
            },
          },
        ],
        type: [{ required: true, message: "分类不能为空", trigger: "blur" }],
        title: [{ required: true, message: "书名不能为空", trigger: "blur" }],
        press: [{ required: true, message: "出版社不能为空", trigger: "blur" }],
        year: [
          { required: true, message: "出版年份不能为空", trigger: "blur" },
        ],
        author: [{ required: true, message: "作者不能为空", trigger: "blur" }],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (isNaN(Number(value))) {
                callback(new Error("价格必须为数字"));
              } else {
                callback();
              }
            },
          },
        ],
        amount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (isNaN(Number(value))) {
                callback(new Error("数量必须为数字"));
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
  methods: {
    async store() {
      this.$refs["bookInfo"].validate((valid) => {
        if (valid) {
          window.$.ajax("/book/store", {
            method: "POST",
            data: this.bookInfo,
            success() {
              ElMessage({
                message: "入库成功",
                type: "success",
              });
            },
            error: (jqXHR, textStatus, errorThrown) => {
              ElMessage({
                message: "入库失败" + errorThrown,
                type: "error",
              });
            },
          });
        } else {
          console.log("error store!!");
        }
      });
    },
    clear() {
      this.$refs["bookInfo"].resetFields();
    },
  },
};
</script>