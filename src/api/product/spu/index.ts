// SPU管理模块相关的api接口

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入SPU管理模块相关的ts类型
import type {
  HasSpuResponseData,
  AllTrademarkResponse,
  SpuImageListResponse,
  SaleAttrResponse,
  SaleOptionsResponse,
  SpuData,
  SkuData,
  SkuInfoDataResponse,
} from './type'

// 所有接口
enum API {
  // 已有的SPU数据列表
  HASSPU_URL = '/admin/product/',
  // 获取所有品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某一个SPU下的全部图片
  SPUIAMGE_URL = '/admin/product/spuImageList/',
  // 获取某个SPU下所有销售属性
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 保存新的spu
  SAVESPU_URL = '/admin/product/saveSpuInfo',
  // 修改已有的SPU
  EDITSPU_URL = '/admin/product/updateSpuInfo',
  // 添加新的SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看某一个SPU下全部售卖的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除已有的SPU
  REMOVESKU_URL = '/admin/product/deleteSpu/',
}

// 获取已有SPU列表
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  requset.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
// 获取所有品牌数据
export const reqAllTrademark = () =>
  requset.get<any, AllTrademarkResponse>(API.ALLTRADEMARK_URL)

// 获取某个SPU下的全部图片
export const reqSpuImage = (spuId: number) =>
  requset.get<any, SpuImageListResponse>(API.SPUIAMGE_URL + spuId)

// 获取某个SPU下全部销售属性
export const reqSpuSaleAttr = (spuId: number) =>
  requset.get<any, SaleAttrResponse>(API.SPUHASSALEATTR_URL + spuId)

// 获取整个项目的销售属性
export const reqAllSaleAttr = () =>
  requset.get<any, SaleOptionsResponse>(API.ALLSALEATTR_URL)

// 添加 or 修改SPU
export const reqAddOrEditSpu = (data: SpuData) => {
  if (data.id) {
    // 修改
    return requset.post<any, any>(API.EDITSPU_URL, data)
  } else {
    // 添加
    return requset.post<any, any>(API.SAVESPU_URL, data)
  }
}

// 添加SKU
export const reqAddSku = (data: SkuData) =>
  requset.post<any, any>(API.ADDSKU_URL, data)

// 查看某个SPU下全部售卖的商品
export const reqSkuList = (spuId: number | string) =>
  requset.get<any, SkuInfoDataResponse>(API.SKUINFO_URL + spuId)

// 删除已有的SPU
export const reqRemoveSku = (spuId: number | string) =>
  requset.delete<any, any>(API.REMOVESKU_URL + spuId)
