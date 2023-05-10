import type { LoginResponseType } from '@/types/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    account: '',
    token: '',
    role: 0,
    avatar: '',
  }),
  actions: {
    setUser(user: LoginResponseType) {
      this.account = user.account
      this.token = user.token
      this.role = user.role
      this.avatar = user.avatar
    },
    logout() {
      this.$reset()
    },
  },
  persist: {
    key: 'user',
    storage: sessionStorage,
  },
})
