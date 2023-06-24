<template>
  <div class="box4" ref="map"></div>
</template>

<script setup lang="ts">
// 引入组合式API
import { onMounted, ref } from 'vue'

// 引入Echarts
import * as echarts from 'echarts'

// 引入中国地图数据
import chinaJSON from './china.json'

// 画布节点
let map = ref()

// 注册中国地图, (你要用哪个国家/地区的地图数据，数据来源)
echarts.registerMap('china', chinaJSON as any)

// 组件挂载完毕后
onMounted(() => {
  // 创建实例
  let myCharts = echarts.init(map.value)

  // 配置项
  myCharts.setOption({
    // 地图组件
    geo: [{
      map: 'china',
      // 鼠标是否可以缩放地图大小
      roam: true,
      left: 0, top: 110, right: 0, bottom: 0,
      // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
      label: {
        show: true,
        color: 'black',
        fontSize: 16
      },
      // 地图区域的多边形 图形样式。
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [{
            offset: 0, color: 'cyan' // 0% 处的颜色
          }, {
            offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        opacity: 0.7
      },
      // 高亮状态下的多边形和标签样式。
      emphasis: {
        // 在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果
        focus: 'self',
        label: {
          position: 'inside',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Courier New',
          fontSize: 20,
          align: 'center'
        }
      }
    }],
    grid: {
      top: 0, bottom: 0, left: 0, right: 0
    },
    // 路径图
    series: [{
      type: 'lines',
      // 线数据集
      data: [
        {
          coords: [
            [112.982279, 28.19409],  // 起点
            [118.767413, 32.041544]   // 终点
          ],
          // 统一的样式设置
          lineStyle: {
            color: '#fac858',
            width: 5,
            lineStyle: 'solid',
            cap: 'round',
            join: 'bevel'
          }
        },
        {
          coords: [
            [121.509062, 25.044332],  // 起点
            [113.280637, 23.125178]   // 终点
          ],
          // 统一的样式设置
          lineStyle: {
            color: 'red',
            width: 5,
            lineStyle: 'solid',
            cap: 'round',
            join: 'bevel'
          }
        }
      ],
      // 线特效的配置
      effect: {
        show: true,
        constantSpeed: 20,
        period: 3,
        delay: 2,
        trailLength: 0.8,
        symbol: 'arrow',
        symbolSize: 20,
        loop: true,
      }
    }]
  })
})
</script>

<style scoped lang='scss'></style>