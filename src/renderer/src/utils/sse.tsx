import { fetchEventSource } from '@microsoft/fetch-event-source'
import { getToken } from './utils'

// 返回一个AbortController实例，可以中断请求
function sse(
  url: String,
  method: 'GET' | 'POST',
  data: any,
  options = {
    onopen: (response: Response) => {}, // 添加 async
    onmessage: () => {},
    onclose: () => {},
    onerror: (err) => {
      throw err
    }
  }
) {
  const ctrl = new AbortController()
  const env = import.meta.env
  const node_env = process.env.NODE_ENV
  let baseUrl = env.VITE_BASE_URL
  switch (node_env) {
    case 'development':
      baseUrl = '/dev'
      break
    case 'production':
      if (env.MODE !== 'prod') baseUrl = baseUrl.replace(/api/i, 'api-' + env.MODE)
      break
  }

  const apiUrl = baseUrl + url

  const token = getToken().trim()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`
  }
  const fetchOptions = {
    signal: ctrl.signal,
    method: method,
    headers: headers,
    body: JSON.stringify(data),
    openWhenHidden: true, // 窗口隐藏时，继续推流
    onopen: async (response) => options.onopen(response), // 添加 async
    onmessage: options.onmessage,
    onclose: options.onclose,
    onerror: options.onerror
  }
  fetchEventSource(apiUrl, fetchOptions)

  return ctrl
}

export default sse
