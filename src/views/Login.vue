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
        hide-required-asterisk
        ref="form"
      >
        <el-form-item
          label="ID"
          prop="id"
          :rules="[{ required: true, message: 'ID不能为空' }]"
        >
          <el-input
            ref="id"
            class="longinput"
            placeholder="请输入ID"
            v-model.number="loginData.id"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            ref="password"
            class="longinput"
            placeholder="用户密码"
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
    };
  },
  computed: {
    ...mapState({
      login_status: state => state.administrator.login_status,
      user_id: state => state.administrator.user_id
    })
  },
  watch: {
    login_status(newStatus) {
      if (newStatus === true) {
        this.$router.push(`/user/${this.user_id}/home`)
      }
    }
  },
  methods: {
    async submit() {
        this.login(this.loginData);
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