<template>
  <div class="layout">
    <div class="content">
      <LeftMenu class="left-menu"></LeftMenu>
      <div class="right-container">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import LeftMenu from '@/views/LeftMenu'
import Footer from '@/components/Footer'
export default {
  name: 'Layout',
  data() {
    return {}
  },
  components: {
    LeftMenu,
    Footer
  }
}
</script>

<style lang="scss">
.layout {
  min-width: 1200px;
  width: 100%;
  & > .content {
    display: flex;
    .left-menu {
      width: 200px;
    }
    .right-container {
      flex: 1;
    }
  }
}
</style>