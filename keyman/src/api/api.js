import axios from './axios'

//发送验证码
const TEL_VCODE_URL = 'api/apidate/send_phone_message'
export function sendTelVcode(data) {
  return axios.post(TEL_VCODE_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//登录

const LOGIN_URL = 'api/apidate/login'
export function login(data) {
  return axios.post(LOGIN_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 注册求职人员

const JOBSEE_REGISTER_RUL = 'api/apidate/job_hunter_register'
export function registerJobseeUser(data) {
  return axios.post(JOBSEE_REGISTER_RUL, data).then((res) => {
    return Promise.resolve(JOSN.parse(res))
  })
}