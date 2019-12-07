<template>
  <div class="job-chart">
    <div class="top-btns">
      <div class="all">全部人选</div>
      <nav class="nav-list">
        <div class="nav-item">新招呼</div>
        <div class="nav-item">新投递</div>
        <div class="nav-item">沟通中</div>
        <div class="nav-item">候选</div>
        <div class="nav-item">推荐</div>
      </nav>
      <div class="label-btns">
        <span class="upload-resume">上传简历</span>
        <span class="upload-people">我上传的候选人</span>
        <span class="set-top">标记置顶</span>
        <span class="inconformity">不符合</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobChart',
  created() {
    console.log(this.$attrs.jobchart)
  }
}
</script>

<style lang="scss">
body {
  background: #eef0f5;
}
.job-chart {
  .top-btns {
    padding-top: 30px;
    display: flex;
    width: 1240px;
    margin: 0 auto;
    justify-content: space-between;
    & > .all {
      padding-left: 14px;
      padding-right: 14px;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      background: #fff;
      color: #ff7272;
      border-radius: 4px;
      cursor: pointer;
    }
    & > .nav-list {
      display: flex;
      margin-right: 66px;
      font-size: 18px;
      line-height: 40px;
      background: #fff;
      color: #b2afbc;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      & > .nav-item {
        position: relative;
        display: block;
        padding-left: 28px;
        padding-right: 28px;
        cursor: pointer;
        &::after {
          content: '';
          position: absolute;
          top: -20px;
          left: -10px;
          width: 24px;
          height: 40px;
          border-bottom: 4px solid #eef0f5;
          -webkit-transform: skewY(30deg);
          transform: skewY(60deg);
        }
        &:nth-child(1) {
          &::after {
            content: '';
            display: none;
          }
        }
      }
    }
    & > .label-btns {
      display: flex;
      justify-content: space-between;
      & > .upload-resume {
        font-size: 14px;
        line-height: 40px;
        color: #677dda;
        cursor: pointer;
      }
      & > .upload-people {
        margin-left: 20px;
        position: relative;
        padding-left: 16px;
        font-size: 14px;
        line-height: 40px;
        color: #333333;
        cursor: pointer;
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          width: 12px;
          height: 10px;
          margin-top: -5px;
          background: url(../assets/img/upload_people@2x.png) no-repeat 0 0;
          background-size: 12px 10px;
        }
      }
      & > .set-top {
        position: relative;
        padding-left: 16px;
        font-size: 14px;
        line-height: 40px;
        color: #b2afbc;
        cursor: pointer;
        margin-left: 20px;
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 12px;
          height: 10px;
          margin-top: -5px;
          background: url(../assets/img/set_top@2x.png) no-repeat 0 0;
          background-size: 12px 10px;
        }
      }
      & > .inconformity {
        @extend .set-top;
        &::before {
          content: '';
          background: url(../assets/img/inconformity@2x.png) no-repeat 0 0;
          background-size: 12px 10px;
        }
      }
    }
  }
}
</style>