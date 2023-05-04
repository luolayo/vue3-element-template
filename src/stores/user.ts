export const useUserStore = defineStore('user', () => {
  const user = ref<{
    username: string
    rolue: number
  }>()

  const setUser = (value: {
    username: string
    rolue: number
  }) => {
    user.value = value
  }

  return { user, setUser }
})
