import { type ElForm, type FormItemRule, type ElDialog } from 'element-plus'

export type TypeElForm = InstanceType<typeof ElForm>

export type TypeFormItemRule = Record<string, FormItemRule[]>

export type TypeElDialog = InstanceType<typeof ElDialog>
