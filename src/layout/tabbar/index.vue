<template>
  <div class="tabbar">
    <Nav />
    <Fun />
  </div>
</template>

<script setup lang="ts">
// 引入子组件
import Nav from './nav/index.vue'
import Fun from './fun/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(209, 203, 203),
    rgb(232, 223, 223),
    rgb(243, 224, 224)
  );
}
</style>
