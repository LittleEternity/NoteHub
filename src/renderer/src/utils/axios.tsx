import axios from 'axios'

const env = import.meta.env
const node_env = process.env.NODE_ENV
let baseUrl = env.VITE_BASE_URL
switch (node_env) {
  case 'development':
    axios.defaults.baseURL = '/dev'
    break
  case 'production':
    if (env.MODE !== 'prod') baseUrl = baseUrl.replace(/api/i, 'api-' + env.MODE)
    axios.defaults.baseURL = baseUrl
    break
}

export default axios
