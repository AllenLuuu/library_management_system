<template>
  <div>
    <el-form inline>
      <el-form-item label="卡号">
        <el-input v-model="cid" />
      </el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
    </el-form>
    <el-table :data="cards" max-height="500px">
      <el-table-column prop="cid" label="卡号" sortable />
      <el-table-column prop="name" label="姓名" sortable />
      <el-table-column prop="unit" label="单位" sortable />
      <el-table-column prop="type" label="类别" sortable />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteCard(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CardAdmin",
  data() {
    return {
      cid: null,
    };
  },
  computed: mapState({
    cards: (state) => state.cards.cards,
  }),
  methods: {
    search() {
      this.cardSearch({ cid: this.cid });
    },
    deleteCard(index) {
      this.cardDelete({ cid: this.cards[index].cid, currentQuery: this.cid });
    },
    ...mapActions(["cardSearch", "cardDelete"]),
  },
  created() {
    // console.log("mounted");
    this.cardSearch({ cid: null });
  },
};
</script>

<style>
</style>