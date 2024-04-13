<template>
  <AppDialogForm
    :title="`管理员${props.adminId ? '修改' : '添加'}`"
    :confirm="handleSubmitFn"
    @closed="closedFn"
    @open="dialogOpenFn"
  >
    <el-form
      ref="adminDialogForm"
      label-width="100px"
      :model="formData"
      :rules="formRules"
      v-loading="formLoading"
    >
      <el-form-item
        label="管理员账号"
        prop="account"
      >
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号"
        />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd"
      >
        <el-input
          v-model="formData.pwd"
          type="password"
          placeholder="请输入管理员密码"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd"
      >
        <el-input
          v-model="formData.conf_pwd"
          type="password"
          placeholder="请输入确认密码"
        />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name"
      >
        <el-input
          v-model="formData.real_name"
          placeholder="请输入管理员姓名"
        />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        prop="roles"
      >
        <el-select
          v-model="formData.roles"
          multiple
          placeholder="请选择管理员身份"
        >
          <el-option
            v-for="roleItem of roles"
            :key="roleItem.label"
            :value="roleItem.value"
            :label="roleItem.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </AppDialogForm>
</template>

<script lang='ts' setup>
import type { TypeElForm, TypeFormItemRule } from '@/types/elementPlus'
import type { TypeSelectOptions } from '@/api/types/admin'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import {
  getRoles,
  getAdminInfoFromID,
  createAdmin,
  updateAdmin
} from '@/api/admin'

/* props 数据 */
interface PropsType {
  adminId?: number | null
}
const props = withDefaults(defineProps<PropsType>(), {
  adminId: null
})

/* emit 函数 */
interface EmitType {
  (e: 'update:adminId', adminId: number | null): void
  (e: 'success'): void
}
const emit = defineEmits<EmitType>()

/* 公共数据 */
// 表单加载 loading
const formLoading = ref(false)

// 表单 ref
const adminDialogForm = ref<TypeElForm | null>(null)

// 表单数据
const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})

/* 表单验证数据 */
const formRules: TypeFormItemRule = {
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
}

/* 弹出框打开事件 */
// 获取角色列表函数
const roles = ref<TypeSelectOptions[]>()
const loadRoles = async () => {
  const data = await getRoles()

  roles.value = data
}

// 编辑时获取表单数据
const loadAdminFromID = async () => {
  if (!props.adminId) {
    return
  }

  const data = await getAdminInfoFromID(props.adminId)

  formData.value = data
}

const dialogOpenFn = () => {
  formLoading.value = true

  Promise.all([loadRoles(), loadAdminFromID()]).finally(() => {
    formLoading.value = false
  })
}

/* 确定按钮点击事件 */
const handleSubmitFn = async () => {
  // 表单验证
  const valid = await adminDialogForm.value?.validate()

  if (!valid) return

  if (props.adminId) { // 更新管理员
    await updateAdmin(props.adminId, formData.value)
  } else { // 新增管理员
    await createAdmin(formData.value)
  }

  ElMessage.success(`${props.adminId ? '更新' : '添加'}管理员成功!`)

  // 向父组件发送成功事件
  emit('success')
}

/* 弹出框关闭事件 */
const closedFn = () => {
  // 清除 管理员 ID
  emit('update:adminId', null)

  // 清除 管理员验证结果
  adminDialogForm.value?.clearValidate()

  // 清除表单数据
  adminDialogForm.value?.resetFields()
}
</script>
