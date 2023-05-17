import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 使用node提供的path模块
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('./src/')
    }
  }
})
