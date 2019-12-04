
/*
  接口加密统一处理
*/
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response((response) => {
  return Promise.resolve(response)
}, (err) => {
  return Promise.reject(err)
})