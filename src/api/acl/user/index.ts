// 权限管理下的用户模块相关的API

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入权限管理下的用户模块相关的ts类型
import type { UserListResponseData, UserData, UserRoleResponseData, SetRoleData } from './type'

// 用户相关API集合
enum API {
  // 获取所有用户
  ALLUSER_URL = '/admin/acl/user/',
  // 添加用户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改用户信息
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 根据用户获取角色数据
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 根据用户分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除某一个管理用户
  REMOVEUSER_URL = '/admin/acl/user/remove/',
  // 根据id列表删除管理用户,删除被选中的
  REMOVESELECTUSER_URL = '/admin/acl/user/batchRemove'
}

// 获取所有用户
export const reqAllUser = (page: number, limit: number, username?: string) => {
  return requset.get<any, UserListResponseData>(API.ALLUSER_URL + `${page}/${limit}?username=${username}`)
}
// 新增|修改管理用户信息
export const reqAddOrUpdateUser = (data: UserData) => {
  if (data.id) {
    // 有id表示修改用户
    return requset.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    // 没有id表示新增用户
    return requset.post<any, any>(API.ADDUSER_URL, data)
  }
}

// 根据用户获取角色数据
export const reqAllRole = (adminId: number) => requset.get<any, UserRoleResponseData>(API.ALLROLE_URL + adminId)

// 根据用户分配角色
export const reqSetUserRole = (data: SetRoleData) => requset.post<any, any>(API.SETROLE_URL, data)

// 删除某一个管理用户
export const reqRemoveUser = (adminId: number) => requset.delete<any, any>(API.REMOVEUSER_URL + adminId)

// 删除被选中的管理用户
export const reqRemoveSelectUser = (selectRoleList: number[]) => requset.delete<any,any>(API.REMOVESELECTUSER_URL, {data: selectRoleList})
