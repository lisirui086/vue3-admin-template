import { RouteRecordRaw } from 'vue-router'

// 定义路由组件--路由懒加载
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/layout/index.vue')
const NotFound = () => import('@/views/404/index.vue')
const Home = () => import('@/views/home/index.vue')
const Screen = () => import('@/views/screen/index.vue')

const Permission = () => import('@/views/acl/permission/index.vue')
const Role = () => import('@/views/acl/role/index.vue')
const User = () => import('@/views/acl/user/index.vue')

const Attr = () => import('@/views/product/attr/index.vue')
const Sku = () => import('@/views/product/sku/index.vue')
const Spu = () => import('@/views/product/spu/index.vue')
const Trademark = () => import('@/views/product/trademark/index.vue')

// 常量路由：任何用户皆可访问
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/screen',
    component: Screen,
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Histogram',
    },
  },
]

// 异步路由
export const asnycRoute = [
  {
    path: '/acl',
    redirect: '/acl/permission',
    component: Layout,
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Mouse',
    },
    children: [
      {
        path: '/acl/permission',
        component: Permission,
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Grid',
        },
      },
      {
        path: '/acl/role',
        component: Role,
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Place',
        },
      },
      {
        path: '/acl/user',
        component: User,
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
    ],
  },
  {
    path: '/product',
    redirect: '/product/sku',
    component: Layout,
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/sku',
        component: Sku,
        name: 'Sku',
        meta: {
          title: 'sku管理',
          hidden: false,
          icon: 'Coin',
        },
      },
      {
        path: '/product/attr',
        component: Attr,
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Histogram',
        },
      },

      {
        path: '/product/spu',
        component: Spu,
        name: 'Spu',
        meta: {
          title: 'spu管理',
          hidden: false,
          icon: 'Folder',
        },
      },
      {
        path: '/product/trademark',
        component: Trademark,
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Shop',
        },
      },
    ],
  },
]

// 任意路由
export const anyRoute = [
  {
    path: '/404',
    component: NotFound,
    name: 'NotFound',
    meta: {
      title: '页面不存在',
      hidden: true,
    },
  },
  // 任意不存在的路由地址都重定向到404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '页面不存在',
      hidden: true,
    },
  },
]
