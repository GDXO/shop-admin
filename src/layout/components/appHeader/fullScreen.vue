<template>
  <el-icon
    class="handleFullScreenBtn"
    @click="toggleFullScreen"
  >
    <FullScreen />
  </el-icon>
</template>

<script lang='ts' setup>
import { FullScreen } from '@element-plus/icons-vue'

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang='scss' scoped>
.handleFullScreenBtn {
  cursor: pointer;
  margin: 0 10px;
}
</style>
