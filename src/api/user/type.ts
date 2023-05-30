// 登录接口需要携带的参数ts类型

// 用户账号密码
export interface loginFormData {
  username: string
  password: string
}

// 全部接口返回的数据都拥有的ts类型
export interface responseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回的数据类型
export interface loginResponseData extends responseData {
  data: string
}

// 获取用户信息的数据类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

// 退出登录的数据类型
export interface logoutResponseData extends responseData {
  data: null
}
