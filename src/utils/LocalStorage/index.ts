import type { Data, Key, Result, StorageCls, expire } from './type'
import { Dictionaries } from './type.d'

class Storage implements StorageCls {
  // 存储接受 key value 和过期时间 默认永久
  public set<T = any>(key: Key, value: T, expire: expire = Dictionaries.permanent) {
    const data = {
      value,
      [Dictionaries.expire]: expire,
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  get<T>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key)
    if (!value) {
      console.warn('未找到该key')
      return {
        message: '未找到该key',
        value: null,
      }
    }
    const obj: Data<T> = JSON.parse(value)
    const now = new Date().getTime()
    if (typeof obj[Dictionaries.expire] === 'number' && obj[Dictionaries.expire] < now) {
      this.remove(key)
      return {
        message: 'key已过期',
        value: null,
      }
    }
    return {
      message: '获取成功',
      value: obj.value,
    }
  }

  clear(): void {
    localStorage.clear()
  }

  remove(key: Key): void {
    localStorage.removeItem(key)
  }
}

export default new Storage()
