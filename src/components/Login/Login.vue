<script setup lang="ts">
import type { FormInstance, FormItemRule, FormRules } from 'element-plus'
import type { Arrayable } from 'element-plus/es/utils'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/user/login'
import Storage from '@/utils/LocalStorage'

const emit = defineEmits(['toRegister'])
const elFormRef = ref<FormInstance>()
const form: Ref<{
  account: string
  password: string
}> = ref({
  account: '',
  password: '',
})
const rule: Partial<Record<string, Arrayable<FormItemRule>>> = reactive<FormRules>({
  account: [{
    required: true,
    message: 'This is required',
    trigger: 'blur',
  }],
  password: [{
    required: true,
    message: 'This is required',
    trigger: 'blur',
  }],
})
const check = ref(false)
const loading = ref(false)
const router = useRouter()

function toRegister() {
  emit('toRegister')
}

function init() {
  const { value: login } = new Storage().get<{
    account: string
    password: string
  }>('login')
  if (login) {
    form.value.account = login.account
    form.value.password = login.password
  }
}

async function signIn() {
  const formRef = unref(elFormRef)
  const flag = await formRef?.validate(async (isValid) => {
    if (isValid)
      loading.value = true
  })
  if (!flag)
    return

  const res = await login({
    account: form.value.account,
    password: form.value.password,
  })
  loading.value = false
  if (res.code !== 200)
    return ElMessage.error(res.message)
  const { setUser } = useUserStore()
  console.log(res.data)
  setUser(res.data)
  if (check.value)
    new Storage().set('login', form.value)
  ElMessage.success('登陆成功')
  await router.push('/admin')
}

init()
</script>

<template>
  <el-form
    ref="elFormRef"
    label-position="top"
    hide-required-asterisk
    size="large"
    :model="form"
    :rules="rule"
    @keyup.enter="signIn"
  >
    <el-row :gutter="20" style="margin-left: -10px;margin-right: -10px;">
      <el-col :span="24">
        <el-form-item>
          <h2 class="text-2xl font-bold text-center w-full">
            Sign in
          </h2>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Username" prop="account">
          <el-input v-model="form.account" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <div class="flex justify-between items-center w-full">
            <el-checkbox v-model="check" label="Remember me" size="small" />
            <el-button link type="primary">
              Forget password
            </el-button>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <div class="w-full">
            <el-button type="primary" class="w-full" size="large" :loading="loading" @click="signIn">
              Sign in
            </el-button>
          </div>
          <div class="w-full mt-4">
            <el-button class="w-full" size="large" @click="toRegister">
              Regitser
            </el-button>
          </div>
        </el-form-item>
      </el-col>
      <el-divider>
        Sign in with
      </el-divider>
      <el-col :span="24">
        <el-form-item>
          <div class="flex justify-between w-full">
            <el-icon size="25" color="#999" class="cursor-pointer anticon">
              <svg-icon name="qq" />
            </el-icon>
            <el-icon size="25" color="#999" class="cursor-pointer anticon">
              <svg-icon name="wechat" />
            </el-icon>
            <el-icon size="25" color="#999" class="cursor-pointer anticon">
              <svg-icon name="alipay" />
            </el-icon>
            <el-icon size="25" color="#999" class="cursor-pointer anticon">
              <svg-icon name="wb" />
            </el-icon>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
