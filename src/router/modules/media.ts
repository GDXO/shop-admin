import { type RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'media',
  name: 'media',
  component: () => import('@/views/media/index.vue'),
  meta: {
    title: '媒体',
    requiresAuth: true
  }
}

export default route
