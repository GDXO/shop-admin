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
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="logoutFn">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts' setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { useStore } from '@/store/'
import { logout } from '@/api/login'

const router = useRouter()
const store = useStore()

const logoutFn = () => {
  // 退出提示
  ElMessageBox.confirm('确认退出吗?', '退出提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await logout()

    // 清除本地存储信息
    store.dispatch('triggerSetUserInfo', null)

    ElMessage.success('退出成功!')

    // 跳转到登录页面
    router.push('/login')
  }).catch(() => {
    ElMessage.info('已取消退出')
  })
}
</script>

<style lang='scss' scoped>
.el-dropdown {
  margin-left: 10px;
}
</style>
