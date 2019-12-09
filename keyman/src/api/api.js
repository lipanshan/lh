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
    return Promise.resolve(JSON.parse(res))
  })
}

//注册HR人员

const HR_REGISTER_URL = 'api/apidate/hr_register'
export function registerHRUser(data) {
  return axios.post(HR_REGISTER_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//注册猎头人员

const HH_REGISTER_URL = 'api/apidate/lietou_register'
export function registerHHUser(data) {
  return axios.post(HH_REGISTER_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//岗位候选列表

const POST_URL = 'api/apidate/hot_job'
const POST_COUNT = 1000
export function getAllPost() {
  return axios.post(POST_URL, { num: POST_COUNT }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//地区候选列表

const ADDRESS_URL = 'api/apidate/province'
const ADDRESS_COUNT = 1000
export function getAllAddress() {
  return axios.post(ADDRESS_URL, { num: ADDRESS_COUNT }).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//行业候选列表

const INDUSTRY_URL = 'api/apidate/industry_list'
const INDUSTRY_COUNT = 1000
export function getAllIndustry() {
  return axios.post(INDUSTRY_URL).then((res) => {
    return Promise.resolve(res)
  })
}