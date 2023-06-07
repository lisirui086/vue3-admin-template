// SKU相关的ts类型

// 引入通用响应ts类型，spu下已经定义过的SKU ts数据类型
import type { responseData } from '@/api/user/type'
import type { SkuData } from '@/api/product/spu/type'

// SKU完整数据ts类型
export interface SkuAllData extends SkuData {
  id: number
  isSale: number
  skuImageList: []
}

// 获取SKU列表接口返回的数据ts类型
export interface SkuResponseData extends responseData {
  data: {
    records: SkuAllData[]
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

