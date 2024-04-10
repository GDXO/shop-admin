<template>
  <h1>登录页面</h1>
</template>

<script lang='ts' setup>
import type { ILoginInfoRes } from '@/api/types/common'
import { onMounted, ref } from 'vue'

import { getLoginInfo } from '@/api/common'

const list = ref<ILoginInfoRes['slide']>([])

onMounted(() => {
  getLoginInfo().then(data => {
    list.value = data.slide
  })
})
</script>

<style lang='scss' scoped></style>
