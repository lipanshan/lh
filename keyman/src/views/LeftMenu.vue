<template>
  <div class="menu">
    <div class="menu-title">{{title}}</div>
    <div class="menu-list">
      <div class="user-avatar">
        <div class="avatar-wrap">
          <img :src="avatar" alt />
        </div>
        <p>{{nickname}}</p>
      </div>
      <router-link v-for="menu in menus" :key="menu.path" :to="menu.path" tag="div">
        <span class="img" :class="menu.iconClass"></span>
        <span>{{menu.title}}</span>
      </router-link>
      <div class="line"></div>
      <!-- hr 特有标签页 -->
      <router-link v-show="getUserType === '2'" :to="'/user/companyinfo'" tag="div">
        <span class="img companyinfo"></span>
        <span>公司资料</span>
      </router-link>
      <router-link :to="'/user/myaccount'" tag="div">
        <span class="img myaccount"></span>
        <span>我的账户</span>
      </router-link>
      <div>
        <span class="img changstatus"></span>
        <span>切换身份</span>
      </div>
      <div class="exit" @click="onExit">
        <span class="img exit"></span>
        <span>退出登录</span>
      </div>
      <img src="../assets/img/weixinx@2x.png" alt />
      <p class="qcode-title">小程序</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'LeftMenu',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menushr: [
        {
          path: '/user/searchremuse',
          iconClass: 'searchremuse',
          title: '搜简历'
        },
        {
          path: '/user/jobchart',
          iconClass: 'chart',
          title: '职聊'
        },
        {
          path: '/user/mypost',
          iconClass: 'mypost',
          title: '我的职位'
        },
        {
          path: '/user/mypeoplebank',
          iconClass: 'mypeoplebank',
          title: '我的人才库'
        }
      ],
      menusjb: [
        {
          path: '/user/jobwant',
          iconClass: 'jobwant',
          title: '求职'
        },
        {
          path: '/user/jobwantchart',
          iconClass: 'chart',
          title: '职聊'
        },
        {
          path: '/user/mydelivery',
          iconClass: 'myliver',
          title: '我的投递'
        },
        {
          path: '/user/myresume',
          iconClass: 'myresume',
          title: '我的简历'
        }
      ]
    }
  },
  computed: {
    menus() {
      // 根据不同用户类型显示不同的左侧菜单, 1.求职类, 2.猎头/hr
      return /1/.test(this.getUserType) ? this.menusjb : this.menushr
    },
    ...mapGetters({
      getUserType: 'getUserType',
      avatar: 'getAvatar',
      nickname: 'getNickname'
    })
  },
  methods: {
    onExit() {
      this.syncSetToken('')
      this.syncSetUsetType('')
      this.syncSetMemberId('')
      this.syncSetAvatar('')
      this.syncSetNickname('')
      window.localStorage.removeItem('keyMan')
      this.$router.replace('/')
    },
    ...mapMutations([
      'syncSetToken',
      'syncSetUsetType',
      'syncSetMemberId',
      'syncSetAvatar',
      'syncSetNickname'
    ])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  min-height: 760px;
  height: 100%;
  background: #49434b;
  .menu-title {
    font-size: 22px;
    line-height: 54px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    text-overflow: hidden;
    width: 100%;
    overflow: hidden;
    background-color: #ff7272;
  }
  .menu-list {
    background: #49434b;
    padding-bottom: 50px;
    .user-avatar {
      margin: 0 auto 0;
      padding-top: 40px;
      padding-left: 0;
      display: block;
      .avatar-wrap {
        margin: 0 auto;
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #fff;
        & > img {
          display: block;
          width: 70px;
          height: 70px;
          border-radius: 50%;
        }
      }

      & > p {
        padding-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
        min-height: 44px;
      }
    }
    & > div {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 20px;
      & > span {
        display: block;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 18px;
        line-height: 30px;
        color: #999999;
        cursor: pointer;
      }
      & > .img {
        margin-right: 10px;
        display: block;
        padding-top: 0;
        padding-bottom: 0;
        width: 18px;
        height: 18px;
        cursor: pointer;
        &.searchremuse {
          background: url(../assets/img/searchremuse.png) no-repeat center 0;
          background-size: 16px 18px;
        }
        &.chart {
          background: url(../assets/img/chart.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.mypost {
          background: url(../assets/img/mypost.png) no-repeat center center;
          background-size: 18px 18px;
        }
        &.myaccount {
          background: url(../assets/img/myaccount.png) no-repeat center center;
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
        &.myliver {
          background: url(../assets/img/email2.png) no-repeat center center;
          background-size: 18px 13px;
        }
        &.myresume {
          background: url(../assets/img/myresume.png) no-repeat 0 0;
          background-size: 18px 18px;
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
      }
      &.router-link-exact-active {
        background: #6b676e;
        & > span {
          color: #fff;
        }
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 10px;
          left: 0;
          width: 2px;
          height: 40px;
          background-color: #ff7272;
        }
        & > .img {
          &.searchremuse {
            background: url(../assets/img/searchremuse_hover.png) no-repeat
              center 0;
            background-size: 18px 18px;
          }
          &.chart {
            background: url(../assets/img/chart_hover.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.mypost {
            background: url(../assets/img/mypost_hover.png) no-repeat center
              center;
            background-size: 18px 18px;
          }
          &.myaccount {
            background: url(../assets/img/myaccount_hover.png) no-repeat center
              center;
            background-size: 18px 18px;
          }
          &.mypeoplebank {
            background: url(../assets/img/mypeoplebank_hover.png) no-repeat
              center center;
            background-size: 18px 18px;
          }
          &.jobwant {
            background: url(../assets/img/jobwant_hover.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.myliver {
            background: url(../assets/img/email2_hover.png) no-repeat center
              center;
            background-size: 18px 18px;
          }
          &.myresume {
            background: url(../assets/img/myremuse_hover.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.changstatus {
            background: url(../assets/img/changestatus_hover.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.companyinfo {
            background: url(../assets/img/company_info_hover.png) no-repeat
              center center;
            background-size: 18px 18px;
          }
        }
      }
    }
    & > .line {
      margin: 50px auto;
      width: 80%;
      height: 2px;
      background: #666666ff;
    }
    .qcode-title {
      margin: 6px auto;
      font-size: 18px;
      line-height: 30px;
      color: #fff;
      font-weight: 600px;
    }
  }
}
</style>