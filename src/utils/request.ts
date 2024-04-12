import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store/'
import router from '@/router/'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

/* 请求拦截器 */
request.interceptors.request.use(function (config) {
  // 统一设置用户 token
  const userinfo = store.state.userInfo

  if (userinfo && userinfo.token) {
    config.headers.Authorization = `Bearer ${userinfo.token}`
  }
  return config
})

/* 响应拦截器 */
// 控制处理登录过期的锁
let isResolveTokenExpiredLock = false
request.interceptors.response.use(function (response) {
  const status = response.data.status

  /* 正确的情况 */
  if (!status || status === 200) {
    return response
  }

  /* 错误的情况 */
  // token 过期
  if (status === 410000) {
    // 正在处理将
    if (isResolveTokenExpiredLock) return Promise.reject(response)

    // 将锁开启
    isResolveTokenExpiredLock = true

    ElMessageBox.confirm(
      '登录状态已过期, 您可以继续停留在此页面, 或确认重新登录!',
      '系统提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消'
      }
    ).then(() => {
      // 清除过期的状态
      store.dispatch('triggerSetUserInfo', null)

      // 跳转到登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      })
    }).catch(() => {
      ElMessage.info('已取消, 继续停留在该页面!')
    }).finally(() => {
      // 关闭锁
      isResolveTokenExpiredLock = false
    })

    // 抛出异常
    return Promise.reject(response)
  }

  // 其他情况
  ElMessage.error(response.data.msg || '请求失败, 请联系管理员!')
  // 手动抛出一个错误
  return Promise.reject(response)
}, function (error) {
  return Promise.reject(error)
})

export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return (res.data.data || res.data) as T
}
