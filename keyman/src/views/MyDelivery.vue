<template>
  <div class="my-delivery">
    <div class="send-box">
      <div class="head">
        <div :class="{'cur': tag === 'all'}" @click="onSwitchTag('all')">全部投递</div>
        <div :class="{'cur': tag === 'top'}" @click="onSwitchTag('top')">置顶职位</div>
        <div :class="{'cur': tag === 'nointerest'}" @click="onSwitchTag('nointerest')">不感兴趣</div>
      </div>
      <div class="send-info">
        <ul v-show="resumeList.length">
          <li v-for="(item, index) in resumeList" :key="index">
            <img :src="item.headimgurl" alt />
            <div>
              <p>
                {{item.nickname}} I {{item.type | filterType}}
                <!-- 暂无这两个字段 -->
                <!-- <span
                  class="stop"
                  style="margin-left:20px ;"
                  v-show="item."
                >停止招聘</span>-->
                <!-- <span class="pass">不感兴趣</span> -->
              </p>
              <div>
                <div>
                  <p>
                    {{item.job_title}}
                    <span
                      style="color: #FD877D;"
                    >{{item.salary_above | filterSalary}}-{{item.salary_below | filterSalary}}</span>
                  </p>
                  <p>{{item.province}} {{item.province === item.city ? '' : item.city}} {{item.district}} I {{item.work_year | filterWorkYear}} I {{item.education | filterEdu}}</p>
                </div>
                <div>
                  <p>{{item.company_name}}</p>
                  <p>{{item.company_name}} {{item.employee_num | filterCompanySize}} I {{item.comkind | filterComkind}}</p>
                  <img :src="item.logo" alt />
                </div>
                <span @click="onGoJobChart(item)">进入沟通</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!showPagination" class="post-list-nothing">
        <img src="../assets/img/nothing_icon@2x.png" alt />
      </div>
      <div v-show="showPagination">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageData.pageSize"
          :total="pageData.allCount"
          @current-change="onPageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getAllDeliveryList,
  getTopDeliveryList,
  getNoINTERESTDeliveryList
} from '@/api/api'
const PAGE_SIZE = 20
export default {
  name: 'MyDelivery',
  data() {
    return {
      tag: 'all',
      resumeList: [
        // {
        //   headimgurl: '/uploads/admin/1563244624666.jpg',
        //   nickname: '张三',
        //   type: '12',
        //   job_title: 'PHP开发',
        //   salary_above: 5,
        //   salary_below: 20,
        //   province: '北京市',
        //   city: '北京市',
        //   district: '朝阳区',
        //   work_year: 1,
        //   education: 3,
        //   company_name: '北京智慧小喇叭',
        //   comkind: 4,
        //   employee_num: '4',
        //   logo: ''
        // }
      ],
      allData: {
        member_id: '',
        token: '',
        job_id: '',
        page: 1,
        number: PAGE_SIZE
      },
      pageData: {
        page: 1,
        pageSize: PAGE_SIZE,
        allCount: 0
      }
    }
  },
  computed: {
    showPagination() {
      return !(this.pageData.page === 1 && !this.resumeList.length)
    },
    ...mapGetters(['getToken', 'getMemberId'])
  },
  created() {
    this.getALLList()
  },
  methods: {
    onSwitchTag(tag) {
      this.tag = tag
      switch (tag) {
        case 'all':
          this.getALLList()
          break
        case 'top':
          this.getTopList()
          break
        case 'nointerest':
          this.getNointerest()
          break
      }
    },
    getALLList(page = 1) {
      this.allData.token = this.getToken
      this.allData.member_id = this.getMemberId
      this.allData.page = page
      getAllDeliveryList(this.allData).then(res => {
        if (res.code === 200) {
          this.resumeList = res.data
          this.pageData.allCount = res.pagelist.count_num
        } else if (res.code === 40001 && page === 1) {
          this.resumeList = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getTopList(page = 1) {
      this.allData.token = this.getToken
      this.allData.member_id = this.getMemberId
      this.allData.page = page
      getTopDeliveryList(this.allData).then(res => {
        if (res.code === 200) {
          this.resumeList = res.data
          this.pageData.allCount = res.pagelist.count_num
        } else if (res.code === 40001 && page === 1) {
          this.resumeList = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getNointerest(page = 1) {
      this.allData.token = this.getToken
      this.allData.member_id = this.getMemberId
      this.allData.page = page
      getNoINTERESTDeliveryList(this.allData).then(res => {
        if (res.code === 200) {
          this.resumeList = res.data
          this.pageData.allCount = res.pagelist.count_num
        } else if (res.code === 40001 && page === 1) {
          this.resumeList = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onPageChange(page) {
      switch (this.tag) {
        case 'all':
          this.getALLList(page)
          break
        case 'top':
          this.getTopList(page)
          break
        case 'nointerest':
          this.getNointerest(page)
          break
      }
    },
    onGoJobChart(data) {
      // 进入职聊
      console.log(data)
    }
  },
  filters: {
    filterType(type) {
      const map = {
        1: '求职者',
        2: 'hr',
        3: '猎头',
        4: '兼职猎头'
      }
      let types = []
      for (let i = 0; i < type.length; i++) {
        types.push(map[type[i]])
      }
      return types.join()
    },
    filterSalary(num) {
      const map = {
        1: '3K以下',
        2: '3-5K',
        3: '5-10K',
        4: '10-15K',
        5: '15-20K',
        6: '20-30K',
        7: '30-50K',
        8: '50K以上'
      }
      return map[num]
    },
    filterWorkYear(num) {
      const map = {
        0: '不限',
        1: '在校生',
        2: '应届生',
        3: '一年以下',
        4: '1-3年',
        5: '3-5年',
        6: '5-10年',
        7: '10年以上'
      }
      return map[num]
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
.send-box {
  max-width: 1240px;
}
.send-box {
  /* width: 1240px; */
  height: 800px;
  background: #fff;
  margin: 60px auto 0;
  position: relative;
}
.send-box > .head {
  height: 50px;
  width: 100%;
  border-bottom: 2px solid #e3e7ed;
  padding: 0 35px;
}
.send-box > .head > div {
  float: left;
  line-height: 48px;
  margin: 0 25px;
  font-size: 18px;
  height: 50px;
  color: #afb4b6;
  cursor: pointer;
}
.send-box > .head > .cur {
  color: #fe7271;
  border-bottom: 2px solid #fe7271;
}
.send-box > .send-info > ul > li {
  height: 200px;
  padding: 20px 40px;
  border-bottom: 2px solid #e3e7ed;
}
.send-box > .send-info > ul > li > img {
  float: left;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background: #999;
}
.send-box > .send-info > ul > li > div {
  float: left;
  width: calc(100% - 150px);
  margin-left: 20px;
  height: auto;
  position: relative;
}
.send-box > .send-info > ul > li > div > p {
  width: 100%;
  line-height: 56px;
  font-size: 18px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.send-box > .send-info > ul > li > div > p > span {
  float: right;
  width: 140px;
  height: 36px;
  line-height: 34px;
  border-radius: 5px;
  border: 1px solid #c3c6c8;
  color: #afb4b6;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.send-box > .send-info > ul > li > div > div:nth-child(2) {
  background: #f7f7f9;
  width: 100%;
  height: 96px;
  position: relative;
}
.send-box > .send-info > ul > li > div > div:nth-child(2) > div {
  float: left;
  padding: 25px 42px;
  width: 50%;
  height: 100%;
  position: relative;
  padding-right: 120px;
  text-align: left;
}

.send-box
  > .send-info
  > ul
  > li
  > div
  > div:nth-child(2)
  > div
  > p:first-child {
  font-size: 18px;
  color: #333;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.send-box
  > .send-info
  > ul
  > li
  > div
  > div:nth-child(2)
  > div
  > p:nth-child(2) {
  color: #afb4b6;
  font-size: 14px;
  line-height: 14px;
  margin-top: 15px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.send-box
  > .send-info
  > ul
  > li
  > div
  > div:nth-child(2)
  > div:nth-child(2)
  > p:first-child {
  text-align: right;
  font-size: 18px;
  color: #333;
  line-height: 18px;
}
.send-box
  > .send-info
  > ul
  > li
  > div
  > div:nth-child(2)
  > div:nth-child(2)
  > p:nth-child(2) {
  color: #afb4b6;
  font-size: 14px;
  line-height: 14px;
  text-align: right;
  margin-top: 15px;
}

.send-box
  > .send-info
  > ul
  > li
  > div
  > div:nth-child(2)
  > div:nth-child(2)
  > img {
  height: 60px;
  width: 60px;
  position: absolute;
  right: 40px;
  background: #999;
  top: 18px;
}
.send-box > .send-info > ul > li > div > div:nth-child(2) > span {
  position: absolute;
  height: 36px;
  width: 140px;
  background: #ff7272;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 36px;
  display: block;
  top: 30px;
  left: 50%;
  margin-left: -105px;
  display: none;
  cursor: pointer;
}
.send-box > .send-info > ul > li:hover > div > div:nth-child(2) > span {
  display: block;
}

.send-info > div {
  width: auto;
  position: absolute;
  height: 82px;
  left: calc(50% - 219px);
  bottom: 14px;
}
.send-info > div > img {
  float: left;
  height: 44px;
  width: 63px;
}
.send-info > div > ul {
  width: 312px;
  height: 44px;
  float: left;
  margin-top: 6px;
}
.send-info > div > ul > li {
  height: 32px;
  width: 37px;
  float: left;
  text-align: center;
  line-height: 32px;
  margin: 0 20px;
}
.send-info > div > ul > li.cur {
  background: #ff7272;
  color: #fff;
}

.send-info > div > ul > li > div {
  float: left;
  width: 33.33%;
  height: 100%;
  margin-bottom: 20px;
  border-bottom: 1px solid #cccccc;
}

.send-info li > div:first-child > img {
  float: left;
  margin-left: 11px;
  margin-right: 12px;
  height: 70px;
  width: 70px;
}

.send-info li > div:first-child > div {
  float: left;
}

.send-info li > div:first-child > div > p {
  font-size: 14px;
  line-height: 14px;
  margin-top: 15px;
  color: #999;
}

.send-info li > div:first-child > div > p:first-child {
  line-height: 18px;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-top: 10px;
}

.send-info > div > ul > li > div:nth-child(2) > p:first-child {
  color: #fd877d;
  font-size: 16px;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
}

.send-info > div > ul > li > div:nth-child(2) > p:last-child {
  color: #afb4b6;
  font-size: 14px;
  line-height: 14px;
  width: 100%;
  text-align: center;
}
.send-info > div > ul > li > div:nth-child(3) > div:first-child {
  width: 100px;
  height: 30px;
  background: #f06358;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  margin-top: 9px;
  float: right;
}
.send-info > div > ul > li > div:nth-child(3) > div:last-child {
  text-align: right;
  width: 100%;
  float: right;
  margin-top: 10px;
  font-size: 14px;
  color: #666666;
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
      display: none !important;
    }
  }
  .btn-prev {
    margin-right: 20px;
    width: 39px;
    height: 34px;
    background: url(../assets/img/page-left@2x.png) no-repeat 0 0;
    background-size: 39px 34px;
    & > i {
      display: none !important;
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
}
</style>