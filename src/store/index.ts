// 创建pinia
import { createPinia } from 'pinia'

// 引入数据持久化插件
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia()

// 安装
pinia.use(piniaPersist)

export default pinia
