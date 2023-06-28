// 路由类型
import { RouteRecordRaw } from 'vue-router'

// 属性管理的ts类型
import type { CategoryObj } from '@/api/product/attr/type'

// 定义 user 小仓库state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  avatar: string
  username: string
  buttons: string[]
}

// 定义 category 小仓库state类型
export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
  c2Arr: CategoryObj[]
  c2Id: number | string
  c3Arr: CategoryObj[]
  c3Id: number | string
}
