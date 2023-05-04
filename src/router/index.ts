import { createRouter, createWebHistory } from 'vue-router'
import { close, start } from '@/utils/Noporgress'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = to.meta.title as string
  start()
  next()
})
router.afterEach(() => {
  close()
})

export default router
