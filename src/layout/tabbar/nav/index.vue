<template>
  <div class="tabbar_left">
    <!-- 左侧收缩 / 展开 图标 -->
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑组件 -->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <el-icon style="margin-right: 5px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

import { storeToRefs } from 'pinia'

import { useRoute } from 'vue-router'

// 引入setting仓库
import { useSettingStore } from '@/store/modules/setting'

let settingStore = useSettingStore()

let { fold } = storeToRefs(settingStore)

let $route = useRoute()

// 更改展开 折叠 图标
const changeIcon = () => {
  fold.value = !fold.value
}
</script>
<script lang="ts">
export default {
  name: 'Nav',
}
</script>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
  margin-left: 10px;

  .el-breadcrumb-item {
    cursor: pointer;
  }
}
</style>
