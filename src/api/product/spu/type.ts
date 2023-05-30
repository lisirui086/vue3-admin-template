// SPU管理模块的ts数据类型

// 引入user内定义的数据响应返回的数据ts类型
import type { responseData } from '@/api/user/type'

// SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
}

// SPU数据别名
type Spu = SpuData[]

// 已有SPU接口返回的数据ts类型
export interface HasSpuResponseData extends responseData {
  data: {
    records: Spu,
    total: number,
    size: number,
    current: number,
    searchCount: boolean
  }
}
