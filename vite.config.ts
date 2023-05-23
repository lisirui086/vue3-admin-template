import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// 使用svg的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 使用node提供的path模块
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    server: {
      host: '127.0.0.1',
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve('./src/'),
      },
    },
    css: {
      modules: false,
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "./src/styles/variable.scss";`,
        },
      },
    },
  }
})
