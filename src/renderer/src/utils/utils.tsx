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
