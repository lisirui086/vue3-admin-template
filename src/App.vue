<script setup lang="ts">
// 引入svg组件
import svgIcon from '@/components/Svgicon/index.vue'
</script>

<template>
  <div class="box"> 
    <h1>App根节点</h1>
    <svgIcon name="home" color="pink" />
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background-color: rgb(0, 0, 0);
  h1 {
    color: white;
  }
}
</style>
