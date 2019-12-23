
/*
  接口加密/解密统一处理
*/
import axios from 'axios'
import CryptoJS from './aes.js'
import qs from 'qs'
import router from '@/router/index'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use((config) => {
  //upload file, use FormData object upload

  // 检查是上传文件字段 ,uploadFileSign(是一个包含1个或多个上传文件name的数组) 定义有多少个字段是上传的文件
  let filesFiledMap = {}
  let requestData = config.data || config.params
  let dataKey = config.data ? 'data' : config.params ? 'params' : 'data'
  const keys = Object.keys(requestData)
  const data = {}
  const forData = new FormData()

  if (requestData && requestData.uploadFileSign) {
    filesFiledMap = requestData.uploadFileSign.reduce((target, item) => {
      target[`${item}`] = true
      return target
    }, {})
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'uploadFileSign') {
        continue
      }
      if (filesFiledMap[`${keys[i]}`] === undefined) {
        data[`${keys[i]}`] = requestData[`${keys[i]}`]
      } else {
        forData.append(`${keys[i]}`, requestData[`${keys[i]}`])
      }
    }
    forData.append('data_list', encrypt(JSON.stringify(data)))
    config[`${dataKey}`] = forData
    // console.log(data)
    return config
  }
  config[`${dataKey}`] = qs.stringify({ data_list: encrypt(JSON.stringify(requestData)) })
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
  let res = ''
  if (response && response.data) {
    res = decrypt(response.data)
  } else {
    res = decrypt(response)
  }
  if (JSON.parse(res).code === 40003 || JSON.parse(res).code === 40011) { // token 验证失败/未注册 提示用户重新登录、注册
    window.localStorage.removeItem('keyMan')
    router.replace('/login')
  }
  return Promise.resolve(res)
}, (err) => {
  return Promise.reject(err)
})

export default axios

// 解密
function decrypt(str) {
  var key = CryptoJS.enc.Utf8.parse('1234567887654321')
  var iv = CryptoJS.enc.Utf8.parse('2019111120191111')
  var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
// 加密
function encrypt(str) {
  var key = CryptoJS.enc.Utf8.parse('1234567887654321')
  var iv = CryptoJS.enc.Utf8.parse('2019111120191111')
  var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })

  return encrypted.toString()
}