<template>
  <header>
    <div class="header-box">
      <img class="logo" src="../assets/img/logo.png" alt />
      <div class="position">
        <img src="../assets/img/position.png" alt />
        <span id="demo">{{city}}</span>
        <span>[切换城市]</span>
      </div>
      <ul class="nav">
        <router-link
          v-for="menu in menus"
          :key="menu.path"
          :to="`${menu.path}`"
          tag="li"
        >{{menu.name}}</router-link>
      </ul>
      <div class="login-btn">
        <router-link tag="div" to="/login">登陆</router-link>
        <router-link tag="div" to="/login">注册</router-link>
      </div>
      <div class="select">
        <div>我要求职</div>
        <div>我要招聘</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeadMenu',
  data() {
    return {
      city: '',
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
@import '../assets/css/index.css';
</style>