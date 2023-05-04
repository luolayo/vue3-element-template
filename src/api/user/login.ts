import httpClient from '@/server'

export function login(): Promise<IResponse> {
  return httpClient.get('/user/login')
}
