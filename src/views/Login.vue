<template>
  <el-row justify="center">
    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>登录</span>
          <el-button class="button" type="text" @click="toSignUp"
            >注册新账号</el-button
          >
        </div>
      </template>
      <el-form
        label-position="right"
        label-width="80px"
        :model="loginData"
        :rules="loginRules"
        hide-required-asterisk
        ref="form"
      >
        <el-form-item label="ID" prop="id">
          <el-input
            class="longinput"
            placeholder="请输入ID"
            v-model="loginData.id"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            class="longinput"
            placeholder="请输入密码"
            v-model="loginData.password"
            show-password
            @keyup.enter="submit"
          />
        </el-form-item>
        <el-button @click="submit">登录</el-button>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      loginData: {
        id: null,
        password: null,
      },
      loginRules: {
        id: [{ required: true, message: "请输入ID", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      login_status: (state) => state.administrator.login_status,
      user_id: (state) => state.administrator.user_id,
    }),
  },
  watch: {
    login_status(newStatus) {
      if (newStatus === true) {
        this.$router.push(`/user/${this.user_id}/home`);
      }
    },
  },
  methods: {
    async submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.login(this.loginData);
        } else {
          console.log("error submit!!");
        }
      });
    },
    toSignUp() {
      this.$router.push({ path: `/signup` });
    },
    ...mapActions(["login"]),
  },
};
</script>

<style scoped>
.card {
  width: 450px;
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>