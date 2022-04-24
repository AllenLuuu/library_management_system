<template>
  <el-row>
    <el-col :span="6"> </el-col>
    <el-col :span="12" class="title">
      <h1>图书管理系统</h1>
    </el-col>
    <el-col :span="3" class="welcome">
      <br>
      <div>你好，{{ user_name }}</div>
    </el-col>
    <el-col :span="3" class="signout">
      <el-button @click="log_out">注销</el-button>
    </el-col>
  </el-row>
</template>

<script>
import router from '@/router';
import { mapActions, mapState } from "vuex";

export default {
  name: "HeaderView",
  data() {
    return {};
  },
  computed: {
    // ...mapState("administrator", ["user_name"]),
    ...mapState({
      user_name: state=>state.administrator.user_name
    })
  },
  methods: {
    log_out() {
      this.logout()
      router.push("/login")
    },
    ...mapActions(["logout"])
  },
  created() {
    console.log(this.user_name)
  }
};
</script>

<style scoped>
/* .title {
  display: flex;
  font-size:large;
  text-align: center;
  justify-content: center;
} */
h1 {
  margin: 0px;
  font-size: xx-large;
}
.welcome {
  text-align:right;
  font-size: large;
}
.signout {
  height: 20px;
  margin-top: 10px;
}
</style>