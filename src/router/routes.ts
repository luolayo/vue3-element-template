import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layout/Index.vue'),
  },
]

export default routes
