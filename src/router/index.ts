import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import AppLayout from '@/layout/AppLayout.vue'
import productRoute from './modules/product'
import orderRoute from './modules/order'
import mediaRoute from './modules/media'
import permissionRote from './modules/permission'

const routes: RouteRecordRaw[] = [ // 路由规则
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: async () => await import('@/views/Home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      productRoute,
      orderRoute,
      mediaRoute,
      permissionRote
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

export default router
