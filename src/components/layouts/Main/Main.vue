<script setup lang="ts">
</script>

<template>
  <main class="w-full">
    <el-scrollbar height="calc(100vh - 60px)" class="bg-gray-50">
      <div class="min-h-[calc(100vh-60px)] p-5">
        <RouterView />
      </div>
      <Footer />
    </el-scrollbar>
  </main>
</template>

<style scoped>

</style>
