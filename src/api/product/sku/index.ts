// SKU相关的后台api

// 引入二次封装的axios
import requset from "@/utils/request"

// 引入SKU相关的ts类型
import type { SkuResponseData } from './type'

// SKU相关的API列表
enum API {
  // 获取SKU列表
  SKU_URL = '/admin/product/list/',
  // 上架
  SALE_URL = '/admin/product/onSale/',
  // 下架
  CANCELSALE_URL = '/admin/product/cancelSale/'
}

// 获取SKU
export const reqSkuList = (page: number, limit: number) => requset.get<any, SkuResponseData>(API.SKU_URL+`${page}/${limit}`)

// 将SKU上架
export const reqSaleSku = (skuId: number) => requset.get<any, any>(API.SALE_URL + skuId)

// 将SKU下架
export const reqCancelSaleSku = (skuId: number) => requset.get<any, any>(API.CANCELSALE_URL + skuId)

