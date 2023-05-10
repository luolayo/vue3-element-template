<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <section>
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
