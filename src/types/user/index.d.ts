export interface LoginType {
  account: string
  password: string
}

export interface LoginResponseType {
  account: string
  token: string
  role: number
}

export interface RegisterType {
  account: string
  password: string
  ConfirmPassword: string
}
