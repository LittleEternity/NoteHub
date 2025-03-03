import axios from './axios'
import { redirectTo } from './utils'

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
  async(error) => {
    const res = error.response
    if (res.data.code === 401) {
      localStorage.setItem('token', '')
      localStorage.setItem('userInfo', '')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      redirectTo('/login')
    }
    return Promise.reject(res.data)
  }
)

export default databus
