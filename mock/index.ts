import type { MockMethod } from 'vite-plugin-mock'
import user from './user'

const mockMethods: MockMethod[] = []
mockMethods.push(...user)
export default mockMethods
