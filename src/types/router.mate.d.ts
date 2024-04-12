import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 动态面包屑
    requiresAuth?: boolean // 是否需要登录
  }
}

export {}
