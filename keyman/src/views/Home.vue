<template>
  <div class="home">
    <HeaderMenu></HeaderMenu>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeadMenu'
import Footer from '@/components/Footer'
export default {
  name: 'Home',
  data() {
    return {}
  },
  mounted: function() {},
  methods: {},

  components: {
    HeaderMenu,
    Footer
  }
}
</script>

<style lang="scss">
.router-link-exact-active {
  color: #f06358 !important;
}
</style>