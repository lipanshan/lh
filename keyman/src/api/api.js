import axios from './axios'

// uploadFileSign [] 参数记录上传文件字段key

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
const POST_COUNT = 10000
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

// 地区数据格式化-工具函数

export const formatterAddressData = node => {
  for (let i = 0; i < node.length; i++) {
    // if (node[i].grade != undefined && node[i].grade === 2) {

    // }
    if (!node[i].data_list) {
      continue
    }
    if (node[i].data_list && !node[i].data_list.length) {
      node[i].data_list = undefined
      continue
    }
    formatterAddressData(node[i].data_list)
  }
}

//行业候选列表

const INDUSTRY_URL = 'api/apidate/industry_list'
const INDUSTRY_COUNT = 10000
export function getAllIndustry() {
  return axios.post(INDUSTRY_URL, {}).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 内部猎头--职位列表

const POST_LIST_URL = 'api/apidate/my_job'
export function getMyPost(data) {
  return axios.post(POST_LIST_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 外部猎头--个人简历列表

const PERSONAL_RESUME_URL = 'api/apidate/resume_info'
export function getPersonalResule(data) {
  return axios.post(PERSONAL_RESUME_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 猎头-账户信息展示

const SHOW_INFO_URL = 'api/apidate/get_my_message'

export function getAccountInfo(data) {
  return axios.post(SHOW_INFO_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 猎头-账户个人信息修改

const HH_INFO_URL = 'api/apidate/up_my_message'
export function modifyAccountInfo(data) {
  return axios.post(HH_INFO_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头-账户联系方式修改

const HH_TEL_URL = 'api/apidate/contact_way'
export function modifyAccountTel(data) {
  return axios.post(HH_TEL_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 猎头、hr-实名认证

const CERTIFICATION_URL = 'api/apidate/member_card'
export function certificationUser(data) {
  return axios.post(CERTIFICATION_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 猎头-获取认证状态

const CERTICATION_STATUS_URL = 'api/apidate/member_card_type'

export function getCertStatus(data) {
  return axios.post(CERTICATION_STATUS_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头、hr-职位详情-职位

const POSTION_DETAIL_POST_URL = 'api/apidate/rz_lt_job'

export function getDetailPost(data) {
  return axios.post(POSTION_DETAIL_POST_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头、hr-职位详情-公司

const POSTION_DETAIL_COMPANY_URL = 'api/apidate/rz_lt_job'

export function getDetailCompany(data) {
  return axios.post(POSTION_DETAIL_COMPANY_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头、hr-职位详情-猎头

const POSTION_DETAIL_HH_URL = 'api/apidate/rz_lt_lt'

export function getDetailHH(data) {
  return axios.post(POSTION_DETAIL_HH_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头-创建职位

const CREATE_HH_URL = 'api/apidate/add_job'

export function createPost(data) {
  return axios.post(CREATE_HH_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头-编辑职位-信息

const GET_HH_POST_EDITOR_INFO_URL = 'api/apidate/edit_job_data'

export function getPostEditorInfo(data) {
  return axios.post(GET_HH_POST_EDITOR_INFO_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头-编辑职位

const EDITOR_HH_URL = 'api/apidate/edit_job'

export function editorPost(data) {
  return axios.post(EDITOR_HH_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//猎头-编辑职位-状态

const EDITOR_HH_STATUS_URL = 'api/apidate/edit_job_type'

export function ediotrPostStatus(data) {
  return axios.post(EDITOR_HH_STATUS_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 我的账户-常用语句新增

const ADD_WORD_URL = 'api/apidate/add_cy_sentences'

export function addWord(data) {
  return axios.post(ADD_WORD_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 我的账户-常用语句编辑

const EDITOR_WORD_URL = 'api/apidate/edit_cy_sentences'

export function editorWord(data) {
  return axios.post(EDITOR_WORD_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 我的账户-常用语句删除

const DELETE_WORD_URL = 'api/apidate/del_cy_sentences'

export function deleteWord(data) {
  return axios.post(DELETE_WORD_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 猎头获取邮箱

const GET_EMAIL_URL = 'api/apidate/get_email'

export function getUserEmail(data) {
  return axios.post(GET_EMAIL_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 搜人才

const SERACH_PEOPLE_URL = 'api/apidate/rencai'

export function searchPeople(data) {
  return axios.post(SERACH_PEOPLE_URL, data).then(res => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 个人简历

const GET_PERSONAL_RESUME_URL = 'api/apidate/resume_info'

export function getUserResume(data) {
  return axios.post(GET_PERSONAL_RESUME_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//上传个人简历-个人信息

const UPLOAD_RESUME_INFO_URL = 'api/apidate/resume_message'

export function uploadResumeInfo(data) {
  return axios.post(UPLOAD_RESUME_INFO_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//上传个人简历-工作经历

const UPLOAD_RESUME_EXPER_URL = 'api/apidate/job_experience'

export function uploadResumeExper(data) {
  return axios.post(UPLOAD_RESUME_EXPER_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//上传个人简历-教育经历

const UPLOAD_RESUME_EDU_URL = 'api/apidate/study_experience'

export function uploadResumeEdu(data) {
  return axios.post(UPLOAD_RESUME_EDU_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

//上传个人简历-教育经历

const UPLOAD_RESUME_PROJECT_URL = 'api/apidate/project_experience'

export function uploadResumeProject(data) {
  return axios.post(UPLOAD_RESUME_PROJECT_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 首页搜索、全职搜索

const HOME_PAGE_SERARCH_URL = 'api/apidate/all_job_list'

export function searchAllJob(data) {
  return axios.post(HOME_PAGE_SERARCH_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 首页搜索、兼职搜索

const HOME_PAGE_SERARCH2_URL = 'api/apidate/time_job_list'

export function searchTimeAllJob(data) {
  return axios.post(HOME_PAGE_SERARCH2_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 公开页面-猎头列表1

const HH_LIST1_URL = 'api/apidate/headhunter'

export function getHHList1(data) {
  return axios.post(HH_LIST1_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 公开页面-猎头列表1

const HH_LIST2_URL = 'api/apidate/headhunter_list'

export function getHHList2(data) {
  return axios.post(HH_LIST2_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 公开页面-获取咨询

const CONSULT_DATA_URL = 'api/apidate/content_list'

export function getConsult(data) {
  return axios.post(CONSULT_DATA_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 通用-获取简历

const PUBLIC_RESUME_INFO_URL = 'api/apidate/get_resume'

export function publicGetResumeInfo(data) {
  return axios.post(PUBLIC_RESUME_INFO_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职人员-我的投递-全部投递列表

const MYDELIVERY_ALL_URL = 'api/apidate/qzz_mysend_qbtd'

export function getAllDeliveryList(data) {
  return axios.post(MYDELIVERY_ALL_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职人员-我的投递-置顶职位列表

const MYDELIVERY_TOP_URL = 'api/apidate/qzz_mysend_zdzw'

export function getTopDeliveryList(data) {
  return axios.post(MYDELIVERY_TOP_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职人员-我的投递-不感兴趣列表nointerest

const MYDELIVERY_NOINTEREST_URL = 'api/apidate/qzz_mysend_refuse'

export function getNoINTERESTDeliveryList(data) {
  return axios.post(MYDELIVERY_NOINTEREST_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-个人信息

const RESUME_INFO_URL = 'api/apidate/qz_resume_message_list'

export function getResumeInfo(data) {
  return axios.post(RESUME_INFO_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-个人信息-编辑

const RESUME_INFO_EDIOTR_URL = 'api/apidate/edit_resume_message'

export function saveResumeEditorInfo(data) {
  return axios.post(RESUME_INFO_EDIOTR_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-个人优势

const RESUME_ADVANTAGE_URL = 'api/apidate/get_resume_gerjs'

export function getResumeAdvantage(data) {
  return axios.post(RESUME_ADVANTAGE_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-个人优势-编辑

const RESUME_ADVANTAGE_EDIOTR_URL = 'api/apidate/edit_resume_gerjs'

export function saveResumeEditorAdvantage(data) {
  return axios.post(RESUME_ADVANTAGE_EDIOTR_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-期望职位

const RESUME_WANT_POST_URL = 'api/apidate/get_resume_qwzw'

export function getResumeWantPost(data) {
  return axios.post(RESUME_WANT_POST_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-期望职位-编辑

const RESUME_WANT_POST_EDITOR_URL = 'api/apidate/edit_resume_qwzw'

export function saveResumeEditorWantPost(data) {
  return axios.post(RESUME_WANT_POST_EDITOR_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-工作经历

const RESUME_WOEK_EXP_URL = 'api/apidate/get_resume_work_exp'

export function getResumeWorkExp(data) {
  return axios.post(RESUME_WOEK_EXP_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-工作经历-编辑

const RESUME_WOEK_EXP_EDITOR_URL = 'api/apidate/edit_resume_work_exp'

export function saveResumeEditorWorkExp(data) {
  return axios.post(RESUME_WOEK_EXP_EDITOR_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-项目经历

const RESUME_PROJECT_EXP_URL = 'api/apidate/get_resume_project_exp'

export function getResumeProjectExp(data) {
  return axios.post(RESUME_PROJECT_EXP_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-项目经历-编辑

const RESUME_PROJECT_EXP_EDITOR_URL = 'api/apidate/edit_resume_project_exp'

export function saveResumeEditorProjectExp(data) {
  return axios.post(RESUME_PROJECT_EXP_EDITOR_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-教育经历

const RESUME_EDU_EXP_URL = 'api/apidate/get_resume_study'

export function getResumeEduExp(data) {
  return axios.post(RESUME_EDU_EXP_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-简历-教育经历

const RESUME_EDU_EXP_EDITOR_URL = 'api/apidate/edit_resume_study'

export function saveResumeEditorEduExp(data) {
  return axios.post(RESUME_EDU_EXP_EDITOR_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}

// 求职者-添加求职意向

const JOB_INTENTION_URL = 'api/apidate/job_intention'

export function saveJobIntention(data) {
  return axios.post(JOB_INTENTION_URL, data).then((res) => {
    return Promise.resolve(JSON.parse(res))
  })
}