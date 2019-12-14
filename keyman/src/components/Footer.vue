<template>
  <div class="footer">
    <div class="footer-box">
      <p class="title-row">
        <span class="col1">企业服务</span>
        <span class="col2">使用与帮助</span>
        <span class="col3">联系我们</span>
        <!-- <img class="col4" src="../assets/img/gjrc.png" alt /> -->
      </p>
      <p>
        <span class="col1">用户搜索</span>
        <span class="col2">
          <router-link to="/registerintro3" target="_blank">职业注册协议</router-link>
        </span>
        <span class="col3">上海关键企业管理有限公司</span>
        <span class="col4">企业服务热线和举报投诉 400 000 0000</span>
      </p>
      <p>
        <span class="col1">新闻资讯</span>
        <span class="col2">
          <router-link to="/registerintro2" target="_blank">职业发布规则</router-link>
        </span>
        <span class="col3">公司地址：上海市静安区梅园路228号企业广场</span>
        <span class="col4">工作日 8:00 - 22:00</span>
      </p>
      <p>
        <span class="col1"></span>
        <span class="col2"></span>
        <span class="col3">服务电话：021-62037982</span>
        <span class="col4">休息日 9:30 - 18:30</span>
      </p>
      <p>
        <span class="col1"></span>
        <span class="col2"></span>
        <span class="col3">服务邮箱：kefu@guanjian.com</span>
        <span class="col4"></span>
      </p>
      <div class="beian">
        <div style="width: 210px;">Copyright © 2019</div>
        <div style="width: 170px;">京ICB备14013441号-5</div>
        <div>京ICP证150923号</div>
        <img class="marginl26" src="../assets/img/inter.png" alt />
        <div>电子营业执照</div>
        <img src="../assets/img/police.png" alt />
        <div>京公网安备</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  min-width: 1280px;
  background: #fff;
  .footer-box {
    padding-left: 107px;
    padding-right: 107px;
    text-align: left;
    & > p {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 30px;
      color: #8d92a1;
      .col2,
      .col1 {
        flex: 0 0 240px;
        width: 240px;
      }
      .col3,
      .col4 {
        flex: 1;
      }
      .col4 {
        text-align: right;
      }
      &.title-row {
        font-size: 16px;
        line-height: 40px;
        color: #414a60;
        padding-bottom: 12px;
      }
    }
    span > a {
      color: #818181;
    }
    .beian > div {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      float: left;
      margin-top: 20px;
      color: #818181;
    }
    .beian > img {
      float: left;
      margin: 32px 5px 0;
      width: 14px;
      height: 16px;
    }
    .beian {
      .marginl26 {
        margin-left: 26px;
      }
    }
  }
}
</style>