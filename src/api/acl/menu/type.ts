// 菜单管理模块相关的ts类型

// 引入接口返回响应的统一ts类型
import type { responseData } from '@/api/user/type'

// 菜单列表的ts类型
export interface MenuData {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuList[]
  select: boolean
}

export type MenuList = MenuData[]

// 获取菜单后台响应返回的ts类型
export interface MenuResponseData extends responseData {
  data: MenuList
}

// 添加|修改菜单携带的参数ts类型
export interface MenuParams {
    code: string
    id?: number
    level: number
    name: string
    pid: number
}
