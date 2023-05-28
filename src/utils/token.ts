// 封装本地存储数据与读取数据方法

// 储存数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 删除数据
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
