import axios from 'axios'
// import store from '../../store'
// import { getToken } from './cookie.js'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8080/#/', // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  /* if (store.getters.token) {
    config.header['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  } */
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
