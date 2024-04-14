<template>
  <AppDialogForm
    draggable
    lock-scroll
    :title="`角色${props.roleId ? '编辑' : '新增'}`"
    :confirm="roleDialogFormSubmitFn"
    @closed="dialogClosedFn"
    @open="dialogOpenFn"
  >
    <el-form
      label-width="100px"
      ref="roleDialogFormRef"
      :model="formData"
      :rules="formRules"
      v-loading="formLoadingSwitch"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          placeholder="请输入角色名称"
          v-model="formData.role_name"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.status">
          <el-radio
            label="启用"
            :value="1"
          />
          <el-radio
            label="不启用"
            :value="0"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="roleRulesBox"
        label="角色权限"
      >
        <el-tree
          show-checkbox
          node-key="id"
          ref="roleDialogTreeRef"
          :data="treeData"
          :props="defaultTreeProps"
        />
      </el-form-item>
    </el-form>
  </AppDialogForm>
</template>

<script lang='ts' setup>
import { nextTick, ref } from 'vue'
import { ElMessage } from 'element-plus'

import type {
  TypeFormItemRule,
  TypeElForm,
  TypeElTree
} from '@/types/elementPlus'
import type { TypeMenu } from '@/api/types/role'

import {
  getMenus,
  saveRole,
  getRoleById
} from '@/api/role'

/** 公共数据 */
// props
interface PropsType {
  roleId?: number | null
}
const props = withDefaults(defineProps<PropsType>(), {
  roleId: null
})

// emits
interface EmitsType {
  (e: 'update:roleId', roleId: number | null): void
  (e: 'success'): void
}
const emit = defineEmits<EmitsType>()

// loading 开关
const formLoadingSwitch = ref(false)

// 表单 ref
const roleDialogFormRef = ref<TypeElForm | null>(null)

// 表单数据
const formData = ref({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})

// 表单验证数据
const formRules: TypeFormItemRule = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}

// 树形 ref
const roleDialogTreeRef = ref<TypeElTree | null>(null)

// 树形数据
const treeData = ref<TypeMenu[]>([])

// 树形数据默认 props
const defaultTreeProps = {
  children: 'children',
  label: 'title'
}

/** 获取权限菜单 */
const loadMenus = async () => {
  formLoadingSwitch.value = true
  const data = await getMenus().finally(() => {
    formLoadingSwitch.value = false
  })

  treeData.value = data.menus
}

/** 根据 ID 获取角色信息 */
const loadRoleById = async () => {
  if (!props.roleId) return

  const { role, menus } = await getRoleById(props.roleId)
  // 赋值树形菜单
  treeData.value = menus

  // 等待 树形渲染完成后操作
  await nextTick()

  // 赋值角色信息
  formData.value.role_name = role.role_name
  formData.value.status = role.status

  // 选中节点
  setCheckedTree(role.rules.split(',').map(id => Number.parseInt(id)))
}

/** 根据树形节点 ID 选中节点 */
const setCheckedTree = (checkedNodeIds: number[]) => {
  checkedNodeIds.forEach(checkId => {
    const node = roleDialogTreeRef.value?.getNode(checkId)

    // 判断 node 是否时叶子节点
    if (node && node.isLeaf) {
      roleDialogTreeRef.value?.setChecked(checkId, true, false)
    }
  })
}

/** 弹窗打开事件 */
const dialogOpenFn = () => {
  props.roleId ? loadRoleById() : loadMenus()
}

/** 角色表单提交事件 */
const roleDialogFormSubmitFn = async () => {
  // 表单验证
  const valid = roleDialogFormRef.value?.validate()

  if (!valid) return

  /** 添加角色 */
  formData.value.checked_menus = [
    ...roleDialogTreeRef.value?.getCheckedKeys() as number[],
    ...roleDialogTreeRef.value?.getHalfCheckedKeys() as number[]
  ]

  await saveRole(props.roleId ?? 0, formData.value)

  // 提示
  ElMessage.success(`角色${props.roleId ? '编辑' : '创建'}成功!`)

  emit('success')
}

/** 角色关闭事件 */
const dialogClosedFn = () => {
  // 清除角色 ID
  emit('update:roleId', null)

  // 清除表单验证数据
  roleDialogFormRef.value?.clearValidate()

  // 清除表单数据
  roleDialogFormRef.value?.resetFields()
}
</script>

<style lang='scss' scoped>
.roleRulesBox {
  height: 260px;

  ::v-deep .el-form-item__content {
    align-items: start;

    .el-tree {
      flex: 1;
      max-height: 260px;
      overflow: auto;
    }
  }

}
</style>
