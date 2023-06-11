// SPU管理模块的ts数据类型

// 引入user内定义的数据响应返回的数据ts类型
import type { responseData } from '@/api/user/type'

// 引入trademark 内定义的品牌数据ts类型
import type { Records } from '@/api/product/trademark/type'

// SPU数据的ts类型
export interface SpuData {
  id?: number
  spuName?: string
  description: string
  category3Id?: number | string
  tmId?: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImage[]
  spuId?: number
}

// SPU数据别名
export type Spu = SpuData[]

// 已有SPU接口返回的数据ts类型
export interface HasSpuResponseData extends responseData {
  data: {
    records: Spu
    total: number
    size: number
    current: number
    searchCount: boolean
  }
}

// 获取品牌信息响应的ts类型
export interface AllTrademarkResponse extends responseData {
  data: Records
}
// 某个SPU下的图片ts类型
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  name?: string
  url?: string
  select?: boolean | null
}

// 获取SPU下图片响应的ts类型
export interface SpuImageListResponse extends responseData {
  data: SpuImage[]
}

// 某个SPU下所有销售属性
export interface SaleAttrValue {
  id?: number
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null | boolean
}

// 设置别名
export type SpuSaleAttrValueList = SaleAttrValue[]

// 销售属性对象的 ts类型
export interface SaleAttr {
  id?: number
  flag?: boolean
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  saleAttrValue?: string
  saleIdAndValueId?: string
}

// 销售属性数据响应的ts类型
export interface SaleAttrResponse extends responseData {
  data: SaleAttr[]
}

// 整个项目的销售属性ts类型
export interface SaleOptions {
  id: number
  name: string
  createTime: string | null
  updateTime: string | null
}

// 获取整个项目的销售属性响应的ts类型
export interface SaleOptionsResponse extends responseData {
  data: SaleOptions[]
}

// SKU的销售属性
export interface SkuSale {
  saleAttrId: number | string
  saleAttrValueId: number | string
  saleAttrName?: string
  saleAttrValueName?: string
}
// SKU的平台属性
export interface SkuAttr {
  attrId: number | string
  valueId: number | string
  attrName?: string
  valueName?: string
}

// SKU数据内容
export interface SkuData {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuAttrValueList?: SkuAttr[]
  skuDefaultImg: string
  skuSaleAttrValueList?: SkuSale[]
}

// 获取SPU下全部售卖商品数据的响应结果
export interface SkuInfoDataResponse extends responseData {
  data: SkuData[]
}
