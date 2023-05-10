<script setup lang="ts">
import { logout } from '@/api/user'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useLayoutStore } from '@/stores/layout'
import Storage from '@/utils/LocalStorage'

const title = import.meta.env.VITE_APP_TITLE

const user = useUserStore()
const layout = useLayoutStore()

const isFullScreen = ref(document.fullscreenElement !== null)

function fullScreen() {
  const element: Document = document
  isFullScreen.value ? element.exitFullscreen() : element.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}
async function logoutCli() {
  user.logout()
  new Storage().remove('token')
  await logout()
  await router.push('/login')
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
      <div class="header-icon">
        <el-icon size="18" @click="layout.changeCollapse">
          <svg-icon :name="layout.isCollapse ? 'collapse' : 'open'" />
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
    <div class="h-full flex items-center">
      <div class="header-icon">
        <el-icon szie="16" @click="fullScreen">
          <svg-icon :name="isFullScreen ? 'LaunchFullScreen' : 'fullScreen'" />
        </el-icon>
      </div>
      <div class="header-icon">
        <el-dropdown>
          <span class="el-dropdown-link flex items-center">
            <span class="mr-2.5">{{ user.account }}</span>
            <el-avatar
              :src="user.avatar" :size="40"
              class="hover:rotate-360 transition-all duration-500"
            />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logoutCli">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-dropdown-link:focus-visible) {
  outline: unset;
}
</style>
