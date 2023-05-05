/// <reference types="vite/client" />
export {}
declare module 'mockjs';
declare global {
  interface IResponse<T = any> {
    code: number
    data: T extends any ? T : T & any
    message: string
  }

  interface ImportMetaEnv {
    VITE_API_URL: string
    VITE_APP_TITLE: string
  }
}
