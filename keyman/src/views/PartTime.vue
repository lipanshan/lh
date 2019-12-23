<template>
  <div class="main">
    <div class="main-box">
      <p>
        <span>首页</span>>
        <span>北京招聘网</span>>
        <span>北京兼职招聘</span>
      </p>
      <img src="../assets/img/banner-part.png" alt />
      <div class="work-options">
        <div>
          <div>职位：</div>
          <div>
            <ul>
              <li>热门</li>
              <li
                class="item"
                v-for="(x, index) in hotWork"
                :key="index"
                :class="{'active': x.c_id === search.job_category}"
                @click="onSelectPost(x)"
              >{{x.class_name}}</li>
            </ul>
          </div>
        </div>
        <div>
          <div>地区：</div>
          <div>
            <ul>
              <li>不限</li>
              <li
                class="item"
                v-for="(x, index) in area"
                :class="{'active': x.cid === search.province}"
                :key="index"
                @click="onSelectAreaP(x)"
              >
                <el-dropdown @command="onSelectArea" trigger="click">
                  <span class="el-dropdown-link">{{x.name}}</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="li in x.data_list"
                      :key="li.cid"
                      :command="li.cid"
                    >{{li.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="check-type">
        <div class="left">
          <el-dropdown @command="onBalanceType">
            <span class="el-dropdown-link">
              结算方式
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="年">年</el-dropdown-item>
              <el-dropdown-item command="半年">半年</el-dropdown-item>
              <el-dropdown-item command="季度">季度</el-dropdown-item>
              <el-dropdown-item command="周">周</el-dropdown-item>
              <el-dropdown-item command="天">天</el-dropdown-item>
              <el-dropdown-item command="月">月</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="left">
          <el-dropdown @command="onGender">
            <span class="el-dropdown-link">
              性别要求
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="0">女</el-dropdown-item>
              <el-dropdown-item :command="1">男</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="left">
          <el-dropdown @command="onIsSelf">
            <span class="el-dropdown-link">
              官方自营
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1">是</el-dropdown-item>
              <el-dropdown-item :command="2">不是</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div class="right">工资最高</div> -->
        <div class="right">最新发布</div>
        <div class="right">
          <el-dropdown @command="onSort">
            <span class="el-dropdown-link">
              推荐排序
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1">默认</el-dropdown-item>
              <el-dropdown-item :command="2">时间排序</el-dropdown-item>
              <el-dropdown-item :command="3">工资排序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <ul class="work-list" v-show="workList.length">
        <li v-for="item in workList" :key="item.id">
          <div>
            <p>{{item.job_title}}</p>
            <p>
              <span>工作时间：{{item.job_time}}</span>
              <span>工作类型：{{item.description}}</span>
            </p>
            <p>
              <span>工作地点：{{item.province}} {{item.city}} {{item.district}}</span>
              <span>招聘人数：{{item.recruiting_num}}人</span>
            </p>
          </div>
          <div>
            <p>{{item.company_name}}</p>
            <p>
              <span>互联网</span> |
              <span>{{item.comkind | filterComkind}}</span> |
              <span>{{item.employee_num | filterCompanySize}}</span>
            </p>
          </div>
          <div>
            <p>
              <span>{{item.salary_above}}k-{{item.salary_below}}k</span>
              <span>元/月</span>
              <span>{{item.balance_type}}结</span>
            </p>
            <div>报名参加</div>
          </div>
        </li>
      </ul>
      <div v-if="!workList.length" class="post-list-nothing">
        <img src="../assets/img/nothing_icon@2x.png" alt />
        <p>暂无职位信息</p>
      </div>
      <el-pagination
        v-show="workList.length"
        layout="prev, pager, next"
        :page-size="20"
        @current-change="onPageChange"
        :total="pageData.allCount"
      ></el-pagination>
      <el-dialog :visible.sync="showDetail" :model-append-to-body="false" width="1240px">
        <PostDetail :show="true" :isLogined="false" :detail="curPost"></PostDetail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PostDetail from '@/components/PostDetailInfo'
import $ from 'jquery'
import { searchTimeAllJob, getAllAddress } from '@/api/api'
const url = 'http://www.wzgwebsite.top/'
export default {
  name: 'PartTime',
  data() {
    return {
      data: null,
      area: null,
      hotWork: null,
      search: {
        province: 110100,
        city: 110100,
        district: 0,
        balance_type: '年',
        gender: 2,
        is_self: 1,
        job_category: 1,
        page: 1
      },
      workList: [
        // {
        //   id: 1,
        //   job_title: 'PHP开发',
        //   salary_above: 5,
        //   salary_below: 20,
        //   balance_type: '月',
        //   job_time: '短期可做',
        //   province: '北京市',
        //   city: '北京市',
        //   district: '朝阳区',
        //   education: 3,
        //   work_year: 1,
        //   description: '',
        //   recruiting_num: 0,
        //   sortid: 1,
        //   month_money: 12,
        //   company_name: '北京智慧小喇叭',
        //   employee_num: '4',
        //   comkind: '4'
        // }
      ],
      pageData: {
        page: 1,
        allCount: 0
      },
      curPost: {},
      showDetail: false
    }
  },
  created() {
    this.initAreaList()
    this.getData()
  },
  mounted: function() {
    var that = this
    $.ajax({
      url: url + 'api/apidate/hot_job',
      dataType: 'json',
      type: 'post',
      data: {
        num: 10,
        status: 1
      },
      success: function(res) {
        // console.log(res)
        if (res.code == 200) {
          that.hotWork = res.data
        }
      }
    })
  },
  methods: {
    getData(pageNum = 1) {
      this.search.page = pageNum
      searchTimeAllJob(this.search).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.workList = res.data
        } else if (res.code === 40001 && this.search.page === 1) {
          this.workList = []
        }
      })
    },
    initAreaList() {
      getAllAddress().then(res => {
        if (res.code === 200) {
          this.area = res.data
        }
      })
    },
    onPageChange(pageNum) {
      this.getData(pageNum)
    },
    onBalanceType(val) {
      this.search.balance_type = val
    },
    onGender(val) {
      this.search.gender = val
      this.getData()
    },
    onIsSelf(val) {
      this.search.is_self = val
      this.getData()
    },
    onSort(val) {
      this.search.sort = val
      this.getData()
    },
    onSelectPost(data) {
      this.search.job_category = data.c_id
      this.getData()
    },
    onSelectAreaP(data) {
      console.log(data)
      this.search.province = data.cid
      this.getData()
    },
    onSelectArea(val) {
      this.search.city = val
      this.getData()
    },
    onSeePostDetail(data) {
      const nData = {
        url: data.headimgurl,
        menber_id: data.member_id,
        job_name: data.job_title,
        salary_above: data.salary_above,
        salary_below: data.salary_below,
        nickname: data.nickname,
        rank: null,
        type: null,
        city: `${data.province} ${data.city} ${data.district}`,
        work_year: data.work_year,
        education: data.education,
        company_name: data.company_name,
        employee_num: data.employee_num,
        comkind: data.comkind,
        logo: '',
        website: '',
        profile: '',
        id: 1,
        headimgurl: data.headimgurl,
        age: 0,
        data_list: [
          {
            company_name: data.company_name,
            employee_num: data.employee_num,
            comkind: data.comkind,
            salary_above: data.salary_above,
            salary_below: data.salary_below,
            logo: ''
          }
        ]
      }
      console.log(data)
      this.showDetail = true
      this.curPost = nData
    }
  },
  filters: {
    education: function(e) {
      switch (e) {
        case 0:
          return '不限'
        case 1:
          return '初中'
        case 2:
          return '中专、技校'
        case 3:
          return '高中'
        case 4:
          return '大专'
        case 5:
          return '本科'
        case 6:
          return '研究生'
        case 7:
          return '博士'
      }
    },
    year: function(e) {
      switch (e) {
        case 0:
          return '不限'
        case 1:
          return '在校生'
        case 2:
          return '应届生'
        case 3:
          return '一年以下'
        case 4:
          return '1-3年'
        case 5:
          return '3-5年'
        case 6:
          return '5-10年'
        case 7:
          return '10年以上'
      }
    },
    filterEdu(num) {
      const map = {
        0: '不限',
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
    filterCompanySize(num) {
      const map = {
        1: '0-20人',
        2: '20-99人',
        3: '100-499人',
        4: '500-999人',
        5: '1000-9999人',
        6: '10000以上'
      }
      return map[num]
    },
    filterComkind(num) {
      const map = {
        1: '未融资',
        2: '天使轮',
        3: 'A轮',
        4: 'B轮',
        5: 'C轮',
        6: 'D轮以上',
        7: '上市公司',
        8: '不需要融资'
      }
      return map[num]
    }
  }
}
</script>

<style lang="scss">
.main .main-box {
  width: 1250px;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
}

.main .main-box > p:first-child {
  font-size: 15px;
  line-height: 20px;
  color: #4b4b4b;
  margin: 30px 0 10px;
}
.main {
  margin: 0 auto;
  width: 100%;
  min-width: 1280px;
  text-align: left;
  background-color: #f3f5f6;
  .work-options {
    width: 100%;
    background: #fff;
    margin: 13px 0;
    padding: 28px 25px;
  }

  .work-options > div {
    display: flex;
    padding-bottom: 30px;
    width: 100%;
  }

  .work-options > div > div:first-child {
    font-size: 16px;
    line-height: 42px;
    color: #4b4b4b;
    font-weight: 700;
    width: 50px;
  }

  .work-options > div > div:nth-child(2) {
    flex: 1;
  }
  .work-options > div > div:nth-child(2) ul {
    font-size: 0;
  }
  .work-options > div > div:nth-child(2) ul li {
    display: inline-block;
    vertical-align: top;
    padding: 0 15px;
    font-size: 16px;
    line-height: 42px;
    font-weight: 700;
    margin-bottom: 14px;
    white-space: pre-wrap;
    word-break: break-all;
    cursor: pointer;
    &.item {
      &:hover {
        color: #f06358;
      }
      &.active {
        color: #f06358;
        .el-dropdown-link {
          color: #f06358;
        }
      }
    }
  }

  .check-type {
    height: 67px;
    width: 100%;
    background: #fff;
    margin-top: 13px;
    margin-bottom: 13px;
    padding: 26px 36px;
  }

  .left {
    float: left;
    margin-right: 59px;
    font-size: 15px;
    color: #4b4b4b;
    font-weight: 700;
  }

  .right {
    float: right;
    margin-left: 19px;
    font-size: 15px;
    font-weight: 700;
  }

  .work-list {
    width: 100%;
    height: auto;
    margin-bottom: 46px;
  }

  .work-list li {
    width: 100%;
    background: #fff;
    margin-bottom: 14px;
    display: flex;
  }

  .work-list li > div:first-child {
    width: 600px;
    height: 100%;
    padding: 34px 26px;
  }

  .work-list li > div:first-child > p:first-child {
    font-size: 20px;
    margin-bottom: 26px;
    line-height: 20px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .work-list li > div:first-child > p:nth-child(2) > span,
  .work-list li > div:first-child > p:nth-child(3) > span {
    font-size: 15px;
    color: #707070;
    float: left;
    width: 260px;
    line-height: 15px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .work-list li > div:nth-child(2) {
    width: 390px;
    height: 100%;
  }

  .work-list li > div:nth-child(2) p:first-child {
    margin-top: 50px;
    font-size: 17px;
    color: #333333;
    width: 160px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .work-list li > div:nth-child(2) p:last-child {
    height: 14px;
    color: #9fa3b0;
    margin-top: 10px;
    width: 160px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .work-list li > div:nth-child(2) p:last-child span {
    width: 50px;
    font-size: 14px;
    color: #9fa3b0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .work-list li > div:last-child {
    width: 212px;
    height: 100%;
  }
  .work-list li > div:last-child p:first-child {
    line-height: 20px;
    margin-top: 36px;
    margin-bottom: 18px;
    padding-left: 31px;
    white-space: nowrap;
  }
  .work-list li > div:last-child p span {
    color: #999;
    font-size: 15px;
  }
  .work-list li > div:last-child p span:last-child {
    padding-left: 20px;
  }

  .work-list li > div:last-child p:first-child span:first-child {
    display: inline-block;
    width: 120px;
    color: #f06358;
    font-size: 20px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .work-list li > div:last-child div {
    width: 187px;
    height: 50px;
    background: #ed7f76;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 20px;
  }
  .el-pagination {
    text-align: center;
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
  .post-list-nothing {
    margin-top: 20px;
    height: 738px;
    position: relative;
    background: #fff;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 360px;
      height: 256px;
    }
    & > p {
      @extend img;
      margin-top: 256px;
      padding-top: 10px;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>