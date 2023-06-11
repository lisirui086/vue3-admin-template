// 权限管理下的用户相关的ts数据类型

// 引入User 下的接口返回的ts类型
import { responseData } from '@/api/user/type'

// 用户信息ts类型
export interface UserData {
  id?: number | string
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: number | null | string
  roleName?: string
}

// 获取用户列表接口返回的ts类型
export interface UserListResponseData extends responseData {
  data: {
    records: UserData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: number
    maxLimit: number
    searchCount: boolean
    pages: number
  }
}

// 某一用户现已有职位
export interface NowUserRoleData {
  id?: string | number
  createTime?: string
  updateTime?: string
  roleName?: string
  remark?: string
}

export type nowRole = NowUserRoleData[]

// 所有职位
export interface AllRoleData {
  id: string | number
  createTime: string
  updateTime: string
  roleName: string
  remark: string
}

export type allRole = AllRoleData[]

// 根据用户获取角色数据返回的数据ts类型
export interface UserRoleResponseData extends responseData {
  data: {
    assignRoles: nowRole
    allRolesList: allRole
  }
}

// 根据用户分配角色的ts类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
