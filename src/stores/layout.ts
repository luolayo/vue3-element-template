export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => ({
    isCollapse: true,
    active: '/admin/dashboard',
  }),
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },
    changeActive(path: string) {
      this.active = path
    },
  },
  persist: {
    key: 'layout',
    storage: localStorage,
  },
})
