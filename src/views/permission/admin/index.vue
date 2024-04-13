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
      :disabled="isLoadData"
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
      <el-form-item label="管理员名称">
        <el-input
          v-model="filterForm.name"
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
  <!-- 管理员列表 -->
  <el-card class="listCard">
    <template #header>
      <div class="card-header">
        <el-button @click="createAdminFn">
          添加管理员
        </el-button>
      </div>
    </template>
    <el-table
      :data="admins"
      v-loading="isLoadData"
      stripe
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="real_name"
        label="姓名"
      />
      <el-table-column
        prop="roles"
        label="身份"
      >
        <template #default="scope">
          <el-tag
            class="roleTag"
            v-for="item of scope.row.roles.split(',')"
            :key="item"
          >
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_time"
        label="最后一次登录时间"
      />
      <el-table-column
        prop="last_ip"
        label="最后一次登录IP"
      />
      <el-table-column
        prop="status"
        label="状态"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13CE66"
            inactive-color="#FF4949"
            inline-prompt
            active-text="显"
            inactive-text="隐"
            :active-value="1"
            :inactive-value="0"
            :loading="scope.row.statusLoading"
            @change="handleChangeStatusFn(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="100"
        align="center"
      >
        <template #default="scope">
          <el-button
            type="text"
            @click="editAdminFn(scope.row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="该操作会永久删除该管理员, 确定要删除吗?"
            @confirm="delAdminFn(scope.row.id)"
          >
            <template #reference>
              <el-button type="text">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <AppPagination
      v-model:page="filterForm.page"
      v-model:limit="filterForm.limit"
      :total-count="totalCount"
      :is-load-data="isLoadData"
      :load-data="loadAdmins"
    />
  </el-card>

  <!-- 编辑和新建管理员弹窗 -->
  <AdminForm
    v-model="formVisible"
    v-model:adminId="adminId"
    @success="handleSuccessFn"
  />
</template>

<script lang='ts' setup>
import type { TypeAdminFilterForm, TypeAdmin } from '@/api/types/admin'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import {
  getAdmins,
  deleteAdmin,
  updateAdminStatus
} from '@/api/admin'
import AdminForm from './adminForm.vue'

/* 公共变量 */
// 是否在加载数据
const isLoadData = ref(false)

// 分页数据总条数
const totalCount = ref(0)

// 查询表单数据
const filterForm = reactive<TypeAdminFilterForm>({
  status: '',
  name: '',
  roles: '',
  page: 1, // 当前的页数
  limit: 10 // 每页显示的条数
})

// 管理员表格数据
const admins = ref<TypeAdmin[]>([])

/* 获取管理员列表 */
const loadAdmins = async () => {
  isLoadData.value = true
  const data = await getAdmins(filterForm).finally(() => {
    isLoadData.value = false
  })

  data.list.forEach(item => {
    item.statusLoading = false
  })

  // 赋值表单数据
  admins.value = data.list

  // 赋值分页总条数
  totalCount.value = data.count
}
onMounted(() => {
  loadAdmins()
})

/* 表单筛选 */
const handleQuery = () => {
  filterForm.page = 1
  loadAdmins()
}

/* 表格操作 */
// 删除管理员
const delAdminFn = async (id: number) => {
  await deleteAdmin(id)

  // 提示
  ElMessage.success('删除管理员成功!')

  // 刷新数据
  loadAdmins()
}

// 修改管理员状态
const handleChangeStatusFn = async (adminItem: TypeAdmin) => {
  const status = adminItem.status as 0 | 1 | ''
  adminItem.statusLoading = true
  await updateAdminStatus(adminItem.id, status).finally(() => {
    adminItem.statusLoading = false
  })

  // 提示
  ElMessage.success(`${status === 1 ? '启用' : '禁用'}成功!`)
}

/* 新建和编辑管理员 */
const formVisible = ref(false)
const adminId = ref<number | null>(null)

// 新建管理员
const createAdminFn = () => {
  // 显示弹窗
  formVisible.value = true
}
const editAdminFn = (adminItem: TypeAdmin) => {
  // 显示弹窗
  formVisible.value = true

  // 赋值管理员 ID
  adminId.value = adminItem.id
}

// 新建和编辑成功
const handleSuccessFn = () => {
  // 关闭弹窗
  formVisible.value = false

  // 刷新数据
  loadAdmins()
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
