<script setup lang="ts">
const name = import.meta.env.VITE_APP_TITLE
const isLogin = ref(true)
</script>

<template>
  <div class="v-login h-full relative">
    <div class="relative h-full flex mx-auto">
      <div class="flex-1 bg-[#293146]  relative p-8 hidden lg:block">
        <div class="flex items-center relative text-white">
          <el-icon size="48" class="mr-2.5">
            <SvgIcon name="vue" />
          </el-icon>
          <span class="text-xl font-bold">
            {{ name }}
          </span>
        </div>
        <div class="flex justify-center items-center h-[calc(100%-60px)]">
          <div>
            <el-icon size="350">
              <SvgIcon name="login-box-bg" />
            </el-icon>
            <div class="text-3xl text-white">
              Welocme to the system
            </div>
            <div class="mt-5 font-normal text-white text-[14px]">
              Backstage management system
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 sm:p-8 p-2.5 bg-[#293146] lg:bg-white">
        <div class="flex justify-between items-center text-white lg:justify-end min-h-[32px]">
          <div class="flex items-center lg:hidden">
            <el-icon size="48" class="mr-2.5">
              <SvgIcon name="vue" />
            </el-icon>
            <span class="text-xl font-bold">
              {{ name }}
            </span>
          </div>
        </div>
        <Transition appear enter-active-class="animate__animated animate__bounceInRight">
          <div class="h-full flex items-center m-auto w-full relative md:max-w-[500px]">
            <Login
              v-if="isLogin" class="flex-1 p-5 h-auto m-auto rounded-3xl xl:rounded-0 bg-white"
              @to-register="isLogin = false"
            />
            <Register
              v-else class="flex-1 p-5 h-auto m-auto rounded-3xl xl:rounded-0 bg-white"
              @to-login="isLogin = true"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
