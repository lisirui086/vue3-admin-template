<template>
  <el-card>
    <el-form inline="true" style="height: 30px">
      <el-form-item :label="label">
        <el-input :placeholder="placeholder" clearable v-model="keyword">
          <template #append>
            <el-button
              type="primary"
              icon="Search"
              @click="emitKey"
            ></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" icon="Refresh" @click="refresh = !refresh">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 在@vueuse/core中导入useVModel
import { useVModel } from '@vueuse/core'

// 引入pinia和小仓库
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/modules/setting'

// 接收参数，事件
let props = defineProps(['label', 'placeholder', 'modelValue'])
const $emit = defineEmits(['update:modelValue', 'handler-select'])

const keyword = useVModel(props, 'modelValue', $emit)

const emitKey = () => {
  $emit('handler-select')
}

// 重置
let useSetting = useSettingStore()
const { refresh } = storeToRefs(useSetting)
</script>

<style scoped lang="scss"></style>
