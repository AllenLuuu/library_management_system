<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="12">
      <!-- 搜索框 -->
      <el-form :model="borrow">
        <el-form-item
          label="卡号"
          prop="cid"
          style="max-width: 400px"
          :rules="[{ required: true, message: '卡号不能为空' }]"
        >
          <el-input type="text" v-model="borrow.cid">
            <template #append>
              <el-button @click="searchBorrowed"> 搜索 </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table v-if="showBorrowed" :data="borrowedBooks" style="width: 100%" max-height="450px">
        <el-table-column fixed="left" prop="bno" label="书号" />
        <el-table-column prop="title" label="书名" />
        <el-table-column prop="type" label="分类" />
        <el-table-column prop="press" label="出版社" />
        <el-table-column prop="author" label="作者" />
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="returnScope">
            <el-button
              type="text"
              size="small"
              @click="return_book(returnScope.$index)"
              >归还</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col :span="12">
      <!-- 搜索框 -->
      <el-form :model="borrow">
        <el-form-item label="书号" style="max-width: 400px">
          <el-input type="text" v-model="borrow.bno">
            <template #append>
              <el-button @click="getBooks"> 搜索 </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table v-if="showBooks" :data="books" style="width: 100%" max-height="450px">
        <el-table-column fixed="left" prop="bno" label="书号" />
        <el-table-column prop="title" label="书名" />
        <el-table-column prop="type" label="分类" />
        <el-table-column prop="author" label="作者" />
        <el-table-column prop="total" label="总量" />
        <el-table-column prop="stock" label="库存" />
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="borrowScope">
            <el-button
              type="text"
              size="small"
              @click="borrow_book(borrowScope.$index)"
              >借阅</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
import { mapActions, mapMutations, mapState } from "vuex";
// import { Search } from '@element-plus/icons-vue'

export default {
  name: "BorrowView",
  data() {
    return {
      borrow: {
        cid: null,
        bno: null,
      },
      showBorrowed: false,
      showBooks: false,
    };
  },
  computed: {
    ...mapState({
      borrowedBooks: (state) => state.borrow.borrowedBooks,
      books: (state) => state.books.books,
      operatorID: (state) => state.administrator.user_id,
    }),
  },
  methods: {
    searchBorrowed() {
      if (this.borrow.cid == null || this.borrow.cid == "") {
        ElMessage({
          message: "请先输入卡号",
          type: "warning",
        });
      } else {
        this.showBorrowed = true;
        this.getBorrowedBooks({ cid: this.borrow.cid });
      }
    },
    getBooks() {
      if (this.borrow.cid == null || this.borrow.cid == "") {
        ElMessage({
          message: "请先输入卡号",
          type: "warning",
        });
      } else {
        this.showBooks = true;
        this.getQueriedBooks({ cid: this.borrow.cid, bno: this.borrow.bno });
      }
    },
    return_book(index) {
      // console.log(this.borrowedBooks[index].bno);
      let returnData = {
        bno: this.borrowedBooks[index].bno,
        cid: this.borrow.cid,
      };
      // console.log(this.borrow.cid);
      this.returnBook({ returnData, queriedBno: this.borrow.bno });
    },
    borrow_book(index) {
      if (this.books[index].stock == 0) {
        ElMessage({
          message: "本书已无库存",
          type: "error",
        });
      } else {
        let borrowData = {
          bno: this.books[index].bno,
          cid: this.borrow.cid,
          operatorID: this.operatorID,
        };
        this.borrowBook({ borrowData, queriedBno: this.borrow.bno });
      }
    },
    ...mapMutations(["setBooks", "setBorrowedBooks"]),
    ...mapActions([
      "getBorrowedBooks",
      "borrowBook",
      "returnBook",
      "getQueriedBooks",
    ]),
  },
  mounted() {
    this.setBorrowedBooks([]);
    this.setBooks([]);
    this.showBorrowed = this.showBooks = false;
  },
};
</script>