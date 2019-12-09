<template>
  <div class="menu">
    <div class="menu-title">{{title}}</div>
    <div class="menu-list">
      <div class="user-avatar">
        <img :src="avatar" alt />
        <p>{{nickname}}</p>
      </div>
      <router-link v-for="menu in menus" :key="menu.path" :to="menu.path" tag="div">
        <span class="img" :class="menu.iconClass"></span>
        <span>{{menu.title}}</span>
      </router-link>
      <!-- <router-link to="/user/searchremuse" tag="div">
        <span class="img jobwant"></span>
        <span>搜简历</span>
      </router-link>
      <router-link to="/user/jobchart" tag="div">
        <span class="img chart"></span>
        <span>职聊</span>
      </router-link>
      <router-link to="/user/mypost" tag="div">
        <span class="img myliver"></span>
        <span>我的职位</span>
      </router-link>
      <router-link to="/user/mypeoplebank" tag="div" class="active">
        <span class="img myresume"></span>
        <span>我的人才库</span>
      </router-link>-->
      <div class="line"></div>
      <router-link to="/user/myaccount" tag="div">
        <span class="img myaccount"></span>
        <span>我的账户</span>
      </router-link>
      <div>
        <span class="img changstatus"></span>
        <span>切换身份</span>
      </div>
      <img src="../assets/img/weixinx@2x.png" alt />
      <p class="qcode-title">小程序</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LeftMenu',
  props: {
    title: {
      type: String,
      default: '人才库'
    },
    avatar: {
      type: String,
      default: ''
    },
    nickname: {
      typee: String,
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
          path: '/user/searchremuse',
          iconClass: 'jobwant',
          title: '求职'
        },
        {
          path: '/user/jobchart',
          iconClass: 'chart',
          title: '职聊'
        },
        {
          path: '/user/mypost',
          iconClass: 'myliver',
          title: '我的投递'
        },
        {
          path: '/user/mypeoplebank',
          iconClass: 'myresume',
          title: '我的简历'
        }
      ]
    }
  },
  computed: {
    menus() {
      // 根据不同用户类型显示不同的左侧菜单
      return /1/.test(this.getUserType) ? this.menusjb : this.menushr
    },
    ...mapGetters(['getUserType'])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  min-height: 1020px;
  background: #49434b;
  .menu-title {
    font-size: 22px;
    line-height: 60px;
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
    .user-avatar {
      margin: 0 auto 0;
      padding-top: 40px;
      padding-left: 0;
      display: block;
      & > img {
        margin: 0 auto;
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      & > p {
        padding-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
        text-overflow: hidden;
        width: 100%;
        overflow: hidden;
      }
    }
    & > div {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 54px;
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
          background-size: 18px 18px;
        }
        &.myresume {
          background: url(../assets/img/myresume.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.changstatus {
          background: url(../assets/img/change_status.png) no-repeat 0 0;
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
            background: url(../assets/img/searchremuse_hover.png) no-repeat center 0;
            background-size: 18px 18px;
          }
          &.chart {
            background: url(../assets/img/chart_hover.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.mypost {
            background: url(../assets/img/mypost_hover.png) no-repeat center center;
            background-size: 18px 18px;
          }
          &.myaccount {
            background: url(../assets/img/myaccount_hover.png) no-repeat center center;
            background-size: 18px 18px;
          }
          &.mypeoplebank {
            background: url(../assets/img/mypeoplebank_hover.png) no-repeat center
              center;
            background-size: 18px 18px;
          }
          &.jobwant {
            background: url(../assets/img/jobwant_hover.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.myliver {
            background: url(../assets/img/email2_hover.png) no-repeat center center;
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
        }
      }
    }
    & > .line {
      margin: 50px auto;
      width: 180px;
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