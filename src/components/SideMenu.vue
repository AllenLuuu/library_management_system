<template>
  <el-menu :router="true">
    <el-menu-item index="home">
      <span>主页</span>
    </el-menu-item>
    <el-submenu index="store">
      <template #title>
        <span>图书入库</span>
      </template>
      <el-menu-item class="submenu-item" index="store-one">
        <span>单本入库</span>
      </el-menu-item>
      <el-menu-item class="submenu-item" index="store-batch">
        <span>批量入库</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="query">
      <span>图书查询</span>
    </el-menu-item>
    <el-menu-item index="borrow-admin">
      <span>借记管理</span>
    </el-menu-item>
    <el-submenu index="card">
      <template #title>
        <span>借阅证管理</span>
      </template>
      <el-menu-item class="submenu-item" index="card-add">
        <span>添加借阅证</span>
      </el-menu-item>
      <el-menu-item class="submenu-item" index="card-admin">
        <span>管理已有借阅证</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {};
</script>

<style>
.submenu-item {
  text-align: right;
}
</style>