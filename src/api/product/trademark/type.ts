// 品牌 trademark接口的参数类型

// 引入user.ts内的部接口返回的数据都拥有的ts类型
import type { responseData } from '@/api/user/type'

// 品牌参数类型
export interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}

// 包含全部品牌数据的ts类型
export type Records = Trademark[]

// 获取已有品牌数据的参数类型
export interface TrademarkResponseData extends responseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
