<script setup lang="ts">
import httpClient from '@/server'

httpClient.get('/api/user/login').then((res) => {
  console.log(res)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
