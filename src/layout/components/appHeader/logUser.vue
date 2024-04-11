<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{ $store.state.userInfo?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>用户名</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<style lang='scss' scoped>
.el-dropdown {
  margin-left: 10px;
}
</style>
