<template>
  <!-- 筛选表单 -->
  <el-card class="filterCard">
    <template #header>
      <div class="card-header">
        <span>数据筛选</span>
      </div>
    </template>
    <el-form
      class="filterForm"
      :inline="true"
      :model="filterForm"
      :disabled="isLoadingSwitch"
      @submit.prevent="handleQuery"
    >
      <el-form-item label="状态">
        <el-select
          v-model="filterForm.status"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            label="全部"
            value=""
          />
          <el-option
            label="显示"
            :value="1"
          />
          <el-option
            label="不显示"
            :value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份昵称">
        <el-input
          v-model="filterForm.role_name"
          placeholder="请输入身份昵称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 角色列表 -->
  <el-card class="listCard">
    <template #header>
      <div class="card-header">
        <el-button
          type="primary"
          @click="createRoleFn"
        >
          添加角色
        </el-button>
      </div>
    </template>
    <el-table
      stripe
      :data="roles"
      v-loading="isLoadingSwitch"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="role_name"
        label="身份昵称"
      />
      <el-table-column
        label="权限"
      >
        <template #default="scope">
          <div
            class="text-nowrap"
            :title="scope.row.rules"
          >
            {{ scope.row.rules }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch
            active-color="#13CE66"
            inactive-color="#FF4949"
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="text"
            @click="updateRoleFn(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            @click="deleteRoleFn(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <AppPagination
      v-model:page="filterForm.page"
      v-model:limit="filterForm.limit"
      :total-count="totalCount"
      :is-loading-switch="isLoadingSwitch"
      :load-data="loadRoles"
    />
  </el-card>

  <createOrUpdate
    v-model="createOrUpdateSwitch"
    v-model:roleId="roleId"
    @success="createOrUpdateSuccessFn"
  />
</template>

<script lang='ts' setup>
import type { TypeRole } from '@/api/types/role'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
  getRoles,
  deleteRole
} from '@/api/role'

/** 组件 */
import createOrUpdate from './createOrUpdateRole.vue'

/** 公共数据 */
// 表单筛选表单
const filterForm = reactive({
  status: '' as 0 | 1 | '',
  role_name: '',
  page: 1,
  limit: 10
})

// loading 开关
const isLoadingSwitch = ref(false)

// 角色列表数据
const roles = ref<TypeRole[]>([])

// 角色列表总条数
const totalCount = ref(0)

// 新增或编辑开关
const createOrUpdateSwitch = ref(false)

// 角色 ID
const roleId = ref<number | null>(null)

/** 获取角色列表 */
const loadRoles = async () => {
  isLoadingSwitch.value = true
  const data = await getRoles(filterForm).finally(() => {
    isLoadingSwitch.value = false
  })

  // 赋值角色列表
  roles.value = data.list

  // 赋值总条数
  totalCount.value = data.count
}
onMounted(() => {
  loadRoles()
})

/** 查询点击事件 */
const handleQuery = () => {
  filterForm.page = 1
  loadRoles()
}

/** 删除角色事件 */
const deleteRoleFn = (id: number) => {
  ElMessageBox.confirm('该操作会永久删除该角色, 是否继续?', '删除提示', {
    type: 'warning'
  }).then(async () => {
    isLoadingSwitch.value = true
    await deleteRole(id).finally(() => {
      isLoadingSwitch.value = false
    })

    // 提示
    ElMessage.success('删除角色成功!')

    // 重新加载数据
    loadRoles()
  }).catch(() => {
    ElMessage.info('已取消操作!')
  })
}

/** 添加角色事件 */
const createRoleFn = () => {
  // 显示弹窗
  createOrUpdateSwitch.value = true
}

/** 编辑角色事件 */
const updateRoleFn = (roleItem: TypeRole) => {
  // 显示弹窗
  createOrUpdateSwitch.value = true

  // 赋值 roleId
  roleId.value = roleItem.id
}

/** 添加或编辑角色成功事件 */
const createOrUpdateSuccessFn = () => {
  // 关闭弹窗
  createOrUpdateSwitch.value = false

  // 刷新数据
  loadRoles()
}
</script>

<style lang='scss' scoped>
.filterCard {
  margin-bottom: 15px;

  .filterForm {
    .el-input {
      --el-input-width: 220px;
    }

    .el-select {
      --el-select-width: 220px;
    }
  }
}

.listCard {
  .el-pagination {
    margin-top: 10px;
  }

  .roleTag {
    margin-left: 5px;
    margin-bottom: 5px;
  }
}
</style>
