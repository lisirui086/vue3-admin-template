// 统一管理用户信息相关的api接口 -- 真实API数据

// 引入二次封装的axios
import requset from '@/utils/request'

// 引入接口数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
  logoutResponseData,
} from './type'

// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: loginFormData) =>
  requset.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口
export const reqUserInfo = () =>
  requset.get<any, userInfoResponseData>(API.USERINFO_URL)

// 退出登录接口
export const reqLogout = () =>
  requset.post<any, logoutResponseData>(API.LOGOUT_URL)
