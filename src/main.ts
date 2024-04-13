import { createApp, type Plugin } from 'vue'
import App from './App.vue'
import router from './router/'
import { store, key } from './store/'
import elementPlus from '@/plugins/element-plus'

// 加载全局样式
import '@/styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(store, key)
app.use(elementPlus)

// 加载全局组件
const modules = import.meta.glob('./components/**/index.ts')
for (const path in modules) {
  const module = await modules[path]() as { default: Plugin }

  app.use(module.default)
}

app.mount('#app')
