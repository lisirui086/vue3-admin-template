// 属性管理相关的api接口

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入属性管理相关的ts类型
import type { CategoryResponseData, AttrResponseData, AttrList } from './type'

// api集合
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDOREDITATTR_URL = '/admin/product/saveAttrInfo',
  REMOVEATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类列表
export const reqC1 = () => requset.get<any, CategoryResponseData>(API.C1_URL)
// 获取二级分类列表
export const reqC2 = (category1Id: number | string) =>
  requset.get<any, CategoryResponseData>(API.C2_URL + category1Id)
// 获取二级分类列表
export const reqC3 = (category2Id: number | string) =>
  requset.get<any, CategoryResponseData>(API.C3_URL + category2Id)
// 通过一二三级分类id获取属性列表
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  requset.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
// 添加/修改属性
export const reqAddOrEditAttr = (data: AttrList) =>
  requset.post<any, any>(API.ADDOREDITATTR_URL, data)
// 删除属性
export const reqRemoveAttr = (attrId: number) =>
  requset.delete<any, any>(API.REMOVEATTR_URL + attrId)
