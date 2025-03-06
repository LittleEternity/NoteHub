import databus from '../databus'

export const login = (data: Object) =>
  databus({
    url: '/auth/login',
    method: 'post',
    params: data
  })

export const getUserinfo = (data: Object) =>
  databus({
    url: '/api/user',
    method: 'get',
    params: data
  })
