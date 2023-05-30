// SPU管理模块相关的api接口

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入SPU管理模块相关的ts类型
import type { HasSpuResponseData } from './type'

// 所有接口
enum API {
  // 已有的SPU数据列表
  HASSPU_URL = '/admin/product/',
}

// 获取已有SPU列表
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string
) => requset.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
