<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ foldcss: fold ? true : false }">
      <Logo></Logo>
      <!-- 滚动条 -->
      <el-scrollbar height="600px" class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="red"
          :default-active="$route.path"
          :collapse="fold ? true : false"
        >
          <Menu :menuList="useUser.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ foldcss: fold ? true : false }">
      <Tabbar :menuList="useUser.menuRoutes" />
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{ foldcss: fold ? true : false }">
      <!-- 路由切换 -->
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
// 组合式API
import { onMounted } from 'vue'

// 引入子组件
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

// 获取全部路由信息
import { useUserStore } from '@/store/modules/user.ts'

// 引入路由
import { useRoute } from 'vue-router'

// 引入setting仓库
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/modules/setting'

let settingStore = useSettingStore()

const { fold } = storeToRefs(settingStore)

let $route = useRoute()

const useUser = useUserStore()

onMounted(() => {
  useUser.userInfo()
})

</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background-color;
    transition: all 0.3s;

    &.foldcss {
      width: $base-menu-width-min;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.foldcss {
      width: calc(100vw - $base-menu-width-min);
      left: $base-menu-width-min;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.foldcss {
      width: calc(100vw - $base-menu-width-min);
      left: $base-menu-width-min;
    }
  }
}
</style>
