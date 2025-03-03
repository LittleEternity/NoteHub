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
