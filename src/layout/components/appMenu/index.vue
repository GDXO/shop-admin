<template>
  <el-menu
    active-text-color="#2489F4"
    background-color="#304156"
    class="appMenuBox"
    :default-active="currentPath"
    text-color="#fff"
    router
    :collapse="isCollapse"
    @select="menuSelectFn"
  >
    <el-menu-item index="/">
      <el-icon><HomeFilled /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-sub-menu index="product">
      <template #title>
        <el-icon><Goods /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/list">
        <el-icon><List /></el-icon>
        <span>商品管理</span>
      </el-menu-item>
      <el-menu-item index="/product/classify">
        <el-icon><Box /></el-icon>
        <span>商品分类</span>
      </el-menu-item>
      <el-menu-item index="/product/attr">
        <el-icon><TakeawayBox /></el-icon>
        <span>商品规格</span>
      </el-menu-item>
      <el-menu-item index="/product/reply">
        <el-icon><Star /></el-icon>
        <span>商品评论</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><ShoppingCartFull /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        <el-icon><List /></el-icon>
        <span>订单列表</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon><VideoCamera /></el-icon>
      <span>媒体</span>
    </el-menu-item>
    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        <el-icon><User /></el-icon>
        <span>角色</span>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <el-icon><Management /></el-icon>
        <span>管理员</span>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <el-icon><Paperclip /></el-icon>
        <span>权限规则</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store/'
import {
  HomeFilled,
  Goods,
  List,
  TakeawayBox,
  Box,
  Star,
  ShoppingCartFull,
  VideoCamera,
  Setting,
  User,
  Management,
  Paperclip
} from '@element-plus/icons-vue'

import { getItem } from '@/utils/storage'
import { USER_INFO } from '@/utils/constants'

/* 公共变量 */
const router = useRouter()
const route = useRoute()

/* 菜单折叠 */
const store = useStore()
const isCollapse = computed(() => store.state.isCollapse)

/* 默认选中路由 */
if (typeof route.query.redirect !== 'string') {
  route.query.redirect = '/'
}
const currentPath = router.currentRoute.value.path || route.query.redirect

/* 菜单选择事件 */
const menuSelectFn = () => {
  // 查询有无登录信息和权限信息
  if (router.currentRoute.value.meta && !getItem(USER_INFO)) {
    ElMessage.info('登录信息缺失, 即将跳转到登录页面!')

    router.push({
      name: 'login',
      query: {
        redirect: currentPath
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border: none;

  &.appMenuBox:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
