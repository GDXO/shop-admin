<template>
  <el-pagination
    layout="total, sizes, prev, pager, next, jumper"
    background
    :current-page="props.page"
    :page-size="props.limit"
    :page-sizes="[10, 20, 30, 50]"
    :total="props.totalCount"
    :disabled="props.isLoadData"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang='ts' setup>

// props 数据
interface PropsType {
  page: number
  limit: number
  totalCount: number
  isLoadData: boolean
  loadData: () => void
}

const props = withDefaults(defineProps<PropsType>(), {
  page: 1,
  limit: 10,
  totalCount: 0,
  isLoadData: false,
  loadData: () => {}
})

// 发射事件
interface EmitType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
}
const emit = defineEmits<EmitType>()

// 每页条数改变时触发 选择一页显示多少行
const handleSizeChange = (limit: number) => {
  emit('update:limit', limit)
  emit('update:page', 1)
  props.loadData()
}

// 切换页码触发
const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadData()
  console.log(12)
}
</script>

<style lang='scss' scoped></style>
