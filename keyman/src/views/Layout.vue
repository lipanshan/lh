<template>
  <div class="layout">
    <div class="content">
      <div class="left-menu">
        <vue-scroll :ops="vueScrollOps">
          <LeftMenu :title="topTitle"></LeftMenu>
        </vue-scroll>
      </div>
      <div class="right-container">
        <div class="top-nav">
          <div class="content">
            <span class="icon" :class="name"></span>
            <p class="title">{{name | filterName}}</p>
            <el-select class="chart-post-list" v-show="name === 'jobchart'" v-model="postList">
              <el-option label="职位1" value="1"></el-option>
              <el-option label="职位3" value="2"></el-option>
              <el-option label="职位2" value="3"></el-option>
            </el-select>
          </div>
        </div>
        <router-view :jobchart="postList"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/views/LeftMenu'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
      postList: [],
      vueScrollOps: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#DCDFE6'
        },
        bar: {
          background: '#DCDFE6'
        }
      }
    }
  },
  computed: {
    topTitle() {
      if (this.getUserType > 1) {
        return '搜人才'
      }
      return '关键人才'
    },
    name() {
      return this.$route.name
    },
    ...mapGetters(['getUserType'])
  },
  components: {
    LeftMenu
  },
  filters: {
    filterName(n) {
      const nameMap = {
        undefined: '搜人才',
        mydelivery: '我的投递',
        mypost: '我的职位',
        jobchart: '职聊',
        jobwantchart: '职聊',
        mypeoplebank: '我的人才库',
        myaccount: '我的账户',
        jobwant: '求职',
        myliver: '我的投递',
        myresume: '我的简历',
        changstatus: '切换身份',
        companyinfo: '公司资料',
        getpost: '领取的职位',
        searchpeople: '搜人才',
        resumeInfo: '个人简历',
        uploadresume: '上传简历'
      }
      return nameMap[`${n}`]
    }
  }
}
</script>

<style lang="scss">
body {
  background: #eff1f5ff;
}
.layout {
  min-width: 1280px;
  width: 100%;
  & > .content {
    padding-left: 160px;
    .left-menu {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
      bottom: 0;
      width: 160px;
    }
    .right-container {
      width: 100%;
      & > .top-nav {
        background: #f5f5f5ff;
        height: 54px;
        & > .content {
          margin: 0 auto;
          max-width: 1240px;
          display: flex;
          & > .icon {
            margin-top: 19px;
            display: block;
            margin-right: 6px;
            width: 20px;
            height: 22px;
            background: url(../assets/img/searchremuse.png) no-repeat center 0;
            background-size: 16px 18px;
            &.jobchart,
            &.jobwantchart {
              background: url(../assets/img/chart.png) no-repeat 0 0;
              background-size: 18px 18px;
            }
            &.mypost {
              background: url(../assets/img/mypost.png) no-repeat center center;
              background-size: 18px 18px;
            }
            &.myaccount {
              background: url(../assets/img/myaccount.png) no-repeat center
                center;
              background-size: 16px 16px;
            }
            &.mypeoplebank {
              background: url(../assets/img/mypeoplebank.png) no-repeat center
                center;
              background-size: 18px 18px;
            }
            &.jobwant {
              background: url(../assets/img/my.png) no-repeat 0 0;
              background-size: 18px 18px;
            }
            &.myliver,
            &.mydelivery {
              background: url(../assets/img/email2.png) no-repeat center center;
              background-size: 18px 18px;
            }
            &.myresume {
              // background: url(../assets/img/myresume.png) no-repeat 0 0;
              // background-size: 18px 18px;
            }
            &.changstatus {
              background: url(../assets/img/change_status.png) no-repeat 0 0;
              background-size: 18px 18px;
            }
            &.companyinfo {
              background: url(../assets/img/company_info.png) no-repeat center
                center;
              background-size: 18px 18px;
            }
            &.getpost {
              background: url(../assets/img/getpost.png) no-repeat center center;
              background-size: 18px 18px;
            }
            &.searchpeople {
              background: url(../assets/img/searchpeople.png) no-repeat center
                center;
              background-size: 18px 18px;
            }
          }
          & > .title {
            margin-top: 17px;
            font-size: 16px;
            line-height: 26px;
            color: #414a60ff;
          }
          & > .chart-post-list {
            margin-top: 14px;
            .el-input__inner {
              margin-left: 30px;
              width: 200px;
              border-radius: 0;
              line-height: 34px;
              height: 34px;
            }
            .el-input__icon {
              line-height: 34px;
            }
          }
        }
      }
    }
  }
}
</style>