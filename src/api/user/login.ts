import httpClient from '@/server'

export async function login() {
  return await httpClient.get('/user/login')
}
