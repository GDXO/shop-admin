<template>
  <h1>首页</h1>
  <!-- <p>{{ $store.state.count }}</p> -->
  <p>{{ store.state.count }}</p>
</template>

<script lang='ts' setup>
import { useStore } from '../../store/'
import User from '@/api/user'

const store = useStore()

console.log(User)

console.log(store.state.count)
</script>

<style lang='scss' scoped>
h1 {
  color: $color;
}
</style>
