import { type ElForm, type FormItemRule } from 'element-plus'

export type TypeElForm = InstanceType<typeof ElForm>

export type TypeFormItemRule = Record<string, FormItemRule[]>
