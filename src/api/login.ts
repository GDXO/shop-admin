/**
 * 登录相关请求
 */
import request from '@/utils/request'
import { type LoginResponse } from './types/login'

// 获取登录验证码图片
export const getCaptcha = () => request<Blob>({
  method: 'GET',
  url: '/captcha_pro',
  responseType: 'blob', // 请求获取图片数据
  params: { // 放置缓存, 添加时间戳
    stamp: Date.now()
  }
})

// 登录
export const login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => request<LoginResponse>({
  method: 'POST',
  url: '/login',
  data
})

// 登出
export const logout = () => request({
  method: 'GET',
  url: '/setting/admin/logout'
})
