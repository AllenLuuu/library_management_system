<template>
  <el-row justify="center">
    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>注册新账号</span>
        </div>
      </template>
      <el-form
        label-position="right"
        label-width="80px"
        :model="signupData"
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
            v-model.number="signupData.id"
          />
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="name"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <el-input
            ref="name"
            class="longinput"
            placeholder="请输入用户名"
            v-model.number="signupData.name"
          />
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="contact"
          :rules="[{ required: true, message: '联系方式不能为空' }]"
        >
          <el-input
            ref="contact"
            class="longinput"
            placeholder="请输入联系方式"
            v-model.number="signupData.contact"
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
            placeholder="请输入密码"
            v-model="signupData.password"
            show-password
            @keyup.enter="submit"
          />
        </el-form-item>
        <el-form-item
          label="重复密码"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            ref="password"
            class="longinput"
            placeholder="请再次输入密码"
            v-model="signupData.passwordrepeated"
            show-password
            @keyup.enter="submit"
          />
        </el-form-item>
        <el-button @click="submit" type="primary">注册</el-button>
        <el-button @click="backToLogin">返回登录</el-button>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
import { mapActions, mapState } from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      signupData: {
        id: null,
        name: null,
        contact: null,
        password: null,
        passwordrepeated: null,
      },
    };
  },
  computed: {
    ...mapState({
      login_status: state => state.administrator.login_status,
      user_id: state => state.administrator.user_id
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
    submit() {
      if (this.signupData.password !== this.signupData.passwordrepeated) {
        ElMessage({
          message: "两次密码输入不一致",
          type: "warning",
        });
      } else {
        this.signUp(this.signupData);
      }
    },
    backToLogin() {
      this.$router.push("/login");
    },
    ...mapActions(["signUp"]),
  },
};
</script>

<style>
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