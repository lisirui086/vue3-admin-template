// 通过vue-router插件实现模板路由的配置
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入路由组件
import { routes } from './routes.ts'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
