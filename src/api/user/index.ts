import httpClient from '@/server'
import type { LoginResponseType, LoginType, RegisterType } from '@/types/user'

export function login(data: LoginType): Promise<IResponse<LoginResponseType>> {
  return httpClient.post('/user/login', data)
}

export function regitser(data: RegisterType): Promise<IResponse> {
  return httpClient.post('/user/register', data)
}
