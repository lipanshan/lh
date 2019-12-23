<template>
  <div class="app-page">
    <div class="main-box">
      <div class="side">
        <img src="../assets/img/app_left.png" alt />
      </div>
      <div class="center">
        <img src="../assets/img/app_center.png" alt />
      </div>
      <div class="side">
        <img src="../assets/img/app_right.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppPage'
}
</script>
<style lang="scss">
.app-page {
  position: relative;
  width: 100%;
  min-width: 1280px;
  height: 694px;
  background: url(../assets/img/app_page_bg@2x.png) no-repeat center 0 #fff;
  background-size: cover;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(../assets/img/app_bg.png) repeat 0 0;
    z-index: 1;
  }
  .main-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 816px;
    height: 376px;
    margin-left: -408px;
    margin-top: -188px;
    display: flex;
    align-items: flex-end;
    z-index: 10;
    & > div {
      background: #fff;
    }
    .side {
      margin-top: 60px;
      position: relative;
      width: 250px;
      height: 254px;
    }
  }
}
</style>