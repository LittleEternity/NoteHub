import databus from '../databus'

// 获取笔记列表
export const getNoteList = (data: Object = {}) =>
  databus({
    url: '/api/note/list',
    method: 'post',
    params: data
  })

// 获取笔记详情
export const getNoteDetail = (data: Object = {}) =>
  databus({
    url: '/api/note/detail',
    method: 'post',
    params: data
  })

// 新增笔记
export const addNote = (data: Object = {}) =>
  databus({
    url: '/api/note/create',
    method: 'post',
    params: data
  })

// 更新笔记
export const updateNote = (data: Object = {}) =>
  databus({
    url: '/api/note/update',
    method: 'post',
    params: data
  })

// 移动笔记
export const moveNote = (data: Object = {}) =>
  databus({
    url: '/api/note/move',
    method: 'post',
    params: data
  })

// 删除笔记
export const deleteNote = (data: Object = {}) =>
  databus({
    url: '/api/note/delete',
    method: 'post',
    params: data
  })

// 搜索笔记
export const searchNote = (data: Object = {}) =>
  databus({
    url: '/api/note/search',
    method: 'post',
    params: data
  })

// 获取笔记路径
export const getNotePath = (data: Object = {}) =>
  databus({
    url: '/api/note/path',
    method: 'post',
    params: data
  })

// 获取笔记目录
export const getNoteCatalog = (data: Object = {}) =>
  databus({
    url: '/api/note/catalog',
    method: 'get',
    params: data
  })
