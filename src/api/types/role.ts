export interface TypeRole {
  id: number
  role_name: string
  rules: string
  level: number
  status: 0 | 1
  statusLoading?: boolean
}

export interface TypeListParams {
  page: number
  limit: number
  status: 0 | 1 | ''
  role_name: string
}

export interface TypeRolePostData {
  role_name: string
  status: 0 | 1
  checked_menus: number[]
}

export interface TypeEditRole {
  id: number
  level: number
  role_name: string
  rules: string
  status: 0 | 1
}

export interface TypeMenu {
  pid: number
  id: number
  title: string
  expand: boolean
  children?: TypeMenu[]
}
