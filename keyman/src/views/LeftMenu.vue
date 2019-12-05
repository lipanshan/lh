<template>
  <div class="menu">
    <div class="menu-title">{{title}}</div>
    <div class="menu-list">
      <div class="user-avatar">
        <img src="../assets/img/3.png" alt />
        <p>姓名/昵称</p>
      </div>
      <router-link to="/user/searchremuse" tag="div">
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
      </router-link>
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
export default {
  name: 'LeftMenu',
  props: {
    title: {
      type: String,
      default: '人才库'
    }
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
        &.jobwant {
          background: url(../assets/img/my.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.chart {
          background: url(../assets/img/msg.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.myliver {
          background: url(../assets/img/email2.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.myresume {
          background: url(../assets/img/note.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.myaccount {
          background: url(../assets/img/account.png) no-repeat 0 0;
          background-size: 18px 18px;
        }
        &.changstatus {
          background: url(../assets/img/tab.png) no-repeat 0 0;
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
          &.jobwant {
            background: url(../assets/img/my.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.chart {
            background: url(../assets/img/msg.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.myliver {
            background: url(../assets/img/email2.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.myresume {
            background: url(../assets/img/note.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.myaccount {
            background: url(../assets/img/account.png) no-repeat 0 0;
            background-size: 18px 18px;
          }
          &.changstatus {
            background: url(../assets/img/tab.png) no-repeat 0 0;
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