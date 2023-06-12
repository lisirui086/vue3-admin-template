// 角色管理模块相关的ts

// 引入统一后台数据响应返回的ts类型
import type { responseData } from '@/api/user/type'

// 引入acl/user下定义的NowUserRoleData
import type { NowUserRoleData } from '@/api/acl/user/type'

// 获取角色分页列表api响应的ts类型
export interface AllRoleResponseData extends responseData {
  data: {
    records: NowUserRoleData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 角色菜单的ts类型
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: null
  toCode: null
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}

export type MenuList = MenuData[]

// 获取角色菜单返回数据响应的ts类型
export interface MenuResponseData extends responseData {
  data: MenuList
}
