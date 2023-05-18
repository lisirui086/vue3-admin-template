// 对axios二次封装
// 引入axios
import axios from 'axios'

// 引入element-plus的消息提示组件
import { ElMessage } from 'element-plus'

// 自定义配置新建一个实例
const requset = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 添加并封装请求拦截器
requset.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config
})

// 添加响应拦截器
requset.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    // 处理网络错我
    let errorMsg = '无网络'
    let status = error.response.status

    switch (status) {
      case 401:
        errorMsg = 'TOKEN过期'
        break
      case 403:
        errorMsg = '无权访问'
        break
      case 404:
        errorMsg = '请求地址错误'
        break
      case 500:
        errorMsg = '服务器内部错误'
        break
      default:
        return errorMsg
    }

    // 提示信息
    ElMessage.error(`${errorMsg}`)

    return Promise.reject(error)
  },
)

// 将二次封装的axios对外暴露
export default requset
