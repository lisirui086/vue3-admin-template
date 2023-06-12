// 角色管理模块相关的api

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入ts
import type { AllRoleResponseData, MenuResponseData } from './type'
import type { NowUserRoleData } from '@/api/acl/user/type'

// 角色管理模块api集合
enum API {
  // 获取角色分页列表
  ALLROLE_URL = '/admin/acl/role/',
  // 新增角色
  ADDROLE_URL = '/admin/acl/role/save',
  // 修改角色
  EDITROLE_URL = '/admin/acl/role/update',
  // 根据角色获取菜单
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  // 给角色分配权限
  DOASSGIN_URL = '/admin/acl/permission/doAssign?',
  // 删除职位
  REMOVEROLE_URL = '/admin/acl/role/remove/'
}

// 获取角色分页列表
export const reqAllRole = (page: number, limit: number, roleName?: string) => {
  if (roleName) {
    return requset.get<any, AllRoleResponseData>(
      API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`
    )
  } else {
    return requset.get<any, AllRoleResponseData>(
      API.ALLROLE_URL + `${page}/${limit}`
    )
  }
}
/* 
有id -> 修改角色
无id -> 新增角色
*/
export const reqAddOrEditRole = (role: NowUserRoleData) => {
  if (role.id) {
    return requset.put<any, any>(API.EDITROLE_URL, role)
  } else {
    return requset.post<any, any>(API.ADDROLE_URL, role)
  }
}

// 根据角色获取菜单
export const reqAllPermisstion = (roledId: number) =>
  requset.get<any, MenuResponseData>(API.ALLPERMISSTION_URL + roledId)

// 给角色分配权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  requset.post<any, any>(
    API.DOASSGIN_URL + `roleId=${roleId}&permissionId=${permissionId}`
  )

// 删除职位
export const reqRemoveRole = (roleId: number) => requset.delete<any, any>(API.REMOVEROLE_URL+roleId)
