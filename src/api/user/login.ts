import httpClient from '@/server'
import type { LoginResponseType, LoginType } from '@/types/user'

export function login(data: LoginType): Promise<IResponse<LoginResponseType>> {
  return httpClient.post('/user/login', data)
}
