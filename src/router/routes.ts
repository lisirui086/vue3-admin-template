// 定义路由组件--路由懒加载
const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/home/index.vue')
const NotFound = () => import('@/views/404/index.vue')

export const routes = [
  { path: '/', component: Home, name: 'layout' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/404', component: NotFound, name: 'notFound' },
  // 任意不存在的路由地址都重定向到404页面
  { path: '/:pathMatch(.*)*', redirect: '/404', name: 'any'}
]