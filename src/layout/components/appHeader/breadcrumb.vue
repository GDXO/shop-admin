<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item of routes"
      :key="item.path"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

/* 动态面包屑 */
const router = useRouter()
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(
    item => item.meta && item.meta.title
  )
})
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  margin-left: 10px;
  flex: 1;
}
</style>
