<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>
          <AppHeader />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import AppMenu from './components/appMenu/index.vue'
import AppHeader from './components/appHeader/index.vue'
</script>

<style lang='scss' scoped>
.common-layout {
  height: 100vh;
  display: flex;

  .el-aside {
    background-color: #304156;
    width: auto;
  }

  .el-header {
    display: flex;
    align-items: center;
  }

  .el-main {
    background-color: #E8EEF4;
  }
}
</style>
