import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  if (response.data.status && response.data.status !== 200) {
    ElMessage.error(response.data.msg || '请求失败, 请联系管理员!')
    // 手动抛出一个错误
    return Promise.reject(response.data)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return (res.data.data || res.data) as T
}
