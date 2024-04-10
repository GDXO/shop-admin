import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [ // 路由规则
  {
    path: '/',
    name: 'home',
    component: async () => await import('../views/Home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('../views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

export default router
