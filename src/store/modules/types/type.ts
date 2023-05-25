// 路由类型
import { RouteRecordRaw } from 'vue-router'

// 定义小仓库state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  avatar: string
  username: string
}
