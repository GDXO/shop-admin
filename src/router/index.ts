import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store/'

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
          title: '首页',
          requiresAuth: true
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

// 路由全局前置守卫
router.beforeEach(to => {
  // 加载进度条
  nprogress.start()

  // 权限验证
  if (to.meta.requiresAuth && !store.state.userInfo) {
    return {
      path: '/login',
      // 保存所在的位置, 以便登录后再回来
      query: {
        redirect: to.fullPath
      }
    }
  }
})

// 路由全局后置守卫
router.afterEach(() => {
  // 结束页面加载条
  nprogress.done()
})

export default router
