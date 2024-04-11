<template>
  <el-input
    placeholder="请输入搜索内容"
    v-model="headerSearchWord"
    class="headerSearchBox"
  />
</template>

<script lang='ts' setup>
import { ref } from 'vue'

const headerSearchWord = ref('')
</script>

<style lang='scss' scoped>
.headerSearchBox {
  width: 200px;
}
</style>
