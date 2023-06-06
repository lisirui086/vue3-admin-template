// 属性管理接口的相关参数类型

// 引入user.ts内的部接口返回的数据都拥有的ts类型
import type { responseData } from '@/api/user/type'

// 一二三、级分类的参数类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number | string
  category2Id?: number | string
}

// 相应的分类接口返回数据的类型
export interface CategoryResponseData extends responseData {
  data: CategoryObj[]
}

// 通过一二三级分类获取到的每一个属性值的数据类型
export interface attrValueList {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type AttrValue = attrValueList[]

// 属性值对象的数据类型
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrIdAndValueId?: string
  attrValueList: AttrValue
}

export type AttrList = Attr[]

// 通过一二三级分类id获取到的属性值返回的数据类型
export interface AttrResponseData extends responseData {
  data: Attr[]
}
