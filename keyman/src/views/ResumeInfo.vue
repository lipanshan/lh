<template>
  <div class="resume-in">
    <div class="section">
      <div class="left">
        <p class="status">{{cerStatus | filterCerStatus}}</p>
        <h1 class="name">{{resumeInfo.name}}</h1>
        <ul class="list">
          <li class="item">{{resumeInfo.op_years}}</li>
          <li class="item">{{resumeInfo.edu | filtersEdu}}</li>
          <li class="item">{{resumeInfo.qiuzzt | filtersqzStatus}}</li>
        </ul>
        <ul class="list">
          <li class="item-num">{{resumeInfo.mobil}}</li>
          <li class="item-num">{{resumeInfo.wx_user}}</li>
          <li class="item-num">{{resumeInfo.wx_user}}</li>
          <li class="item-num">{{resumeInfo.email}}</li>
        </ul>
      </div>
      <div class="avatar">
        <img :src="resumeInfo.headimgurl" alt />
      </div>
    </div>
    <div class="section2">
      <ul class="navs">
        <li class="nav-item" @click="onSwitchTag(1)" :class="{'active': tag === 1}">
          <span>简历</span>
        </li>
        <li class="nav-item" @click="onSwitchTag(2)" :class="{'active': tag === 2}">
          <span>附件简历</span>
        </li>
        <li class="nav-item" @click="onSwitchTag(3)" :class="{'active': tag === 3}">
          <span>关联项目</span>
        </li>
      </ul>
      <div class="content">
        <div class="content-wrap" v-show="tag === 1">
          <div class="box">
            <p class="title">求职意向</p>
            <ul class="box-info">
              <li class="info">期望工作地点： {{resumeInfo.city}}</li>
              <li class="info">期望月薪： {{resumeInfo.qiwxz}}</li>
              <li class="info">目前状况：{{resumeInfo.qiuzzt | filtersqzStatus}}</li>
              <li class="info">期望从事职业： {{resumeInfo.class_name}}</li>
              <li class="info">期望从事行业： {{resumeInfo.iname}}</li>
            </ul>
          </div>
          <div class="box">
            <p class="title">自我介绍</p>
            <ul class="box-info">
              <li class="info">{{resumeInfo.gerjs}}</li>
            </ul>
          </div>
          <div class="box">
            <p class="title">工作经历</p>
            <p class="subtitle">
              <span
                class="strong"
              >{{resumeInfo.starttime}}-{{resumeInfo.endtime}} {{resumeInfo.company}}</span>
              <span>{{resumeInfo.work_industry_name}}</span>
              <span>{{resumeInfo.post}}</span>
            </p>
            <ul class="box-info">
              <div>
                <li class="info">所在部门：{{resumeInfo.section}}</li>
                <li class="info">职级：{{resumeInfo.rank}}</li>
              </div>
              <div>
                <li class="info">直接领导姓名：{{resumeInfo.ld_name}}</li>
                <li class="info">汇报上级：{{resumeInfo.hbsj}}</li>
              </div>
              <div>
                <li class="info">上级部门：{{resumeInfo.sjbm}}</li>
                <li class="info">下属人数：{{resumeInfo.xsrs}}</li>
              </div>
              <div>
                <li class="info">上级领导姓名：{{resumeInfo.sjld_name}}</li>
                <li class="info">在职时间：{{resumeInfo.starttime}}-{{resumeInfo.endtime}}</li>
              </div>
              <div>
                <li class="info">职位：{{resumeInfo.post}}</li>
                <li class="info">薪资：{{resumeInfo.qiwxz}}</li>
              </div>
            </ul>
            <p class="subtitle">
              <span class="strong">工作业绩</span>
            </p>
            <ul class="box-info">{{resumeInfo.work_yj}}</ul>
            <p class="subtitle">
              <span class="strong">工作描述</span>
            </p>
            <ul class="box-info">{{resumeInfo.content}}</ul>
          </div>
          <div class="box">
            <p class="title">教育经历</p>
            <ul class="box-info">
              <li class="info">
                <span>{{resumeInfo.rsstar_time}}-{{resumeInfo.rsend_time}}</span>
                <span>{{resumeInfo.school}}</span>
                <span>{{resumeInfo.major}}</span>
                <span>{{resumeInfo.edu_type | filtersEdu}}</span>
                <!-- <span>统招</span> -->
              </li>
            </ul>
          </div>
          <div class="box">
            <p class="title">外语能力</p>
            <ul class="box-info">
              <li class="info">
                <span>{{resumeInfo.languages}}</span>
              </li>
            </ul>
          </div>
          <div class="box">
            <p class="title">资格证书</p>
            <ul class="box-info">
              <li class="info">
                <span>{{resumeInfo.zs_star_time}}-{{resumeInfo.zs_end_time}}</span>
                <span>证书名称：</span>
                <span>证书等级：{{resumeInfo.zs_grade}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-wrap" v-show="tag === 2">附件简历</div>
        <div class="content-wrap" v-show="tag === 3">
          <ul class="projects-list">
            <li class="item">
              <div class="left">
                <div class="cinfo">
                  <div class="avatar-wrap">
                    <img src alt />
                  </div>
                  <div class="box">
                    <h2>
                      职位名称
                      <span>月薪5-6K13薪</span>
                    </h2>
                    <p class="title">城市|工龄|学历</p>
                    <p class="subtitle">公司名称|规模|融资、资质</p>
                  </div>
                </div>
              </div>
              <div class="right">
                <span class="hh-name">猎头名称</span>
                <span class="hh-level">猎头等级</span>
              </div>
            </li>
          </ul>
          <el-pagination layout="prev, pager, next" :total="pageOptions.allCount"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserResume, getCertStatus } from '@/api/api'
