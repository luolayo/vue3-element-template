import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import setupVitePlugins from './vite/plugins'
import setVitePostCSS from './vite/postCSS'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: setupVitePlugins(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: setVitePostCSS(),
  },
})
