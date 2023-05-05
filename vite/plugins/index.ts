import path from 'node:path'

import type { PluginOption } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import eslintPlugin from 'vite-plugin-eslint'
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
    dirs: ['src/components', 'src/views', 'src/components/layouts'],
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
  plugins.push(viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isProduction,
    prodEnabled: isProduction,
    injectCode: `
          import { setupProdMockServer } from '../../mock/_createProductionServer'
          setupProdMockServer()
          `,
  }))
  plugins.push(vue())
  plugins.push(vueJsx())
  return plugins
}

export default setupVitePlugins
