import { createRouter, createWebHistory } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import { close, start } from '@/utils/Noporgress'
import Storage from '@/utils/LocalStorage/'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const layout = useLayoutStore()
  if (to.meta.title)
    document.title = to.meta.title as string
  layout.changeActive(to.path)
  start()
  if (to.path !== '/login' && new Storage().get('token').value === null) {
    new Storage().remove('token')
    return next('/login')
  }

  next()
})
router.afterEach(() => {
  close()
})

export default router
