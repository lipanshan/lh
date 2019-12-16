<template>
  <header class="public-header">
    <div class="header-box">
      <div class="left">
        <router-link to="/">
          <img class="logo" src="../assets/img/logo.png" alt />
        </router-link>
        <div class="position">
          <img src="../assets/img/position.png" alt />
          <span class="current-address" id="demo">{{city}}</span>
          <span>[切换城市]</span>
        </div>
        <ul class="navs">
          <router-link
            v-for="menu in menus"
            :key="menu.path"
            :to="`${menu.path}`"
            tag="li"
          >{{menu.name}}</router-link>
        </ul>
      </div>
      <div class="right">
        <div class="select">
          <router-link tag="div" to="/user">我要求职</router-link>
          <router-link tag="div" to="/user">我要招聘</router-link>
        </div>
        <div class="login-btn">
          <router-link tag="div" to="/login">登陆</router-link>
          <router-link tag="div" to="/login">注册</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeadMenu',
  data() {
    return {
      city: '北京',
      menus: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '兼职',
          path: '/parttime'
        },
        {
          name: '全职',
          path: '/fulltime'
        },
        {
          name: '猎头',
          path: '/headhunt'
        },
        {
          name: 'APP',
          path: '/app'
        },
        {
          name: '资讯',
          path: '/consult'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
// @import '../assets/css/index.css';
.public-header {
  padding-left: 107px;
  padding-right: 107px;
  width: 100%;
  min-width: 1280px;
  height: 60px;
  background: #282828;
  .header-box {
    height: 60px;
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    .left {
      display: flex;
      flex: 1;
      .position {
        margin-left: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > img {
          display: block;
          width: 16px;
          height: 20px;
        }
        & > span {
          display: block;
          font-size: 16px;
          line-height: 26px;
          color: #fff;
          cursor: pointer;
          &.current-address {
            color: #f06358;
            margin-left: 4px;
            margin-right: 15px;
          }
        }
      }
      .navs {
        margin-left: 36px;
        flex: 1;
        display: flex;
        & > li {
          padding-left: 16px;
          padding-right: 16px;
          font-size: 18px;
          line-height: 60px;
          color: #dee1e3;
          cursor: pointer;
        }
      }
    }
    .logo {
      width: 138px;
      height: 26px;
      margin-top: 14px;
    }
    .right {
      display: flex;
      .login-btn {
        display: flex;
        width: 164px;
        background: #f06358;
        color: #fff;
        & > div {
          flex: 1;
          font-size: 20px;
          line-height: 60px;
          cursor: pointer;
        }
      }
      .select {
        margin-right: 6px;
        display: flex;
        & > div {
          padding-left: 20px;
          padding-right: 20px;
          font-size: 18px;
          line-height: 60px;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>