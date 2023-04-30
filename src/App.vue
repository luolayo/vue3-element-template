<script setup lang="ts">
import { login } from '@/api/user/login'

const res = await login()
console.log(res)
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
