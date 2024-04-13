import type { FormItemRule } from 'element-plus'

export interface TypeAdminFilterForm {
  page: number
  limit: number
  name: string
  roles: string
  status: 0 | 1 | ''
}

export interface TypeAdmin {
  id: number
  account: string
  head_pic: string
  pwd: string
  real_name: string
  roles: string
  last_ip: string
  last_time: number
  add_time: number
  login_count: number
  level: number
  status: number
  is_del: number
  _add_time: string
  _last_time: string
  statusLoading?: boolean
}

export interface TypeAdminPostData {
  account: string
  conf_pwd: string
  pwd: string
  roles: number[]
  status: 0 | 1
  real_name: string
}

export interface TypeSelectOptions {
  label: string
  value: number
}

export interface TypeFormRule {
  title: string
  field: string
  props?: Record<string, any>
  type: string
  validate?: FormItemRule[]
  value: string
  options?: TypeSelectOptions[]
}

export interface TypeFormData {
  action: string
  info: string
  method: string
  status: boolean
  title: string
  rules: TypeFormRule[]
}
