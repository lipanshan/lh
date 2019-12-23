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
    component: () => import('@/views/Login'),
    beforeEnter(to, from, next) {
      const flag = window.localStorage.getItem('keyMan')
      const userType = JSON.parse(flag)
      if (flag && userType && userType.userType) {
        next({ path: '/user' })
      } else {
        next()
      }
    }
  },
  {
    path: '/registerintro',
    name: 'registerintro',
    component: () => import('@/views/UserRegisterIntro')
  },
  {
    path: '/registerintro2',
    name: 'registerintro2',
    component: () => import('@/views/UserRegisterHrIntro')
  },
  {
    path: '/registerintro3',
    name: 'registerintro3',
    component: () => import('@/views/UserRegisterPostIntro')
  },
  {
    path: '/user',
    component: () => import('@/views/Layout'),
    children: [
      // 猎头(type=3,内部猎头)  //type=4 外部猎头(兼职猎头)
      {
        path: 'searchresume',
        alias: '',
        component: () => import('@/views/MyPeopleBank')
      },
      {
        path: 'mypost',
        name: 'mypost',
        component: () => import('@/views/MyPost')
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
        path: 'getpost',
        name: 'getpost',
        component: () => import('@/views/GetPost')
      },
      {
        path: 'resumeinfo',
        name: 'resumeInfo',
        component: () => import('@/views/ResumeInfo')
      },
      {
        path: 'uploadresume',
        name: 'uploadresume',
        component: () => import('@/views/UploadResume')
      },
      { // hr
        path: 'companyinfo',
        name: 'companyinfo',
        component: () => import('@/views/CompanyInfo')
      },
      //求职者
      {
        path: 'jobwant',
        name: 'jobwant',
        component: () => import('@/views/JobWant')
      },
      {
        path: 'jobwantchart',
        name: 'jobwantchart',
        component: () => import('@/views/JobwantChart')
      },
      {
        path: 'mydelivery',
        name: 'mydelivery',
        component: () => import('@/views/MyDelivery')
      },
      {
        path: 'myresume',
        name: 'myresume',
        component: () => import('@/views/MyResume')
      },
      {
        path: 'jobwantdetail',
        name: 'jobwantdetail',
        component: () => import('@/views/JobwantDetail')
      },
      // 公共-我的账户
      {
        path: 'myaccount',
        name: 'myaccount',
        component: () => import('@/views/MyAccount')
      }
    ],
    beforeEnter(to, from, next) {
      const flag = window.localStorage.getItem('keyMan')
      if (!flag) {
        next({ path: '/login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/user*',
    redirect: '/user'
  },
  {
    path: '/login*',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
