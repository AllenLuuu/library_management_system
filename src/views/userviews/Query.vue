<template>
  <div>
    <div class="form" v-if="search">
      <el-form
        :model="bookInfo"
        ref="bookInfo"
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
        <el-form-item label="年份" prop="year">
          <el-date-picker
            v-model="bookInfo.start_year"
            type="year"
            value-format="YYYY"
            placeholder="请选择起始年份"
            style="width: 48.3%"
          />
          至
          <el-date-picker
            v-model="bookInfo.end_year"
            type="year"
            value-format="YYYY"
            placeholder="请选择终止年份"
            style="width: 48.3%"
          />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="bookInfo.author" />
        </el-form-item>
        <el-form-item label="价格区间" prop="price">
          <el-input
            v-model="bookInfo.start_price"
            style="width: 48.3%"
            placeholder="请输入最低价"
          />
          至
          <el-input
            v-model="bookInfo.end_price"
            style="width: 48.3%"
            placeholder="请输入最高价"
          />
        </el-form-item>
        <el-button type="primary" @click="searchBook">查询</el-button>
        <el-button @click="clear()">清空表单</el-button>
      </el-form>
    </div>

    <div v-if="show">
      <el-table
        :data="books"
        :default-sort="{ prop: 'title', order: 'descending' }"
        style="width: 100%"
        max-height="500px"
      >
      <el-table-column prop="bno" label="书号" sortable />
      <el-table-column prop="type" label="分类" sortable />
      <el-table-column prop="title" label="书名" sortable />
      <el-table-column prop="press" label="出版社" sortable />
      <el-table-column prop="year" label="年份" sortable />
      <el-table-column prop="author" label="作者" sortable />
      <el-table-column prop="price" label="价格" sortable />
      <el-table-column prop="total" label="总量" sortable />
      <el-table-column prop="stock" label="库存" sortable />
      </el-table>
      <el-button @click="backToSearch">返回查询</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "QueryView",
  data() {
    return {
      bookInfo: {
        bno: null,
        type: null,
        title: null,
        press: null,
        start_year: null,
        end_year: null,
        author: null,
        start_price: null,
        end_price: null,
      },
      search: true,
      show: false,
    };
  },
  computed: {
    ...mapState({
      books: (state) => state.books.books,
    }),
  },
  methods: {
    searchBook() {
      //发送请求，渲染数据
      let operation = "[Op.and]: {\n";
      for (let key in this.bookInfo) {
        if (this.bookInfo[key] != null && this.bookInfo[key] != "") {
          if (key == "start_year") {
            if (this.bookInfo.end_year != null) {
              operation += `year: { [Op.between]: [${this.bookInfo.start_year}, ${this.bookInfo.end_year}] },\n`;
            } else {
              operation += `year: { [Op.gte]: ${this.bookInfo.start_year} },\n`;
            }
          } else if (key == "end_year") {
            if (this.bookInfo.start_year == null) {
              operation += `year: { [Op.lte]: ${this.bookInfo.end_year} },\n`;
            }
          } else if (key == "start_price") {
            if (this.bookInfo.end_price != null) {
              operation += `price: { [Op.between]: [${this.bookInfo.start_price}, ${this.bookInfo.end_price}] },\n`;
            } else {
              operation += `price: { [Op.gte]: ${this.bookInfo.start_price} },\n`;
            }
          } else if (key == "end_price") {
            if (this.bookInfo.start_price == null) {
              operation += `price: { [Op.lte]: ${this.bookInfo.end_price} },\n`;
            }
          } else {
            operation += key + `: { [Op.like]: "%${this.bookInfo[key]}%" },\n`;
          }
        }
      }
      operation += "}";
      console.log(operation);
      this.query(operation);

      //显示表单
      this.search = false;
      this.show = true;
    },
    backToSearch() {
      this.search = true;
      this.show = false;
    },
    clear() {
      this.$refs["bookInfo"].resetFields();
      this.bookInfo.start_year =
        this.bookInfo.end_year =
        this.bookInfo.start_price =
        this.bookInfo.end_price =
          null;
    },
    ...mapActions(["query"]),
  },
};
</script>