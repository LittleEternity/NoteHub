import axios from './axios'
import { redirectTo, deepClone } from './utils'
import { message } from 'antd'

const databus = axios.create({
  timeout: 300000
})
// 用于标记是否正在刷新 token
let isRefreshing = false
// 定义 requests 数组中元素的类型
type RequestCallback = (token: string) => void
// 存储因 token 过期而挂起的请求
let requests: RequestCallback[] = []
let params = {}

databus.interceptors.request.use(
  (config: any) => {
    let token = localStorage.getItem('token') || ''
    let tokenType = localStorage.getItem('tokenType') || ''
    token = tokenType + ' ' + token
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
      ...config.propsHeaders
    }
    if (config.method === 'post') {
      config.data = JSON.stringify(config.params)
      config.body = JSON.stringify(config.params)
      config.params = ''
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

databus.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const res = error.response
    const originalConfig = error.config
    let params = JSON.parse(originalConfig.body)

    // 接口返回 code 为 401，表示 token 过期，需要重新登录
    if (res && res.data.code === 401) {
      if (!isRefreshing) {
        isRefreshing = true

        try {
          // 发送刷新 token 请求
          const refreshToken = localStorage.getItem('refreshToken')
          const { data } = await axios.post('/auth/refresh-token', { refreshToken })
          if (!data) {
            return Promise.reject(error)
          }
          // 更新 token
          localStorage.setItem('token', data.accessToken.trim())

          // 重新发起挂起的请求
          requests.forEach((cb: Function) => cb(data.token))
          requests = []

          // 重新发起原请求
          if (originalConfig.method === 'post') {
            originalConfig.params = deepClone(params)
          }
          params = {}
          return databus(originalConfig)
        } catch (refreshError) {
          // 刷新 token 失败，清除 token 并跳转到登录页
          localStorage.setItem('token', '')
          localStorage.setItem('userInfo', '')
          localStorage.setItem('refreshToken', '')
          await new Promise((resolve) => setTimeout(resolve, 1000))
          redirectTo('/login')
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      } else {
        // 正在刷新 token，将请求挂起
        return new Promise((resolve, reject) => {
          requests.push((token: string) => {
            originalConfig.headers.Authorization = token
            databus(originalConfig)
              .then((response) => resolve(response))
              .catch((error) => reject(error))
          })
        })
      }
    } else {
      message.error(res.data.message || '服务异常，请稍后再试')
    }
    return Promise.reject(res.data)
  }
)

export default databus