const PAGE_NUMBER = 10 // 每页显示条数
export default {
  name: 'ResumeIn',
  props: {
    resume_uid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tag: 1,
      resumeInfo: {
        name: null,
        op_years: null,
        edu: '',
        qiuzzt: 1,
        mobil: '',
        wx_user: null,
        email: '',
        city: null,
        qiwxz: '',
        class_name: null,
        gerjs: null,
        starttime: 0,
        endtime: 0,
        company: '',
        post: '',
        work_industry_name: '',
        section: '',
        ld_name: null,
        sjbm: null,
        sjld_name: null,
        rank: null,
        hbsj: null,
        xsrs: null,
        skills: null,
        work_yj: null,
        content: null,
        rsstar_time: null,
        rsend_time: null,
        school: null,
        major: null,
        edu_type: null,
        languages: null,
        zs_name: null,
        zs_grade: null,
        zs_star_time: null,
        zs_end_time: null,
        headimgurl: ''
      },
      cerStatus: 0,
      pageOptions: {
        currentPage: 1,
        number: PAGE_NUMBER,
        allCount: 0
      }
    }
  },
  created() {
    this.initResumeInfo()
    this.initCerStatus()
  },
  computed: {
    ...mapGetters(['getToken', 'getMemberId'])
  },
  methods: {
    initCerStatus() {
      getCertStatus({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          this.cerStatus = res.data.status
        }
      })
    },
    initResumeInfo() {
      getUserResume({
        member_id: this.getMemberId,
        token: this.getToken,
        resume_uid: this.$route.query.resumeId
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.resumeInfo = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onSwitchTag(index) {
      this.tag = index
    }
  },
  filters: {
    filterCerStatus(num) {
      const map = {
        0: '未认证',
        1: '已认证',
        2: '认证未通过'
      }
      return map[num]
    },
    filtersEdu(num) {
      const map = {
        1: '初中',
        2: '中专、技校',
        3: '高中',
        4: '大专',
        5: '本科',
        6: '研究生',
        7: '博士'
      }
      return map[num]
    },
    filtersqzStatus(num) {
      const map = {
        1: '不在职',
        2: '正在找工作、在职',
        3: '打算近期换工作'
      }
      return map[num]
    }
  }
}
</script>

<style lang="scss">
.resume-in {
  width: 960px;
  margin: 24px auto 48px;
  .section {
    padding-bottom: 48px;
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
    background: #fff;
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
          & > div {
            display: flex;
            & > .info {
              display: flex;
              flex: 1;
              & > span {
                display: block;
                margin-right: 20px;
              }
            }
          }
        }
      }
      // 关联项目
      .projects-list {
        padding-left: 66px;
        padding-right: 66px;
        .item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e4e4e4;
          .left {
            display: flex;
            .cinfo {
              display: flex;
              .avatar-wrap {
                margin-top: 36px;
                margin-bottom: 36px;
                width: 80px;
                height: 80px;
                background-color: #e3e7ed;
                & > img {
                  display: block;
                  width: 80px;
                  height: 80px;
                }
              }
              .box {
                padding-left: 18px;
                padding-top: 20px;
                & > h2 {
                  font-size: 20px;
                  line-height: 40px;
                  color: #333333;
                  & > span {
                    padding-left: 14px;
                    color: #fd877d;
                  }
                }
                .title {
                  font-size: 14px;
                  line-height: 28px;
                  color: #afb4b6;
                }
                .subtitle {
                  font-size: 16px;
                  line-height: 36px;
                  color: #424a5e;
                }
              }
            }
          }
          .right {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            padding-bottom: 32px;
            .hh-name {
              position: relative;
              font-size: 14px;
              line-height: 16px;
              padding-left: 22px;
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 18px;
                height: 18px;
                background: #b5b5b5;
                border-radius: 18px;
              }
            }
            .hh-level {
              @extend .hh-name;
              margin-left: 18px;
              &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 22px;
                height: 22px;
                background: url(../assets/img/dengji@2x.png) no-repeat 0 -2px;
                background-size: 22px 22px;
              }
            }
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
    text-align: center;
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
</style>