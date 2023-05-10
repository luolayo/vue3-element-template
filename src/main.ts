import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// svg-icon
import 'virtual:svg-icons-register'

// tailwind
import 'tailwindcss/tailwind.css'

// global css
import './assets/styles/base.css'

// animate.css
import 'animate.css'

// pinia持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
