import type { App } from 'vue'
import Component from './index.vue'

// 导出组件
export default {
  install (app: App) {
    app.component('AppPagination', Component)
  }
}
