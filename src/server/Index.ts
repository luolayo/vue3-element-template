import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// import { ElLoading, ElMessage } from 'element-plus'

interface HttpClientRequestConfig extends AxiosRequestConfig {
  Authorization?: string
  loading?: any
}

/**
 * @description axios请求类
 * @class HttpClient
 * @example
 * 使用单例模式封装axios
 */
class HttpClient {
  private readonly config: HttpClientRequestConfig
  private readonly instance: AxiosInstance

  constructor(config: HttpClientRequestConfig) {
    this.config = config as HttpClientRequestConfig
    // * 创建axios实例
    this.instance = axios.create(config)
    // 请求拦截器
    this.instance.interceptors.request.use(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.handleRequest.bind(this),
      this.handleError.bind(this),
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleError.bind(this),
    )
  }

  /**
   * 处理请求成功的回调函数
   * @param response Axios返回的响应对象
   * @returns Promise.resolve<AxiosResponse<IResponse<T>>> 返回一个Promise对象，resolve后的值是Axios返回的响应数据IResponse<T>
   */
  private handleResponse<T>(response: AxiosResponse<IResponse<T>>): Promise<AxiosResponse<IResponse<T>>> {
    // 关闭loading
    this.hideLoading()
    // 显示响应提示框
    this.showMsg(response.data.message)
    return Promise.resolve(response)
  }

  /**
   * 处理请求失败的回调函数
   * @param error 错误对象
   * @returns Promise.reject<any> 返回一个Promise对象，reject后的值是错误对象
   */
  private handleError(error: any): Promise<never> {
    const { response } = error

    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    if (response) {
      this.handleResponseError(response.status, response.data.message)
    }
    else {
      // Something happened in setting up the request that triggered an Error
      console.error('请求错误:', error.message)
      this.showErrorMsg(error.message)
    }
    // 关闭loading
    this.hideLoading()
    return Promise.reject(error)
  }

  /**
   * 显示提示框
   */
  private showMsg(message?: string): void {
    if (message)
      ElMessage.success(message)
  }

  /**
   * 显示错误提示框
   */
  private showErrorMsg(message?: string): void {
    if (message)
      ElMessage.error(message)
  }

  /**
   * 显示 loading
   */
  private showLoading(): any {
    return ElLoading.service({
      fullscreen: true,
      text: '正在加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  /**
   * 隐藏 loading
   */
  private hideLoading(): void {
    const loading = ElLoading.service({})
    if (loading)
      loading.close()
  }

  /**
   * 处理请求成功时需要执行的操作
   */
  private handleRequest(config: HttpClientRequestConfig): HttpClientRequestConfig {
    // 设置token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token,
      }
    }

    // 显示loading
    config.loading = this.showLoading()

    return config
  }

  /**
   * 处理请求失败时需要执行的操作
   */
  private handleResponseError(status: number, message?: string) {
    switch (status) {
      case 401:
        console.error('您未登录或登录已过期，请重新登录！')
        this.showErrorMsg('您未登录或登录已过期，请重新登录！')
        // 跳转到登录页面
        window.location.href = '/login'
        break
      case 404:
        console.error('请求的资源不存在！')
        this.showErrorMsg('请求的资源不存在！')
        break
      case 500:
        console.error('服务器内部错误！')
        this.showErrorMsg('服务器内部错误！')
        break
      default:
        console.error(`请求失败：${message}`)
        this.showErrorMsg(`请求失败：${message}`)
        break
    }
  }

  /**
   * 发送GET请求
   * @param url 请求地址
   * @param params 请求参数
   * @returns Promise<AxiosResponse<Result>> 返回一个Promise对象，resolve后的值是Axios返回的响应数据Result<T>
   */
  public get(url: string, params?: any): Promise<AxiosResponse<IResponse>> {
    return this.instance.get(url, {
      params,
    })
  }

  /**
   发送POST请求
   @param url 请求地址
   @param data 请求体数据
   @returns Promise<AxiosResponse> 返回一个Promise对象，resolve后的值是Axios返回的响应数据Result
   */
  public post(url: string, data?: any): Promise<AxiosResponse<IResponse>> {
    return this.instance.post(url, data)
  }

  /**
   发送PUT请求
   @param url 请求地址
   @param data 请求体数据
   @returns Promise<AxiosResponse> 返回一个Promise对象，resolve后的值是Axios返回的响应数据Result
   */
  public put(url: string, data?: any): Promise<AxiosResponse<IResponse>> {
    return this.instance.put(url, data)
  }

  /**
   发送DELETE请求
   @param url 请求地址
   @returns Promise<AxiosResponse> 返回一个Promise对象，resolve后的值是Axios返回的响应数据Result
   */
  public delete(url: string): Promise<AxiosResponse<IResponse>> {
    return this.instance.delete(url)
  }
}

// 创建一个单例对象
const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL, // 设置baseURL
  timeout: 10000, // 设置超时时间为10秒钟
})

export default httpClient
