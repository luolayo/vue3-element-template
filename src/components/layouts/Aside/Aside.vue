<script setup lang="ts">
import { __adminRoutes__ } from '@/router/routes'
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()
</script>

<template>
  <aside>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="!layout.isCollapse"
      :default-active="layout.active"
      router
    >
      <template v-for="item in __adminRoutes__" :key="item.name">
        <el-sub-menu v-if="item.children" :index="`/admin/${item.path}`">
          <template #title>
            <el-icon>
              <svg-icon :name="item.path" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="children in item.children" :key="children.name" :index="`/admin/${item.path}/${children.path}`">
              {{ children.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="`/admin/${item.path}`">
          <el-icon>
            <svg-icon :name="item.path" />
          </el-icon>
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo{
  height: calc(100vh - 60px);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
