<template>
  <el-icon
    class="handleMenuBtn"
    :size="16"
    @click="handleMenuCollapse"
  >
    <collapseIcon />
  </el-icon>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import {
  Expand,
  Fold
} from '@element-plus/icons-vue'

import { useStore } from '@/store/'

/* 菜单折叠功能 */
const store = useStore()
const collapseIcon = computed(() => {
  return store.state.isCollapse ? Expand : Fold
})
const handleMenuCollapse = () => {
  store.dispatch(
    'triggerChangeIsCollapse',
    !store.state.isCollapse
  )
}
</script>

<style lang='scss' scoped>
.handleMenuBtn {
  cursor: pointer;
}
</style>
