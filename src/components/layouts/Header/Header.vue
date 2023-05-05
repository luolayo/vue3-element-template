<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
const isCollapse = ref(true)
function changeCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="h-full w-[200px]">
    <a
      href="#"
      class="flex h-full items-center cursor-pointer pl-2 relative justify-center"
    >
      <el-icon size="40">
        <svg-icon name="vue" />
      </el-icon>
      <div class="ml-2 text-[16px] font-bold">{{ title }}</div>
    </a>
  </div>
  <div class="flex relative w-full h-full justify-between items-center">
    <div class="h-full flex items-center">
      <div class="flex h-full px-2.5 items-center cursor-pointer pt-0.5 hover:bg-gray-50 transition duration-200">
        <el-icon size="18" @click="changeCollapse">
          <svg-icon :name="isCollapse ? 'collapse' : 'open'" />
        </el-icon>
      </div>
      <div class="flex items-center h-full ml-2.5">
        <el-icon size="16" class="mr-1.5">
          <svg-icon name="dashboard" />
        </el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">
            homepage
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">promotion management</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div>right</div>
  </div>
</template>

<style scoped>

</style>
