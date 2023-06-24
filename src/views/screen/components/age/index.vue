<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
// 组合式API
import { ref, onMounted } from 'vue'

// 引入Echarts
import * as echarts from 'echarts'

// 画布节点
let charts = ref()

// 组件挂载完毕后
onMounted(() => {
  // 创建实例
  let myCharts = echarts.init(charts.value)

  // 饼图配置项
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 40,
      right: 2,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '少儿' },
          { value: 735, name: '青年' },
          { value: 580, name: '中年' },
          { value: 484, name: '老年' },
        ]
      }
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  };

  // 配置项
  myCharts.setOption(option)
})

</script>

<style scoped lang='scss'>
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    color: white;
    font-size: 20px;
    letter-spacing: 5px;
    margin-left: 20px;
  }

  .charts {
    height: 100%;
  }
}
</style>