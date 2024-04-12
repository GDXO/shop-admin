<template>
  <div class="loginContainer">
    <el-form
      label-width="auto"
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      @submit.prevent="handleSubmit"
    >
      <p class="logoContainer">
        <img
          alt="心选商城"
          class="loginLogo"
          src="@/assets/login_logo.png"
        >
      </p>
      <el-form-item prop="account">
        <el-input
          v-model="loginForm.account"
          placeholder="请输入账号"
        >
          <template #prepend>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="loginForm.pwd"
          type="password"
          placeholder="请输入密码"
        >
          <template #prepend>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="imgcode"
        class="imgcodeBox"
      >
        <el-input
          placeholder="请输入验证码"
          v-model="loginForm.imgcode"
        >
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
        <img
          alt="验证码"
          class="imgcodeImg"
          :src="captchaSrc"
          @click="loadCaptchaSrcFn"
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="loginSubmitBtn"
          native-type="submit"
          :loading="isLoading"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts' setup>
import type { TypeElForm, TypeFormItemRule } from '@/types/elementPlus'
import { reactive, ref, onMounted } from 'vue'
import { useStore } from '@/store/'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  User,
  Lock,
  Key
} from '@element-plus/icons-vue'

import { getCaptcha, login } from '@/api/login'

/* 公共变量 */
const router = useRouter()
const route = useRoute()
const store = useStore()

/* 表单数据 */
const loginForm = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})

/* 是否 loading */
const isLoading = ref(false)

// 表单验证规则
const rules = reactive<TypeFormItemRule>({
  account: [
    { required: true, message: '请输入账号', trigger: 'chang' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})

/* 验证码图片获取 */
const captchaSrc = ref('')
const loadCaptchaSrcFn = async () => {
  const data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}
onMounted(() => {
  loadCaptchaSrcFn()
})

/* 表单提交事件 */
const loginFormRef = ref<TypeElForm | null>(null)
const handleSubmit = async () => {
  // 表单验证
  const valid = await loginFormRef.value?.validate()

  if (!valid) {
    return false
  }

  // 验证通过, 展示 loading
  isLoading.value = true

  // 请求提交
  const loginData = await login(loginForm).finally(() => {
    isLoading.value = false
  })

  // 保存用户信息
  store.dispatch('triggerSetUserInfo', {
    ...loginData.user_info,
    token: loginData.token
  })

  ElMessage.success('登录成功!')

  // 路由跳转
  let redirect = route.query.redirect
  if (typeof redirect !== 'string') {
    redirect = '/'
  }
  router.replace(redirect)
}
</script>

<style lang='scss' scoped>
.loginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2B3A4B;

  .el-form {
    width: 400px;
    padding: 30px;
    background-color: #FFF;
    border-radius: 6px;

    .loginLogo {
      width: 271px;
      height: 74px;
    }

    .imgcodeBox {
      .el-input {
        width: 65%;
        margin-right: 8px;
      }

      .imgcodeImg {
        height: 30px;
        cursor: pointer;
      }
    }

    .loginSubmitBtn {
      flex: 1;
    }
  }
}
</style>
