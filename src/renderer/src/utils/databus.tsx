import axios from './axios'
import { redirectTo } from './utils'
import { message } from 'antd'

const databus = axios.create({
  timeout: 300000
})

databus.interceptors.request.use(
  (config: any) => {
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: localStorage.getItem('token') || '',
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
    // 接口返回code为401，表示token过期，需要重新登录
    if (res.data.code === 401) {
      localStorage.setItem('token', '')
      localStorage.setItem('userInfo', '')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      redirectTo('/login')
    } else {
      message.error(res.data.message || '服务异常，请稍后再试')
    }
    return Promise.reject(res.data)
  }
)

export default databus
