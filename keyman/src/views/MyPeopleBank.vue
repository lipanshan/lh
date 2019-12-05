<template>
  <div class="my-people-bank">
    <el-form class="my-people-form">
      <div class="search-wrap">
        <el-input v-model="search" placeholder="搜索职位">
          <el-select v-model="address" class="prepend-select" slot="prepend">
            <el-option label="北京" value="1"></el-option>
            <el-option label="天津" value="2"></el-option>
          </el-select>
          <span slot="append" class="search-btn">搜索</span>
        </el-input>
      </div>
      <div class="row1">
        <div class="col">
          <h2>学历</h2>
          <div>
            <el-select v-model="education">
              <el-option label="大专" value="1"></el-option>
            </el-select>
            <span class="li"></span>
            <el-select v-model="education">
              <el-option label="大专" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col">
          <h2>薪资</h2>
          <div>
            <el-select v-model="education">
              <el-option label="5K" value="1"></el-option>
            </el-select>
            <span class="li"></span>
            <el-select v-model="education">
              <el-option label="8K" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col">
          <h2>工龄</h2>
          <div>
            <el-select v-model="education">
              <el-option label="20" value="1"></el-option>
            </el-select>
            <span class="li"></span>
            <el-select v-model="education">
              <el-option label="35" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col">
          <h2>年龄</h2>
          <div>
            <el-select v-model="education">
              <el-option label="20" value="1"></el-option>
            </el-select>
            <span class="li"></span>
            <el-select v-model="education">
              <el-option label="35" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col">
          <el-checkbox-group v-model="jobeType">
            <el-checkbox label="搜全职"></el-checkbox>
            <el-checkbox label="搜兼职"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="col">
          <span class="show-more">隐藏</span>
        </div>
      </div>
      <div class="row2">
        <div class="col">
          <el-form-item label="公司">
            <el-input v-model="company"></el-input>
          </el-form-item>
          <el-checkbox v-model="currentJob">最近工作</el-checkbox>
        </div>
        <div class="col">
          <el-form-item label="行业">
            <el-select multiple v-model="industry" placeholder="最多选三项">
              <el-option label="北京" value="1"></el-option>
              <el-option label="北京2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row2">
        <div class="col">
          <el-form-item label="工作内容">
            <el-input v-model="company"></el-input>
          </el-form-item>
          <el-checkbox v-model="currentJob">最近工作</el-checkbox>
        </div>
        <div class="col">
          <el-form-item label="职业">
            <el-select multiple v-model="industry" placeholder="最多选三项">
              <el-option label="北京" value="1"></el-option>
              <el-option label="北京2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row2">
        <div class="col">
          <el-form-item label="排除学校">
            <el-select multiple v-model="industry" placeholder="最多选三项">
              <el-option label="北京" value="1"></el-option>
              <el-option label="北京2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col">
          <el-form-item label="排除履历">
            <el-select multiple v-model="industry" placeholder="最多选三项">
              <el-option label="北京" value="1"></el-option>
              <el-option label="北京2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row1 row3">
        <div class="col">
          <h2>
            学院要求
            <span class="subtitle">(多选)</span>
          </h2>
          <el-checkbox-group v-model="college">
            <el-checkbox label="不限"></el-checkbox>
            <el-checkbox label="统招本科"></el-checkbox>
            <el-checkbox label="双一流院校"></el-checkbox>
            <el-checkbox label="211院校"></el-checkbox>
            <el-checkbox label="留学生"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="col">
          <h2>
            求职状态
            <span class="subtitle">(多选)</span>
          </h2>
          <el-checkbox-group v-model="college">
            <el-checkbox label="不限"></el-checkbox>
            <el-checkbox label="离职-随时到岗"></el-checkbox>
            <el-checkbox label="在职-暂不考虑"></el-checkbox>
            <el-checkbox label="在职-考虑机会"></el-checkbox>
            <el-checkbox label="在职-月内到岗"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="row4">
        <h2>精确搜索</h2>
        <div class="wrap">
          <div class="col">
            <el-form-item label="姓名">
              <el-input v-model="name"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="学校">
              <el-input v-model="school"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="手机号">
              <el-input v-model="phone"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="邮箱">
              <el-input v-model="email"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="wrap">
          <div class="col disabled-input-item">
            <el-form-item label="技能标签">
              <span class="disabled-input">此功能升级中...</span>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="简历来源">
              <el-select v-model="resumeSource">
                <el-option label="xxx" value="1"></el-option>
                <el-option label="xx2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="action">
        <div class="col">
          <el-input v-model="userName" placeholder="输入名称"></el-input>
        </div>
        <div class="col">
          <span class="save-btn">保存搜索器</span>
          <span class="save-progress">已建立2/3</span>
        </div>
      </div>
      <div class="bottom">
        <div class="col">
          <el-tag closable>UI设计师</el-tag>
          <el-tag closable>JAVA</el-tag>
        </div>
        <div class="checkbox-group">
          <el-checkbox-group v-model="mangResume">
            <el-checkbox label="隐藏已查看简历"></el-checkbox>
            <el-checkbox label="隐藏放入职位简历"></el-checkbox>
          </el-checkbox-group>
        </div>
        <span class="reset-btn">重置</span>
      </div>
    </el-form>
    <div class="recruit-wrap">
      <div class="all-checked">
        <el-checkbox v-model="allCheckbox" label="全选"></el-checkbox>
      </div>
      <div class="recruit-list">
        <div class="recruit-item">
          <div class="row">
            <div class="left">
              <span class="type">全职</span>
              <span class="name">姓名</span>
              <span class="gender">性别</span>
              <span class="post">
                当前职位：
                <span class="txt">人力资源总监</span>
              </span>
              <span class="wages">
                期望月薪：
                <span class="txt">200k-1000k</span>
              </span>
            </div>
            <span class="get-time">获取时间：2019.05.01</span>
          </div>
          <div class="content">
            <el-checkbox v-model="checkboxItem1"></el-checkbox>
            <div class="avatar">
              <img src alt />
            </div>
            <div class="info">
              <p class="txt">年龄|所在学校|学历|职业分类</p>
              <p class="txt">1990.03-1990.05 四川大学 金融学 本科</p>
            </div>
            <div class="info2">
              <p class="txt">1990.03-至今（1年6个月） 招商银行四川分行科技银行中心 大客户销售总监 200k-500k</p>
              <p class="txt">1990.03-至今（1年6个月） 招商银行四川分行科技银行中心 大客户销售总监 200k-500k</p>
              <p class="txt">1990.03-至今（1年6个月） 招商银行四川分行科技银行中心 大客户销售总监 200k-500k</p>
            </div>
            <div class="keys">
              <p class="title">匹配因素：</p>
              <div class="txt-wrap">
                <span class="txt">科技</span>
                <span class="txt">北京</span>
                <span class="txt">大客户</span>
              </div>
            </div>
          </div>
          <div class="bottom-btns">
            <span class="btn1">已关联项目</span>
            <span class="btn1">收藏人才</span>
            <span class="btn1">放入职位</span>
            <span class="btn1">联系Ta</span>
          </div>
        </div>
      </div>
      <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPeopleBank',
  data() {
    return {
      address: '',
      search: '',
      education: '',
      jobeType: [],
      company: '',
      currentJob: false,
      industry: [],
      college: [],
      name: '',
      school: '',
      phone: '',
      email: '',
      resumeSource: [],
      userName: '',
      mangResume: [],
      allCheckbox: false,
      checkboxItem1: false
    }
  }
}
</script>

