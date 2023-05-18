// 统一管理用户信息相关的api接口

// 引入二次封装的axios
import requset from "@/utils/request"

// 引入登录接口的参数ts类型
import { loginForm, loginResponseData, userResponseData } from './type'

// 统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}

// 登录接口
export const reqLogin = (data: loginForm) => requset.post<any, loginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const reqUserInfo = () => requset.get<any, userResponseData>(API.USERINFO_URL)