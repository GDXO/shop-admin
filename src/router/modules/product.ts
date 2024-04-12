import { RouterView, type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'product',
  component: RouterView,
  meta: {
    title: '商品',
    requiresAuth: true
  },
  children: [
    // 商品列表
    {
      path: 'list',
      name: 'productList',
      component: async () => await import('@/views/product/list/index.vue'),
      meta: {
        title: '商品列表'
      }
    },
    // 商品分类
    {
      path: 'classify',
      name: 'productClassify',
      component: async () => await import('@/views/product/classify/index.vue'),
      meta: {
        title: '商品分类'
      }
    },
    // 商品规格
    {
      path: 'attr',
      name: 'productAttr',
      component: async () => await import('@/views/product/attr/index.vue'),
      meta: {
        title: '商品规格'
      }
    },
    // 商品评论
    {
      path: 'reply',
      name: 'productReply',
      component: async () => await import('@/views/product/reply/index.vue'),
      meta: {
        title: '商品评论'
      }
    }
  ]
}

export default route
