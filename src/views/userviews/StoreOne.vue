<template>
  <div class="form">
    <el-form
      :model="bookInfo"
      ref="bookInfo"
      :label-position="left"
      label-width="100px"
    >
      <el-form-item
        label="书号"
        prop="bno"
        :rules="[{ required: true, message: '书号不能为空' }]"
      >
        <el-input v-model="bookInfo.bno" />
      </el-form-item>
      <el-form-item
        label="分类"
        prop="type"
        :rules="[{ required: true, message: '分类不能为空' }]"
      >
        <el-input v-model="bookInfo.type" />
      </el-form-item>
      <el-form-item
        label="书名"
        prop="title"
        :rules="[{ required: true, message: '书名不能为空' }]"
      >
        <el-input v-model="bookInfo.title" />
      </el-form-item>
      <el-form-item
        label="出版社"
        prop="press"
        :rules="[{ required: true, message: '出版社不能为空' }]"
      >
        <el-input v-model="bookInfo.press" />
      </el-form-item>
      <el-form-item
        label="出版年份"
        prop="year"
        :rules="[{ required: true, message: '出版年份不能为空' }]"
      >
        <el-date-picker
          v-model="bookInfo.year"
          type="year"
          format="YYYY"
          value-format="YYYY"
          placeholder="请选择出版年份"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item
        label="作者"
        prop="author"
        :rules="[{ required: true, message: '作者不能为空' }]"
      >
        <el-input v-model="bookInfo.author" />
      </el-form-item>
      <el-form-item
        label="价格"
        prop="price"
        :rules="[{ required: true, message: '价格不能为空' }]"
      >
        <el-input v-model="bookInfo.price" />
      </el-form-item>
      <el-form-item
        label="数量"
        prop="amount"
        :rules="[{ required: true, message: '数量不能为空' }]"
      >
        <el-input v-model="bookInfo.amount" />
      </el-form-item>
      <el-button type="primary" @click="store">入库</el-button>
      <el-button @click="clear()">清空表单</el-button>
    </el-form>
  </div>
</template>

<script>
import Axios from "@/utils/Axios";
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
    };
  },
  methods: {
    async store() {
      try {
        await Axios.post("/book/store", this.bookInfo);
        ElMessage({
          message: "入库成功",
          type: "success",
        });
      } catch (e) {
        ElMessage({
          message: "入库失败",
          type: "error",
        });
        throw e;
      }
    },
    clear() {
      this.$refs["bookInfo"].resetFields();
    },
  },
};
</script>