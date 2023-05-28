// trademark接口

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入trademark ts类型
import type { TrademarkResponseData, Trademark } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  EDITTRADEMARK_URL = '/admin/product/baseTrademark/update',
  REMOVETRADEMARK_URL = '/admin/product/baseTrademark/remove/'
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) => requset.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
// 添加品牌
export const reqAddOrEditTrademark = (data: Trademark) => {
  // 判断data内是否携带id
  // 有id -> 修改品牌
  // 无id -> 添加品牌
  if (data.id) {
    // 修改
    return requset.put<any, any>(API.EDITTRADEMARK_URL, data)
  } else {
    // 新增
    return requset.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
// 删除品牌
export const reqRemoveTrademark = (id: number) => requset.delete<any, any>(API.REMOVETRADEMARK_URL+id)
