import type { LoginResponseType } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<LoginResponseType>()

  const setUser = (value: LoginResponseType) => {
    user.value = value
  }

  return { user, setUser }
})
