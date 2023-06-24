// vite.config.ts
import { defineConfig, loadEnv } from "file:///F:/vue/vue3/vue3-admin-template/node_modules/.pnpm/registry.npmmirror.com+vite@4.3.2_@types+node@20.1.7_sass@1.62.1/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/vue/vue3/vue3-admin-template/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.1.0_vite@4.3.2_vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { viteMockServe } from "file:///F:/vue/vue3/vue3-admin-template/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.3.2/node_modules/vite-plugin-mock/dist/index.js";
import { createSvgIconsPlugin } from "file:///F:/vue/vue3/vue3-admin-template/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.3.2/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var vite_config_default = defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
      })
    ],
    server: {
      host: "127.0.0.1",
      port: 3e3,
      open: true,
      // 配置代理跨域
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 是否需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve("./src/")
      }
    },
    css: {
      modules: false,
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "./src/styles/variable.scss";`
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx2dWVcXFxcdnVlM1xcXFx2dWUzLWFkbWluLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFx2dWVcXFxcdnVlM1xcXFx2dWUzLWFkbWluLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi92dWUvdnVlMy92dWUzLWFkbWluLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXG5cbi8vIFx1NEY3Rlx1NzUyOHN2Z1x1NzY4NFx1NjNEMlx1NEVGNlxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbi8vIFx1NEY3Rlx1NzUyOG5vZGVcdTYzRDBcdTRGOUJcdTc2ODRwYXRoXHU2QTIxXHU1NzU3XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAvLyBcdTgzQjdcdTUzRDZcdTU0MDRcdTc5Q0RcdTczQUZcdTU4ODNcdTRFMEJcdTc2ODRcdTVCRjlcdTVFOTRcdTUzRDhcdTkxQ0ZcbiAgbGV0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIGxvY2FsRW5hYmxlZDogY29tbWFuZCA9PT0gJ3NlcnZlJyxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgLy8gXHU5MTREXHU3RjZFXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXG4gICAgICBwcm94eToge1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIC8vIFx1ODNCN1x1NTNENlx1NjU3MFx1NjM2RVx1NzY4NFx1NjcwRFx1NTJBMVx1NTY2OFx1NTczMFx1NTc0MFx1OEJCRVx1N0Y2RVxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfU0VSVkUsXG4gICAgICAgICAgLy8gXHU2NjJGXHU1NDI2XHU5NzAwXHU4OTgxXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIC8vIFx1OERFRlx1NUY4NFx1OTFDRFx1NTE5OVxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoJy4vc3JjLycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgbW9kdWxlczogZmFsc2UsXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiO2AsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVSLFNBQVMsY0FBYyxlQUFlO0FBQzdULE9BQU8sU0FBUztBQUNoQixTQUFTLHFCQUFxQjtBQUc5QixTQUFTLDRCQUE0QjtBQUdyQyxPQUFPLFVBQVU7QUFHakIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxNQUFJLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3JDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLHFCQUFxQjtBQUFBO0FBQUEsUUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsUUFFMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osY0FBYyxZQUFZO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BRU4sT0FBTztBQUFBLFFBQ0wsQ0FBQyxJQUFJLGlCQUFpQixHQUFHO0FBQUE7QUFBQSxVQUV2QixRQUFRLElBQUk7QUFBQTtBQUFBLFVBRVosY0FBYztBQUFBO0FBQUEsVUFFZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxRQUFRO0FBQUEsTUFDNUI7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsTUFDVCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
