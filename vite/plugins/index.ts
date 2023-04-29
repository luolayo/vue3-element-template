import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

function setupVitePlugins() {
  const plugins: PluginOption[] = []
  plugins.push(eslintPlugin({
    cache: false,
    include: ['type/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
  }))
  plugins.push(AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    dts: 'type/auto-imports.d.ts',
    resolvers: [ElementPlusResolver()],
  }))
  plugins.push(Components({
    dirs: ['type/components'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tex$/],
    dts: 'type/components.d.ts',
    resolvers: [ElementPlusResolver()],
  }))
  plugins.push(vue())
  plugins.push(vueJsx())
  return plugins
}

export default setupVitePlugins
