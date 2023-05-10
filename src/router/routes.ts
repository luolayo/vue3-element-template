import type { RouteRecordRaw } from 'vue-router'

const __Table__: RouteRecordRaw[] = [
  {
    path: 'defaultTable',
    name: '默认表格',
    component: () => import('@/views/Table/DefaultTable/Index.vue'),
  },
]

export const __adminRoutes__: RouteRecordRaw[] = [
  {
    path: 'dashboard',
    name: '首页',
    component: () => import('@/views/Dashboard/Index.vue'),
  },
  {
    path: 'table',
    name: '表格',
    children: __Table__,
  },
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Index.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layout/Index.vue'),
    children: __adminRoutes__,
    redirect: '/admin/dashboard',
  },
]

export default routes
