<template>
  <div class="tabbar_right">
    <el-button :icon="Refresh" circle @click="refresh = !refresh" />
    <el-button :icon="FullScreen" circle @click="fullScreen" />
    <el-popover
      placement="bottom"
      title="主体设置"
      :width="240"
      trigger="click"
    >
      <el-form>
        <el-form-item label="主体颜色">
          <el-color-picker
            size="small"
            v-model="color"
            show-alpha
            @change="setColor"
          />
        </el-form-item>
        <el-form-item label="夜间模式">
          <el-switch
            @change="toggleDark"
            size="small"
            v-model="isDark"
            inline-prompt
            inactive-icon="Sunny"
            active-icon="Moon"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button :icon="Setting" circle />
      </template>
    </el-popover>

    <img
      :src="avatar"
      style="width: 30px; height: 30px; margin: 0 10px; border-radius: 50%"
      alt=""
    />

    <el-dropdown style="cursor: pointer">
      <span class="el-dropdown-link">
        <span>{{ username }}</span>
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
import { nextTick, ref } from 'vue'
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue'

import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'

import { useRouter, useRoute } from 'vue-router'

// 动态切换 引入useDrak
import { useDark, useToggle } from '@vueuse/core'

// 存储暗黑样式
const isDark = useDark()
// 调用方法
const toggleDark = useToggle(isDark)

let $router = useRouter()
let $route = useRoute()

let useSetting = useSettingStore()
let userStore = useUserStore()

const { refresh } = storeToRefs(useSetting)

const { avatar, username } = storeToRefs(userStore)

// 取色器默认显示颜色
let color = ref('rgba(19, 206, 102, 0.8)')

// 全屏 退出全屏
const fullScreen = () => {
  let full = document.fullscreenElement
  !full
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen()
}

// 退出登录
const logout = async () => {
  await userStore.logout()
  nextTick(() => {
    $router.push({ path: '/login', query: { redirect: $route.path } })
  })
}

// 修改主体颜色
const setColor = () => {
  // 获取DOM
  const el = document.documentElement

  const btnTypeArr = [
    `--el-color-primary`,
    `--el-color-success`,
    `--el-color-info`,
    `--el-color-danger`,
    `--el-color-warning`,
  ]

  for (let i = 0; i < btnTypeArr.length; i++) {
    getComputedStyle(el).getPropertyValue(btnTypeArr[i])
  }

  for (let k = 0; k < btnTypeArr.length; k++) {
    el.style.setProperty(btnTypeArr[k], color.value)
  }

  /* getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  getComputedStyle(el).getPropertyValue(`--el-color-success`)
  getComputedStyle(el).getPropertyValue(`--el-color-info`)
  getComputedStyle(el).getPropertyValue(`--el-color-danger`)
  getComputedStyle(el).getPropertyValue(`--el-color-warning`)

  el.style.setProperty('--el-color-primary', color.value)
  el.style.setProperty('--el-color-warning', color.value) */
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
