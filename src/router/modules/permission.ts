import { RouterView, type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'permission',
  component: RouterView,
  meta: {
    title: '权限'
  },
  children: [
    // 角色
    {
      path: 'role',
      name: 'role',
      component: async () => await import('@/views/permission/role/index.vue'),
      meta: {
        title: '角色'
      }
    },
    // 管理员
    {
      path: 'admin',
      name: 'admin',
      component: async () => await import('@/views/permission/admin/index.vue'),
      meta: {
        title: '管理员'
      }
    },
    // 规则
    {
      path: 'rule',
      name: 'rule',
      component: async () => await import('@/views/permission/rule/index.vue'),
      meta: {
        title: '规则'
      }
    }
  ]
}

export default route
