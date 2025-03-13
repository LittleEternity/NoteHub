/*
 * 页面跳转
 * @param url 跳转地址
 */
export function navigatorTo(url: String, newWin: Boolean): void {
  let intactUrl = location.origin + url
  if (newWin) {
    window.open(intactUrl)
  } else {
    location.href = intactUrl
  }
}

/*
 * 重定向
 * @param url 跳转地址
 */
export function redirectTo(url: String): void {
  let intactUrl = location.origin + url
  location.replace(intactUrl)
}

/*
 * 获取token
 * @returns token
 */
export function getToken(): String {
  return localStorage.getItem('token') || ''
}

/*
 * 获取用户信息
 * @returns userInfo
 */
export function getUser(): Object {
  return JSON.parse(localStorage.getItem('userInfo') || '')
}

/**
 * 节流函数
 * @param fn 函数
 * @param delay 延迟执行毫秒数
 * @returns {Function}
 */
export function throttled(fn: Function, delay: number = 50): Function {
  let timer: any = null
  let startTime: number = Date.now()
  return function (this: any) {
    // 当前时间
    let curTime = Date.now()
    // 从上一次到现在，还剩下多少多余时间
    let remaining = delay - (curTime - startTime)
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}

/**
 * 防抖函数
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 * @returns {Function}
 */
export function debounce(func: Function, wait: number, immediate: boolean = false): Function {
  let timeout: any = null
  return function (this: any) {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout) // timeout 不为null
    if (immediate) {
      let callNow: Boolean = !timeout // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * 生成UUID
 * @returns UUID
 */
export const getUUID = () => {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto.randomUUID()
  }
  // 可以考虑添加备用方案，例如使用第三方库如 uuid
  throw new Error('无法生成 UUID，当前环境不支持')
}

/*
 * 判断是否是URL
 * @param url 跳转地址
 */
export const isURL = (url: string): Boolean => {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return urlRegex.test(url)
}

/*
 * 深克隆
 * @param obj 要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
