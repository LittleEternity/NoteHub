import databus from '../databus'

// 登录
export const login = (data: Object = {}) =>
  databus({
    url: '/auth/login',
    method: 'post',
    params: data
  })

// 获取用户信息
export const getUserinfo = (data: Object = {}) =>
  databus({
    url: '/api/user/info',
    method: 'get',
    params: data
  })

// 刷新 token
export const refreshToken = (data: Object = {}) =>
  databus({
    url: '/auth/refresh-token',
    method: 'post',
    params: data
  })
