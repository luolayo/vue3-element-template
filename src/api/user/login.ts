import httpClient from '@/server'

export function login() {
  return httpClient.get('/user/login')
}
