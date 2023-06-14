<template>
  <div class="top">
    <div class="left">
      <span class="lbtn">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据屏幕</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ nowTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API

// 引入hooks封装的当前时间函数
import useNowDate from '@/hooks/useNowDate'

// 当前时间
let nowTime = useNowDate()

</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 20px;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 75px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 75px;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      float: left;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 20px;
    }

    .time {
      color: #29fcff;
      font-size: 18px;
    }
  }
}
</style>