<style lang="scss">
body {
  background: #eff1f5ff;
}
.my-people-bank {
  width: 1240px;
  margin: 0 auto;
  .my-people-form {
    padding-top: 28px;
    padding-left: 44px;
    padding-right: 44px;
    background: #fff;
  }

  .search-wrap {
    .prepend-select {
      width: 124px;
      background: none;
    }
    .el-input-group__append,
    .el-input-group__prepend {
      background: none;
      color: #61687cff;
      border-radius: 0;
      border-color: #f06358ff;
    }
    .el-input-group__prepend {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -1px;
        margin-top: -18px;
        display: block;
        width: 2px;
        height: 36px;
        background: url(../assets/img/splice_line@2x.png) no-repeat 0 0;
        background-size: 2px 36px;
      }
    }
    .search-btn,
    .el-input-group__append {
      width: 120px;
      height: 60px;
      background-color: #f06358ff;
      font-size: 20px;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
    .el-input__inner {
      height: 62px;
      line-height: 62px;
      border-left: none;
      border-right: none;
      border-color: #f06358ff;
    }
  }
  .row1 {
    padding-top: 24px;
    display: flex;
    align-items: center;
    .col {
      margin-right: 48px;
      & > h2 {
        font-size: 18px;
        line-height: 34px;
        color: #61687cff;
        text-align: left;
      }
      & > div {
        display: flex;
        & > .li {
          margin: 19px 4px;
          display: block;
          width: 18px;
          height: 2px;
          background-color: #aaaaaaff;
        }
      }
      &:nth-child(1) {
        width: 328px;
      }
      &:nth-child(2) {
        width: 200px;
      }
      &:nth-child(3) {
        width: 140px;
      }
      &:nth-child(4) {
        width: 140px;
      }
      &:nth-child(5) {
        margin-top: 30px;
      }
      &:nth-child(6) {
        margin-top: 30px;
      }
      .show-more {
        font-size: 12px;
        line-height: 36px;
        white-space: nowrap;
        color: #4799ccff;
        cursor: pointer;
      }
    }
  }
  .row2 {
    margin-top: 8px;
    display: flex;
    & > .col {
      margin-right: 50px;
      display: flex;
      align-items: center;
      .el-form-item {
        display: flex;
        margin-bottom: 0;
      }
      .el-form-item__label {
        width: 68px;
        text-align: left;
        font-size: 14px;
        line-height: 36px;
        color: #61687cff;
      }
      .el-form-item__content {
        width: 372px;
        text-align: left;
      }
      .el-checkbox {
        margin-left: 12px;
      }
      .el-checkbox {
        color: #b2afbcff;
      }
    }
  }
  .row3 {
    .col {
      flex: 1;
      .el-checkbox__label {
        padding: 9px;
      }
      .el-checkbox.is-checked {
        .el-checkbox__label {
          background-color: #fdf0efff;
        }
      }
    }
    .subtitle {
      margin-left: 14px;
      font-size: 14px;
      line-height: 34px;
      color: #b2afbcff;
    }
    .el-checkbox__input {
      display: none;
    }
  }
  .row4 {
    & > h2 {
      padding-top: 24px;
      font-size: 18px;
      line-height: 42px;
      color: #61687cff;
      text-align: left;
    }
    & > .wrap {
      display: flex;
      & > .col {
        flex: 1;
        .el-form-item {
          display: flex;
        }
        .el-input__inner {
          width: 180px;
        }
      }
    }
    .disabled-input-item {
      .el-form-item__label {
        color: #9fa3afff;
      }
      .disabled-input {
        display: block;
        width: 448px;
        height: 36px;
        background-color: #cdcdcdff;
        font-size: 14px;
        line-height: 36px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .action {
    display: flex;
    padding-bottom: 36px;
    & > .col {
      margin-right: 88px;
      display: flex;
      .el-input__inner {
        width: 246px;
      }
      .save-btn {
        margin-right: 14px;
        display: block;
        width: 106px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        background-color: #4799ccff;
        color: #fff;
        text-align: center;
      }
      .save-progress {
        display: block;
        font-size: 16px;
        line-height: 36px;
        color: #9fa3afff;
      }
    }
  }
  .bottom {
    display: flex;
    padding-top: 36px;
    padding-bottom: 28px;
    border-top: 1px solid #eef0f5ff;
    align-items: center;
    & > .col {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
    & > .reset-btn {
      margin-left: 42px;
      display: block;
      font-size: 12px;
      line-height: 36px;
      color: #9fa3afff;
      cursor: pointer;
    }
  }

  .recruit-wrap {
    margin-top: 24px;
    .all-checked {
      padding-left: 46px;
      background-color: #fff;
      height: 36px;
      text-align: left;
      line-height: 36px;
    }
    .recruit-list {
      .recruit-item {
        margin-top: 8px;
        background-color: #fff;
        padding-left: 46px;
        padding-right: 46px;
        & > .row {
          margin: 0;
          display: flex;
          justify-content: space-between;
          & > .left {
            display: flex;
            flex: 1;
            & > .type {
              margin-right: 24px;
              padding-top: 16px;
              font-size: 16px;
              line-height: 40px;
              color: #61687cff;
            }
            & > .name {
              margin-right: 24px;
              padding-top: 12px;
              font-size: 18px;
              font-weight: bold;
              line-height: 44px;
            }
            & > .gender {
              @extend .name;
            }
            & > .post {
              margin-right: 24px;
              padding-top: 16px;
              font-size: 16px;
              line-height: 40px;
              color: #9fa3afff;
              & > .txt {
                color: #f06358ff;
              }
            }
            & > .wages {
              @extend .post;
            }
          }
          & > .get-time {
            padding-top: 16px;
            font-size: 16px;
            line-height: 40px;
            color: #61687cff;
          }
        }
        & > .content {
          display: flex;
          padding-top: 12px;
          padding-bottom: 24px;
          border-top: 1px solid #eef0f5ff;
          border-bottom: 1px solid #eef0f5ff;
          align-items: center;
          justify-content: space-between;
          & > .avatar {
            margin-left: 12px;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background-color: #ccccccff;
            & > img {
              display: block;
              width: 68px;
              height: 68px;
              border-radius: 50%;
            }
          }
          & > .info {
            margin-left: 24px;
            font-size: 14px;
            line-height: 38px;
            color: #9fa3afff;
          }
          & > .info2 {
            @extend .info;
          }
          & > .keys {
            & > .title {
              font-size: 12px;
              line-height: 36px;
              color: #9fa3afff;
              width: 140px;
              text-align: left;
            }
            & > .txt-wrap {
              font-size: 0;
              width: 140px;
              text-align: left;
              & > .txt {
                margin-right: 10px;
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
                line-height: 36px;
                color: #f06358ff;
                white-space: pre-wrap;
                word-break: break-all;
              }
            }
          }
        }
        & > .bottom-btns {
          padding-top: 12px;
          padding-bottom: 12px;
          display: flex;
          justify-content: flex-end;
          & > .btn1 {
            margin-left: 20px;
            padding-left: 14px;
            padding-right: 14px;
            font-size: 14px;
            line-height: 36px;
            color: #f06358ff;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #f06358ff;
            }
          }
        }
      }
    }
    .el-pagination {
      margin-top: 8px;
      margin-bottom: 48px;
      padding-top: 24px;
      padding-bottom: 24px;
      width: 100%;
      background: #fff;
      .el-pager li {
        width: 38px;
        height: 32px;
        line-height: 32px;
        color: #414a60ff;
        &.active {
          background: #f06358ff;
          color: #fff;
        }
      }
      .btn-next {
        margin-left: 20px;
        width: 39px;
        height: 34px;
        background: url(../assets/img/page-right@2x.png) no-repeat 0 0;
        background-size: 39px 34px;
        & > i {
          display: none;
        }
      }
      .btn-prev {
        margin-right: 20px;
        width: 39px;
        height: 34px;
        background: url(../assets/img/page-left@2x.png) no-repeat 0 0;
        background-size: 39px 34px;
        & > i {
          display: none;
        }
      }
    }
  }
  .el-tag {
    margin-right: 12px;
    border-radius: 0;
    background: none;
    border-color: #ccccccff;
    color: #ccccccff;
    cursor: pointer;
  }
  .el-tag .el-tag__close,
  .el-tag .el-tag__close:hover {
    color: #ccccccff;
    background: none;
    cursor: pointer;
  }
  .el-tag:hover {
    color: #f06358ff;
    background-color: #fdf0efff;
    border-color: #fdf0efff;
    & > .el-tag__close {
      color: #f06358ff;
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f06358ff;
    border-color: #f06358ff;
  }
  .el-checkbox__inner:hover {
    border-color: #f06358ff;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f06358ff;
    border-color: #f06358ff;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #f06358ff;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #f06358ff;
  }
  .el-input__icon {
    line-height: 36px;
  }
  .el-input__inner {
    height: 36px;
    line-height: 36px;
    border-radius: 0;
  }
  .el-tag.el-tag--info {
    color: #4799ccff;
    border-color: #4799ccff;
    border-radius: 0;
    border-style: dotted;
    background: none;
  }
  .el-select .el-tag__close.el-icon-close {
    color: #4799ccff;
    background: none;
  }
}
</style>