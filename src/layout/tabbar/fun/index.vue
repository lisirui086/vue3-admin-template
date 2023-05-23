<template>
  <div class="tabbar_right">
    <el-button :icon="Refresh" circle @click="refresh = !refresh" />
    <el-button :icon="FullScreen" circle @click="fullScreen" />
    <el-button :icon="Setting" circle />
    <img
      :src="avatar"
      style="width: 30px; height: 30px; margin: 0 10px; border-radius: 50%"
      alt=""
    />

    <el-dropdown style="cursor: pointer">
      <span class="el-dropdown-link">
        <span>{{ desc }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { nextTick } from 'vue'
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'

import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'

import { useRouter, useRoute } from 'vue-router'

let $router = useRouter()
let $route = useRoute()

let useSetting = useSettingStore()
let userStore = useUserStore()

const { refresh } = storeToRefs(useSetting)

const { avatar, desc } = storeToRefs(userStore)

// 全屏 退出全屏
const fullScreen = () => {
  let full = document.fullscreenElement
  !full
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen()
}

// 退出登录
const logout = () => {
  userStore.logout()
  nextTick(() => {
    $router.push({ path: '/login', query: { redirect: $route.path } })
  })
}
</script>
<script lang="ts">
export default {
  name: 'Fun',
}
</script>

<style scoped lang="scss">
.tabbar_right {
  display: flex;
  align-items: center;
}
</style>
