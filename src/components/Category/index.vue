<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select :disabled="sceen==0? false : true" placeholder="请选择" size="large" v-model="categoryStore.c1Id" @change="getC2">
          <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="sceen==0? false : true" placeholder="请选择" size="large" v-model="categoryStore.c2Id" @change="getC3">
          <template v-if="categoryStore.c1Id">
            <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
          </template>
          <template v-else>
            <el-option label="请先选择一级分类" disabled />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="sceen==0? false : true" placeholder="请选择" size="large" v-model="categoryStore.c3Id">
          <template v-if="categoryStore.c2Id">
            <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
          </template>
          <template v-else>
            <el-option label="请先选择二级分类" disabled />
          </template>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API
import { onMounted } from 'vue'

// 引入category仓库
import { useCategoryStore } from '@/store/modules/category'

// 接收props
defineProps(['sceen'])

// 实例化仓库
let categoryStore = useCategoryStore()

// 调用getC1
const getCategoryC1 = () => {
  categoryStore.getC1()
}

// 当已有一级分类被选中时，获取二级分类数据
const getC2 = () => {
  // 清除二、三级分类的相关数据
  categoryStore.c2Id = '',
  categoryStore.c3Arr = [],
  categoryStore.c3Id = ''
  categoryStore.getC2()
}

// 当已有二级分类被选中时， 获取三级分类数据
const getC3 = () => {
  // 清除三级分类的相关数据
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

// 组件挂载完毕后
onMounted(() => {
  getCategoryC1()
})
</script>

<style scoped lang='scss'></style>