<template>
  <div class="box5">
    <div class="title">
      <p>未来七天游客趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'

// 引入Echarts
import * as echarts from 'echarts'

// 画布节点
let charts = ref()

// 组件挂载完毕后
onMounted(() => {
  // 实例化
  let myCharts = echarts.init(charts.value)

  // 配置项
  myCharts.setOption({
    // 标题组件
    title: {
      text: '游客访问量趋势图',
      textAlign: 'left',
      textVerticalAlign: 'middle',
      textStyle: {
        color: '#fff',
      },
      left: 400,
      right: 0,
      bottom: 10,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      right: 20,
      top: 0,
      bottom: 75,
    },
    // 系列
    series: [
      {
        type: 'line',
        data: [120, 60, 150, 33, 48, 90, 62],
        smooth: true,
        areaStyle: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box5 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-left: 20px;

  .title {
    color: white;
    font-size: 20px;
    letter-spacing: 5px;
    margin-left: 20px;
  }

  .charts {
    height: calc(100% - 20px);
  }
}
</style>
