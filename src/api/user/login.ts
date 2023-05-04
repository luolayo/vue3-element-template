import httpClient from '@/server'

export function login(): Promise<IResponse<{ username: string;rolue: number }>> {
  return httpClient.post('/user/login')
}
