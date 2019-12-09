import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import HomePage from '@/views/HomePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'parttime',
        name: 'PartTime',
        component: () => import('@/views/PartTime')
      },
      {
        path: 'fulltime',
        name: 'FullTime',
        component: () => import('@/views/FullTime')
      },
      {
        path: 'headhunt',
        name: 'HeadHunt',
        component: () => import('@/views/HeadHunt')
      },
      {
        path: 'app',
        name: 'AppPage',
        component: () => import('@/views/AppPage')
      },
      {
        path: 'consult',
        name: 'Consult',
        component: () => import('@/views/Consult')
      },
      {
        path: 'resumeinfo',
        name: 'ResumeInfo',
        component: () => import('@/views/ResumeInfo')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/user',
    component: () => import('@/views/Layout'),
    children: [
      // 猎头
      {
        path: '',
        component: () => import('@/views/MyPost')
      },
      {
        path: 'jobwant',
        name: 'jobwant',
        component: () => import('@/views/JobWant')
      },
      {
        path: 'searchremuse',
        name: 'serachremuse',
        component: () => import('@/views/SearchResume')
      },
      {
        path: 'mydelivery',
        name: 'mydelivery',
        component: () => import('@/views/MyDelivery')
      },
      {
        path: 'mypost',
        name: 'mypost',
        component: () => import('@/views/MyPost')
      },
      {
        path: 'myresume',
        name: 'myresume',
        component: () => import('@/views/MyResume')
      },
      {
        path: 'jobchart',
        name: 'jobchart',
        component: () => import('@/views/JobChart')
      },
      {
        path: 'mypeoplebank',
        name: 'mypeoplebank',
        component: () => import('@/views/MyPeopleBank')
      },
      {
        path: 'companyinfo',
        name: 'companyinfo',
        component: () => import('@/views/CompanyInfo')
      },
      {
        path: 'myaccount',
        name: 'myaccount',
        component: () => import('@/views/MyAccount')
      }
      // 外部猎头
      // hr
      //求职者
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
