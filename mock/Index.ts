import type { MockMethod } from 'vite-plugin-mock'
import login from './user/Login'

const mockMethods: MockMethod[] = []
mockMethods.push(...login)
export default mockMethods
