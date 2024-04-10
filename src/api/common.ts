/**
 * 公共请求接口
 */
import request from '@/utils/request'

import type { ILoginInfoRes } from './types/common'

export const getLoginInfo = () => request<ILoginInfoRes>({
  method: 'GET',
  url: '/login/info'
})
