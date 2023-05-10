<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <section class="flex border-solid border-[#eee] border-b px-5 h-[60px]">
      <Header />
    </section>
    <section class="flex">
      <Aside />
      <Main />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.p0 {
  @apply p-0 #{!important}
}
</style>
