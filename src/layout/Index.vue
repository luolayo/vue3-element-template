<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="p0 flex border-solid border-[#eee] border-b">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.p0{
  @apply p-0 #{!important}
}
</style>
