import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config
})

// 相应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return res.data.data as T
}
