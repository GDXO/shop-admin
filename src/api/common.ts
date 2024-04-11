/**
 * 公共请求接口
 */
import request from '@/utils/request'

import type { LoginInfoRes } from './types/common'

// 获取用户信息
export const getLoginInfo = () => request<LoginInfoRes>({
  method: 'GET',
  url: '/login/info'
})
