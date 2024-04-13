/**
 * 管理员相关请求
 */
import type {
  TypeAdminFilterForm,
  TypeAdmin,
  TypeAdminPostData,
  TypeFormData
} from './types/admin'

import request from '@/utils/request'

// 获取管理员列表
export const getAdmins = (params: TypeAdminFilterForm) =>
  request<{
    count: number
    list: TypeAdmin[]
  }>({
    method: 'GET',
    url: '/setting/admin',
    params
  })

// 管理员添加
export const createAdmin = (data: TypeAdminPostData) =>
  request({
    method: 'POST',
    url: '/setting/admin',
    data
  })

// 管理员更新
export const updateAdmin = (id: number, data: TypeAdminPostData) =>
  request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })

// 管理员删除
export const deleteAdmin = (id: number) =>
  request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })

// 修改管理员状态
export const updateAdminStatus = (id: number, status: 0 | 1 | '') =>
  request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })

// 获取管理员角色列表
export const getRoles = () =>
  request<TypeFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(data => {
    const rules = data.rules.find(item => item.field === 'roles')

    if (rules && rules.options) {
      return rules.options
    } else {
      return []
    }
  })

// 根据管理员 ID 获取管理员信息
export const getAdminInfoFromID = (id: number) =>
  request<TypeFormData>({
    method: 'GET',
    url: `/setting/admin/${id}/edit`
  }).then(data => {
    const obj: Record<string, any> = {}

    data.rules.forEach(item => {
      obj[item.field] = item.value
    })

    return obj as TypeAdminPostData
  })
