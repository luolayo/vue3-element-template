import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

// 判断当前环境是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'
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
    dirs: ['src/components', 'src/views'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: 'type/components.d.ts',
    resolvers: [ElementPlusResolver()],
  }))
  plugins.push(createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isProduction,
  }))
  plugins.push(vueSetupExtend())
  plugins.push(vue())
  plugins.push(vueJsx())
  return plugins
}

export default setupVitePlugins
