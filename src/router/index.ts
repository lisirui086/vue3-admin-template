// 通过vue-router插件实现模板路由的配置
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入路由组件
import { routes } from './routes.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
