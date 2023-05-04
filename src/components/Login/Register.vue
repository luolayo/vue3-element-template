<script setup lang="ts">
import type { FormInstance, FormItemRule, FormRules } from 'element-plus'
import type { Arrayable } from 'element-plus/es/utils'
import { ref } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits(['toLogin'])
const elFormRef = ref<FormInstance>()
const form: Ref<{
  account: string
  password: string
  ConfirmPassword: string
}> = ref({
  account: '',
  password: '',
  ConfirmPassword: '',
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
  ConfirmPassword: [{
    required: true,
    message: 'This is required',
    trigger: 'blur',
  }],
})
const loading = ref(false)

function toLogin() {
  emit('toLogin')
}
async function register() {
  const valid = await elFormRef.value?.validate()
  if (!valid)
    return
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
  emit('toLogin')
}
</script>

<template>
  <el-form
    ref="elFormRef"
    label-position="top"
    hide-required-asterisk
    size="large"
    :model="form"
    :rules="rule"
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
        <el-form-item label="Confirm password" prop="ConfirmPassword">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <div class="w-full">
            <el-button type="primary" class="w-full" size="large" :loading="loading" @click="register">
              Regitser
            </el-button>
          </div>
          <div class="w-full mt-4">
            <el-button class="w-full" size="large" @click="toLogin">
              Existing account? Go to login
            </el-button>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>

</style>
