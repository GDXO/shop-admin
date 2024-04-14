import {
  type ElForm,
  type FormItemRule,
  type ElDialog,
  type ElTree
} from 'element-plus'

export type TypeElForm = InstanceType<typeof ElForm>

export type TypeElDialog = InstanceType<typeof ElDialog>

export type TypeElTree = InstanceType<typeof ElTree>

export type TypeFormItemRule = Record<string, FormItemRule[]>
