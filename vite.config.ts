import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// 使用svg的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 使用node提供的path模块
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的对应变量
  let env = loadEnv(mode, process.cwd())
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
      // 配置代理跨域
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 是否需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist', // 生成输出的根目录。如果该目录存在，则会在生成之前将其删除。 默认文件夹名称为dist
      target: 'esnext',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去掉控制台 console
          drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
          dead_code: true, // 删除无法访问的代码 默认就是true
        },
      },
      chunkSizeWarningLimit: 2000, // 调整区块大小警告限制
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
