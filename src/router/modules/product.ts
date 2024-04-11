import { RouterView, type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'product',
  component: RouterView,
  children: [
    // 商品列表
    {
      path: 'list',
      name: 'productList',
      component: async () => await import('@/views/product/list/index.vue')
    },
    // 商品分类
    {
      path: 'classify',
      name: 'productClassify',
      component: async () => await import('@/views/product/classify/index.vue')
    },
    // 商品规格
    {
      path: 'attr',
      name: 'productAttr',
      component: async () => await import('@/views/product/attr/index.vue')
    },
    // 商品评论
    {
      path: 'reply',
      name: 'productReply',
      component: async () => await import('@/views/product/reply/index.vue')
    }
  ]
}

export default route
