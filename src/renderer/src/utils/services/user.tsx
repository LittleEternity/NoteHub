import databus from '../databus'

export const getUserinfo = (data: Object) =>
  databus({
    url: '/api/user',
    method: 'get',
    params: data
  })
