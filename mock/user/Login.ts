import type { MockMethod } from 'vite-plugin-mock'

const login: MockMethod = {
  url: '/api/user/login',
  method: 'get',
  response: () => {
    return {
      code: 200,
      msg: 'success',
      data: {
        username: 'admin',
        rolue: 1,
      },
    }
  },
}
export default [login]
