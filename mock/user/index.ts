import { Random } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

const timeout = 200
const list: {
  account: string
  password: string
  role: number
}[] = [
  {
    account: 'admin',
    password: 'admin',
    role: 0,
  },
  {
    account: 'user',
    password: 'user',
    role: 1,
  },
]
export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body as { account: string; password: string }
      const user = list.find(item => item.account === data.account)
      if (user) {
        if (user.password === data.password) {
          return {
            code: 200,
            message: 'success',
            data: {
              account: user.account,
              token: Random.string(32),
              role: user.role,
            },
          }
        }
        else {
          return {
            code: 401,
            message: '密码错误',
          }
        }
      }
      else {
        return {
          code: 400,
          message: '账号不存在',
        }
      }
    },
  },
  {
    url: '/api/user/logout',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        message: 'success',
      }
    },
  },
  {
    url: '/api/user/register',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body as { account: string; password: string }
      const user = list.find(item => item.account === data.account)
      if (user) {
        return {
          code: 400,
          message: '账号已存在',
        }
      }
      else {
        list.push({
          account: data.account,
          password: data.password,
          role: 1,
        })
        return {
          code: 200,
          message: 'success',
        }
      }
    },
  },
] as MockMethod[]
