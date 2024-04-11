import { RouterView, type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'order',
  component: RouterView,
  children: [
    // 订单列表
    {
      path: 'list',
      name: 'orderList',
      component: async () => await import('@/views/order/list/index.vue')
    }
  ]
}

export default route
