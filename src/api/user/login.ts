import httpClient from '@/server'

export function login(): Promise<IResponse<{ username: string;rolue: number }>> {
  return httpClient.get('/user/login')
}
