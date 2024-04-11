import { RouterView, type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'order',
  component: RouterView,
  meta: {
    title: '订单'
  },
  children: [
    // 订单列表
    {
      path: 'list',
      name: 'orderList',
      component: async () => await import('@/views/order/list/index.vue'),
      meta: {
        title: '订单列表'
      }
    }
  ]
}

export default route
