<template>
  <el-dialog
    width="30%"
    ref="dialogRef"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancelFn">
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="buttonLoading"
          @click="handleConfirm"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

import type { TypeElDialog } from '@/types/elementPlus'

/* 公共变量 */
interface PropsType {
  confirm: () => Promise<void>
}
const props = withDefaults(defineProps<PropsType>(), {
  confirm: () => Promise.resolve()
})

// 取消按钮事件
const dialogRef = ref<TypeElDialog | null>(null)
const handleCancelFn = () => {
  if (dialogRef.value) {
    dialogRef.value.visible = false
  }
}

// 确认按钮点击事件
const buttonLoading = ref(false)
const handleConfirm = async () => {
  buttonLoading.value = true
  await props.confirm()
  buttonLoading.value = false
}
</script>

<style lang='' scoped></style>
