/**
 * 角色相关 API
 */
import type {
  TypeEditRole,
  TypeListParams,
  TypeMenu,
  TypeRole,
  TypeRolePostData
} from './types/role'

import request from '@/utils/request'

// 获取角色列表
export const getRoles = (params: TypeListParams) =>
  request<{
    count: number
    list: TypeRole[]
  }>({
    method: 'GET',
    url: '/setting/role',
    params
  })

// 删除角色
export const deleteRole = (id: number) =>
  request({
    method: 'DELETE',
    url: `/setting/role/${id}`
  })

// 获取角色权限菜单
export const getMenus = () =>
  request<{
    menus: TypeMenu[]
  }>({
    method: 'GET',
    url: '/setting/role/create'
  })

// 保存角色
export const saveRole = (id: number, data: TypeRolePostData) =>
  request({
    method: 'POST',
    url: `/setting/role/${id}`,
    data
  })

// 根据角色 ID 获取角色信息
export const getRoleById = (id: number) =>
  request<{
    role: TypeEditRole
    menus: TypeMenu[]
  }>({
    method: 'GET',
    url: `/setting/role/${id}/edit`
  })
