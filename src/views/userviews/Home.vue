<template>
  <div>
    <el-row justify="center">
      <el-avatar
        :size="100"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
    </el-row>
    <br />
    <el-row justify="center">
      <span>ID: {{ id }}</span
      ><br />
    </el-row>
    <br />
    <el-row justify="center">
      <span>用户名: {{ name }}</span>
    </el-row>
    <br />
    <el-row justify="center">
      <span
        >本月操作次数已达 <em>{{ operations }}</em> 次</span
      >
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HomeView",
  // data() {
  //   return {
  //     operations: 0,
  //   };
  // },
  computed: {
    ...mapState({
      name: (state) => state.administrator.user_name,
      id: (state) => state.administrator.user_id,
      operations: (state) => state.administrator.opNum,
    }),
  },
  methods: {
    // getOpNum() {
    //   window.$.ajax("/user/opNum", {
    //     method: "POST",
    //     data: { id: this.id },
    //     success(res) {
    //       this.operations = res.count;
    //       console.log(this.operations);
    //       return res.operations;
    //     },
    //   });
    //   console.log(this.operations)
    //   // this.operations++;
    // },
    ...mapActions(["getOpNum"]),
  },
  created() {
    // console.log("created")
    this.getOpNum();
  },
};
</script>