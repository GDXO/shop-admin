import { RouterView, type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'permission',
  component: RouterView,
  children: [
    // 角色
    {
      path: 'role',
      name: 'role',
      component: async () => await import('@/views/permission/role/index.vue')
    },
    // 管理员
    {
      path: 'admin',
      name: 'admin',
      component: async () => await import('@/views/permission/admin/index.vue')
    },
    // 规则
    {
      path: 'rule',
      name: 'rule',
      component: async () => await import('@/views/permission/rule/index.vue')
    }
  ]
}

export default route
