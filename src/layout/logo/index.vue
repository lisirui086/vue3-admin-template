<template>
  <div class="logo" v-if="setting.hidden">
    <img :src="setting.logo" />
    <p v-if="!settingStore.fold">{{ setting.projectName }}</p>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
// 引入setting.ts
import setting from '@/setting.ts'

// 引入setting仓库
import { useSettingStore } from '@/store/modules/setting'

let settingStore = useSettingStore()

</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-menu-logo-font-size;
    margin-left: 10px;
  }
}
</style>
