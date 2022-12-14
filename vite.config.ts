import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// 代入Vite插件 用来设置title
import { createHtmlPlugin } from 'vite-plugin-html'
import vitePluginString from 'vite-plugin-string'
// 导入去除console插件
import removeConsole from 'vite-plugin-remove-console'
// 导入配置文件
import { viewSettings } from './src/settings.js'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  // 配置启动项
  server: {
    // 本地启动 + 局域网
    host: '0.0.0.0',
    // 自启打开页面
    open: true
  },
  // 导入全局scss变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/config.scss" as *;`
      }
    }
  },
  // 导入插件
  plugins: [
    vue(),
    vitePluginString(),
    // 使用清除console插件
    removeConsole(),
    createHtmlPlugin({
      // 是否启动压缩html
      minify: true,
      // 在html中注入内容
      inject: {
        data: {
          // 注入title
          title: viewSettings.title
        }
      }
    }),
    AutoImport({
      resolvers: [NaiveUiResolver()]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
