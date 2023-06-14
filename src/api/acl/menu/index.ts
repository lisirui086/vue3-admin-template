// 菜单管理模块相关的后台API

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入菜单管理模块相关的ts类型
import type { MenuResponseData, MenuParams } from './type'

// 菜单管理模块的API接口集合
enum API {
  // 获取菜单
  ALLPERMISSTION_URl = '/admin/acl/permission',
  // 新增菜单
  ADDPERMISSTION_URL = '/admin/acl/permission/save',
  // 修改菜单
  EDITPERMISSTION_URL = '/admin/acl/permission/update',
  // 删除菜单
  REMOVEPERMISSTION_URL = '/admin/acl/permission/remove/',
}

// 获取菜单
export const reqAllPermisstion = () =>
  requset.get<any, MenuResponseData>(API.ALLPERMISSTION_URl)

// 新增|修改菜单
export const reqAddOrEditPermisstion = (data: MenuParams) => {
  if (data.id) {
    return requset.put<any, any>(API.EDITPERMISSTION_URL, data)
  } else {
    return requset.post<any, any>(API.ADDPERMISSTION_URL, data)
  }
}

// 删除菜单
export const reqRemoveMenu = (id: number) =>
  requset.delete<any, any>(API.REMOVEPERMISSTION_URL + id)
