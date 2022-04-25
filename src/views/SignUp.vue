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
        :rules="signupRules"
        status-icon
        hide-required-asterisk
        ref="form"
      >
        <el-form-item label="ID" prop="id">
          <el-input
            class="longinput"
            placeholder="请输入ID"
            v-model="signupData.id"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input
            class="longinput"
            placeholder="请输入用户名"
            v-model="signupData.name"
          />
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input
            class="longinput"
            placeholder="请输入联系方式"
            v-model="signupData.contact"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            class="longinput"
            placeholder="请输入密码"
            v-model="signupData.password"
            show-password
          />
        </el-form-item>
        <el-form-item label="重复密码" prop="passwordrepeated">
          <el-input
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
// import { ElMessage } from "element-plus";
import { mapActions, mapState } from "vuex";
export default {
  name: "SignUp",
  data() {
    let checkID = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入ID"));
      } else {
        if (isNaN(Number(value))) {
          callback(new Error("ID必须为数字值"));
        } else {
          callback();
        }
      }
    };
    let checkPassRepeated = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else {
        if (value !== this.signupData.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      }
    };
    return {
      signupData: {
        id: null,
        name: null,
        contact: null,
        password: null,
        passwordrepeated: null,
      },
      signupRules: {
        id: [{ validator: checkID, trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        contact: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwordrepeated: [{ validator: checkPassRepeated, trigger: "blur" }],
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
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.signUp(this.signupData);
        } else {
          console.log("error signup!!");
        }
      });
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