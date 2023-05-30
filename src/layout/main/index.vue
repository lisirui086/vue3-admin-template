<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 引入组合式API
import { watch, nextTick, ref } from 'vue'

import { useSettingStore } from '@/store/modules/setting'

let useSetting = useSettingStore()

let flag = ref(true)

// 侦听刷新按钮值的变化
watch(() => useSetting.refresh, () => {
  flag.value = false
  nextTick(() => {
    flag.value = true
  })
})
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped lang="scss">
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
