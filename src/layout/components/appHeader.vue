<template>
  <el-icon
    class="handleMenuBtn"
    :size="16"
    @click="handleMenuCollapse"
  >
    <collapseIcon />
  </el-icon>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      首页
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      面包屑1
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      面包屑2
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      面包屑3
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang='ts' setup>
import {
  Expand,
  Fold
} from '@element-plus/icons-vue'
import { computed } from 'vue'

import { useStore } from '@/store/'

const store = useStore()
const collapseIcon = computed(() => {
  return store.state.isCollapse ? Expand : Fold
})

const handleMenuCollapse = () => {
  store.dispatch('triggerChangeIsCollapse', !store.state.isCollapse)
}
</script>

<style lang='scss' scoped>
.handleMenuBtn {
  cursor: pointer;
}

.el-breadcrumb {
  margin-left: 10px;
}
</style>
