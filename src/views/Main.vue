<template>
  <el-container>
    <el-header>
      <HeaderView />
    </el-header>
    <el-container>
      <el-aside>
        <SideMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "@/components/SideMenu.vue";
import HeaderView from "@/components/Header.vue";

export default {
    name: "MainView",
    components: {
    SideMenu,
    HeaderView,
  }
};
</script>

<style>
.form {
  width: 800px;
}
</style>