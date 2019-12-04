<template>
  <div class="resume-in">
    <div class="section">
      <div class="left">
        <p class="status">已实名认证</p>
        <h1 class="name">姓名</h1>
        <ul class="list">
          <li class="item">4年经验</li>
          <li class="item">本科学历</li>
          <li class="item">离职随时到岗</li>
        </ul>
        <ul class="list">
          <li class="item-num">13919828272</li>
          <li class="item-num">l9366131422</li>
          <li class="item-num">93661524566</li>
          <li class="item-num">darkmagican163@163.com</li>
        </ul>
      </div>
      <div class="avatar">
        <img src alt />
      </div>
    </div>
    <div class="section2">
      <ul class="navs">
        <li class="nav-item active">
          <span>简历</span>
        </li>
        <li class="nav-item">
          <span>附件简历</span>
        </li>
        <li class="nav-item">
          <span>关联项目</span>
        </li>
      </ul>
      <div class="content-wrap">
        <div class="box">
          <p class="title">求职意向</p>
          <ul class="box-info">
            <li class="info">期望工作地点： 北京</li>
            <li class="info">期望月薪： 1000-15000元/月</li>
            <li class="info">目前状况：在职</li>
            <li class="info">期望从事职业： 信息技术专员</li>
            <li class="info">期望从事行业： IT服务</li>
          </ul>
        </div>
        <div class="box">
          <p class="title">自我介绍</p>
          <ul class="box-info">
            <li class="info">1.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">2.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">3.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">5.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">5.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
          </ul>
        </div>
        <div class="box">
          <p class="title">工作经历</p>
          <p class="subtitle">
            <span class="strong">2017.05-至今 北京艺评网络科技有限公司</span>
            <span>互联网/电子商务</span>
            <span>后端开发</span>
          </p>
          <ul class="box-info">
            <li class="info">1.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">2.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">3.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">5.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
            <li class="info">5.熟练掌握HTML、CSS、PHP、Javascript、Ajax等</li>
          </ul>
          <p class="subtitle">
            <span class="strong">工作业绩</span>
          </p>
          <ul class="box-info"></ul>
          <p class="subtitle">
            <span class="strong">工作描述</span>
          </p>
          <ul class="box-info"></ul>
        </div>
        <div class="box">
          <p class="title">教育经历</p>
          <ul class="box-info">
            <li class="info">
              <span>2009.09-2013.07</span>
              <span>枣庄学院</span>
              <span>地理信息系统</span>
              <span>本科</span>
              <span>统招</span>
            </li>
          </ul>
        </div>
        <div class="box">
          <p class="title">外语能力</p>
          <ul class="box-info">
            <li class="info">
              <span>语种</span>
              <span>英语</span>
              <span>数量</span>
            </li>
          </ul>
        </div>
        <div class="box">
          <p class="title">资格证书</p>
          <ul class="box-info">
            <li class="info">
              <span>2009.09-2013.07</span>
              <span>证书名称：</span>
              <span>证书登记：</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeIn'
}
</script>

<style lang="scss" scoped>
.resume-in {
  width: 960px;
  margin: 24px auto 48px;
  .section {
    display: flex;
    background-color: #fff;
    & > .left {
      flex: 1;
      margin-left: 66px;
      .status {
        text-align: left;
        position: relative;
        margin-top: 30px;
        padding-left: 16px;
        font-size: 12px;
        line-height: 22px;
        color: #4adcc2;
        &::before {
          content: '';
          display: block;
          width: 12px;
          height: 10px;
          position: absolute;
          top: 6px;
          left: 0;
          background: url(../assets/img/shimingrenzheng@2x.png) no-repeat 0 0;
          background-size: 12px 10px;
        }
      }
      .name {
        margin-top: 22px;
        font-size: 24px;
        line-height: 30px;
        color: #414a60;
        text-align: left;
      }
      .list {
        margin-top: 15px;
        display: flex;
        & > .item {
          padding-right: 20px;
          padding-left: 34px;
          margin-right: 20px;
          position: relative;
          font-size: 14px;
          line-height: 24px;
          color: #414a60;
          &::before {
            content: '';
            position: absolute;
            top: 6px;
            left: 0;
            width: 14px;
            height: 12px;
            background: url(../assets/img/jingyan.png) no-repeat 0 0;
          }
          &::after {
            content: '';
            position: absolute;
            top: 5px;
            right: 0;
            width: 1px;
            height: 14px;
            background: #999999;
          }
          &:nth-child(2) {
            &::before {
              content: '';
              background: url(../assets/img/xueli.png) no-repeat 0 0;
              background-size: 14px 12px;
            }
          }
          &:nth-child(3) {
            &::before {
              content: '';
              background: url(../assets/img/zhuangtai.png) no-repeat 0 0;
              background-size: 14px 12px;
            }
            &::after {
              content: '';
              display: none;
            }
          }
        }
        & > .item-num {
          @extend .item;
          &:nth-child(1) {
            &::before {
              content: '';
              background: url(../assets/img/dianhua@2x.png) no-repeat 0 0;
              background-size: 14px 12px;
            }
          }
          &:nth-child(2) {
            &::before {
              content: '';
              background: url(../assets/img/weixin@2x.png) no-repeat 0 0;
              background-size: 14px 12px;
            }
          }
          &:nth-child(3) {
            &::before {
              content: '';
              background: url(../assets/img/qq@2x.png) no-repeat 0 0;
              background-size: 10px 12px;
            }
          }
          &:nth-child(4) {
            &::before {
              content: '';
              background: url(../assets/img/mail@2x.png) no-repeat 0 0;
              background-size: 14px 10px;
            }
          }
          &:last-child {
            &::after {
              content: '';
              display: none;
            }
          }
        }
      }
    }
    & > .avatar {
      margin-top: 60px;
      margin-right: 110px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #e3e7ed;
      & > img {
        display: block;
        width: 90px;
        height: 90px;
      }
    }
  }
  .section2 {
    margin-top: 12px;
    .navs {
      display: flex;
      border-bottom: 1px solid #e4e4e4;
      .nav-item {
        padding-top: 26px;
        flex: 1;
        text-align: center;
        cursor: pointer;
        & > span {
          position: relative;
          display: inline-block;
          padding-left: 40px;
          padding-right: 40px;
          font-size: 20px;
          line-height: 60px;
          color: #424a5e;
          font-weight: 600;
        }
        &.active {
          & > span {
            color: #ff7272;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              bottom: -1px;
              height: 2px;
              background-color: #ff7272;
            }
          }
        }
      }
    }
    .content-wrap {
      padding-top: 4px;
      padding-left: 50px;
      text-align: left;
      & > .box {
        & > .title {
          position: relative;
          font-size: 18px;
          line-height: 28px;
          color: #414a60;
          padding-left: 14px;
          font-weight: 600;
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -1px;
            width: 2px;
            height: 14px;
            margin-top: -7px;
            background-color: #ff7272;
          }
        }
        & > .subtitle {
          padding-left: 14px;
          display: flex;
          margin-top: 18px;
          & > .strong {
            margin-left: 0;
            font-size: 16px;
            line-height: 26px;
            font-weight: 600;
          }
          & > span {
            margin-left: 18px;
            font-size: 14px;
            line-height: 26px;
          }
        }
        & > .box-info {
          margin-top: 14px;
          padding-left: 14px;
          padding-bottom: 44px;
          font-size: 14px;
          line-height: 28px;
          color: #848484;
          & > .info {
            display: flex;
            &>span {
              display: block;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>