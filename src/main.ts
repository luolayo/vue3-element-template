import { createApp } from 'vue'
import { createPinia } from 'pinia'

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

const app = createApp(App)

app.use(createPinia())
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
