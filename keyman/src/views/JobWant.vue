<template>
  <div class="job-want">
    <div class="main-box">
      <div class="seach">
        <div class="seach-box">
          <div class="search-hot-post">
            <div class="title">热招职位</div>
            <ul class="label-wrap" v-show="jobIntentionList.length">
              <li class="label" v-for="item in jobIntentionList" :key="item.num">
                <span class="title">{{filterPost(item.c_id)}}</span>
                <span class="editor-btns" @click="onEditorJobIntention(item)"></span>
              </li>
            </ul>
            <div class="add-hot-post" @click="onAddJobIntention">创建求职意向</div>
          </div>
          <el-input class="search-row" v-model="search.key_name">
            <el-cascader
              slot="prepend"
              v-model="search.city"
              placeholder="地区"
              :options="addressList"
              :props="{
                      value: 'cid',
                      label: 'name',
                      children: 'data_list'
                    }"
              ref="cityWrap"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
              </template>
            </el-cascader>
            <div slot="append" class="btns-group">
              <div class="select-box">
                <el-select v-model="search.industry" placeholder="公司行业">
                  <el-option
                    v-for="item in industryList"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="select-box">
                <el-select v-model="search.job_category" placeholder="职位类型">
                  <el-option
                    v-for="item in postList"
                    :value="item.c_id"
                    :key="item.c_id"
                    :label="item.class_name"
                  ></el-option>
                </el-select>
              </div>
              <span class="search-btn" @click="onSearchJob">搜索</span>
            </div>
          </el-input>
          <div class="option">
            <div class="select-box-wrap">
              <div class="select-box">
                <el-select v-model="search.work_year" placeholder="工作经验">
                  <el-option label="不限" :value="0"></el-option>
                  <el-option label="在校生" :value="1"></el-option>
                  <el-option label="应届生" :value="2"></el-option>
                  <el-option label="一年以下" :value="3"></el-option>
                  <el-option label="1-3年" :value="4"></el-option>
                  <el-option label="3-5年" :value="5"></el-option>
                  <el-option label="5-10年" :value="6"></el-option>
                  <el-option label="10年以上" :value="7"></el-option>
                </el-select>
              </div>
              <div class="select-box">
                <el-select v-model="search.education" placeholder="学历要求">
                  <el-option label="不限" :value="0"></el-option>
                  <el-option label="初中及以下" :value="1"></el-option>
                  <el-option label="中专/技校" :value="2"></el-option>
                  <el-option label="高中" :value="3"></el-option>
                  <el-option label="大专" :value="4"></el-option>
                  <el-option label="本科" :value="5"></el-option>
                  <el-option label="硕士" :value="6"></el-option>
                  <el-option label="博士" :value="7"></el-option>
                </el-select>
              </div>
              <div class="select-box">
                <el-select v-model="search.month_money" placeholder="薪资要求">
                  <el-option label="3K以下" :value="1"></el-option>
                  <el-option label="3-5K" :value="2"></el-option>
                  <el-option label="5-10K" :value="3"></el-option>
                  <el-option label="10-15K" :value="4"></el-option>
                  <el-option label="15-20K" :value="5"></el-option>
                  <el-option label="20-30K" :value="6"></el-option>
                  <el-option label="30-50K" :value="7"></el-option>
                  <el-option label="50K以上" :value="8"></el-option>
                </el-select>
              </div>
              <div class="select-box">
                <el-select v-model="search.comkind" placeholder="融资阶段">
                  <el-option label="未融资" :value="1"></el-option>
                  <el-option label="天使轮" :value="2"></el-option>
                  <el-option label="A轮" :value="3"></el-option>
                  <el-option label="B轮" :value="4"></el-option>
                  <el-option label="C轮" :value="5"></el-option>
                  <el-option label="D轮以上" :value="6"></el-option>
                  <el-option label="上市公司" :value="7"></el-option>
                  <el-option label="不需要融资" :value="8"></el-option>
                </el-select>
              </div>
              <div class="select-box">
                <el-select v-model="search.employee_num" placeholder="公司规模">
                  <el-option label="0-20人" :value="1"></el-option>
                  <el-option label="20-99人" :value="2"></el-option>
                  <el-option label="100-499人" :value="3"></el-option>
                  <el-option label="500-999人" :value="4"></el-option>
                  <el-option label="1000-9999人" :value="5"></el-option>
                  <el-option label="10000以上" :value="6"></el-option>
                </el-select>
              </div>
            </div>
            <div class="radio-box-wrap">
              <el-radio-group v-model="searchType">
                <el-radio :label="2">兼职</el-radio>
                <el-radio :label="1">全职</el-radio>
              </el-radio-group>
            </div>
            <div class="clear-search-select" @click="onResetSearch">清空条件选项</div>
          </div>
        </div>
      </div>
      <div class="bottom-content">
        <div class="work-list">
          <ul v-show="searchPostList.length">
            <li
              v-for="item in searchPostList"
              :key="item.id"
              @click="onSeePostInfo(item)"
              class="post-item"
            >
              <div class="avatar-wrap">
                <div class="avatar-box">
                  <img :src="item.headimgurl" alt />
                </div>
                <div class="post-info">
                  <p class="title">{{item.job_title}}</p>
                  <p
                    class="subtitle"
                  >{{item.province}} | {{item.province === item.city ? '' : item.city}} | {{item.district}}</p>
                </div>
              </div>
              <div class="info">
                <p class="title">{{item.salary_above}}k-{{item.salary_below}}k {{item.month_money}}薪</p>
                <p
                  class="subtitle"
                >{{item.company_name}} | {{item.employee_num | filterCompanySize}} | {{item.comkind | filterComkind}}</p>
              </div>
              <div class="btns-group">
                <div class="btns-box">
                  <div class="share-btns" @click="onSharePost(item)">分享转发</div>
                  <div class="hand-resume" @click="onSelectPost(item)">投简历</div>
                </div>
                <div class="intro-wrap">
                  <p class="name">{{item.nickname}}</p>
                  <!-- <p class="level">猎头等级</p> -->
                </div>
              </div>
            </li>
          </ul>
          <div v-if="!searchPostList.length" class="post-list-nothing">
            <img src="../assets/img/nothing_icon@2x.png" alt />
            <p>暂无职位信息</p>
          </div>
          <el-pagination
            v-if="!(!searchPostList.length && pageData.pageNum === 1)"
            layout="prev, pager, next"
            :current-change="onPageChange"
            :total="pageData.allCount"
            :page-size="20"
          ></el-pagination>
        </div>
        <div class="right-bar">
          <p>浏览记录</p>
          <div>09:20</div>
          <div>
            <div>
              <p>公司名称</p>
              <p>城市 城区 | 工龄 | 学历</p>
            </div>
            <div>
              <p>1.6-2.0K 13薪 奖金</p>
              <p>公司名称 | 规模 | 融资、资质</p>
            </div>
            <div>猎头名称</div>
          </div>

          <span>暂无已查看职位</span>
        </div>
      </div>
    </div>
    <!-- 查看管求职意向 -->
    <el-dialog width="440px" :modal-append-to-body="false" :visible.sync="dialogVisible">
      <div class="title">管理求职意向</div>
      <div class="intention-wrap">
        <h2>管理求职意向</h2>
        <p class="subtitle">求职期望</p>
        <p class="subtitle">创建求职期望，向您推荐期望职位，最多3个</p>
        <div class="intention-list">
          <el-carousel arrow="always" height="80px ">
            <el-carousel-item v-for="item in jobIntentionList" :key="item.num">
              <div class="info">
                <p class="title">[{{item.q_city}}]{{filterPost(item.c_id)}}</p>
                <p class="subtitle">{{item.money}}k {{filterIndustry(item.industry)}}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="btns-action">
        <div class="add-btns" @click="onEditorJobIntention('')">添加期望</div>
      </div>
    </el-dialog>
    <!-- 编辑管求职意向 -->
    <el-dialog width="440px" :modal-append-to-body="false" :visible.sync="dialogVisibleEditor">
      <div class="title">求职期望</div>
      <div class="strong-title">编辑求职期望</div>
      <div class="subtitle">创建求职期望，向您推荐期望职位最多3个</div>
      <el-form
        :model="jobIntentionData"
        :rules="jobIntentionRules"
        class="jobintention-form"
        ref="jobIntentionWrap"
      >
        <el-form-item prop="c_id" label="期望职位" placeholder="请选择">
          <el-select v-model="jobIntentionData.c_id">
            <el-option
              v-for="item in postList"
              :key="item.c_id"
              :label="item.class_name"
              :value="item.c_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="industry" label="期望行业" placeholder="请选择">
          <el-select v-model="jobIntentionData.industry">
            <el-option
              v-for="item in industryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="q_city" label="期望城市" placeholder="请选择">
          <el-cascader
            v-model="jobIntentionData.q_city"
            placeholder="地区"
            :options="addressList"
            :props="{
                      value: 'cid',
                      label: 'name',
                      children: 'data_list'
                    }"
            ref="cityWrap"
          >
            <template slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item prop="money" label="薪资要求" placeholder="请选择">
          <el-select v-model="jobIntentionData.money">
            <el-option label="3K以下" :value="1"></el-option>
            <el-option label="3-5K" :value="2"></el-option>
            <el-option label="5-10K" :value="3"></el-option>
            <el-option label="10-15K" :value="4"></el-option>
            <el-option label="15-20K" :value="5"></el-option>
            <el-option label="20-30K" :value="6"></el-option>
            <el-option label="30-50K" :value="7"></el-option>
            <el-option label="50K以上" :value="8"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btns-action">
        <div class="add-btns" @click="onSaveJobIntention">保存</div>
      </div>
    </el-dialog>
    <el-dialog width="1240px" :visible.sync="showDetail" :model-append-to-body="false">
      <PostDetailInfoHR :show="true" :isLogined="false" :detail="curPost"></PostDetailInfoHR>
    </el-dialog>
  </div>
</template>

<script>
import PostDetailInfoHR from '@/components/PostDetailInfoHR'
import {
  getAllAddress,
  formatterAddressData,
  getAllIndustry,
  getAllPost,
  searchAllJob,
  saveJobIntention
} from '@/api/api'
import { mapGetters } from 'vuex'
const JOB_INTENTION_LENGTH = 3 // 求职意向数量
export default {
  name: 'JobWant',
  data() {
    return {
      search: {
        key_name: '',
        job_category: '',
        district: '',
        city: [],
        industry: '',
        post: '',
        work_year: '',
        education: '',
        money_extent: '',
        comkind: '',
        employee_num: ''
      },
      searchType: 1,
      addressList: [],
      industryList: [],
      postList: [],
      pageData: {
        pageNum: 1,
        allCount: 0
      },
      sendData: {},
      searchPostList: [],
      jobIntentionList: [
        // {
        //   num: 1,
        //   c_id: '',
        //   industry: '',
        //   q_city: '',
        //   money: ''
        // }
      ],
      dialogVisibleEditor: false,
      dialogVisible: false,
      jobIntentionData: {
        member_id: '',
        token: '',
        num: '',
        c_id: '',
        industry: '',
        q_city: [],
        money: ''
      },
      jobIntentionRules: {
        c_id: [
          {
            required: true,
            message: ''
          }
        ],
        industry: [
          {
            required: true,
            message: ''
          }
        ],
        q_city: [
          {
            required: true,
            message: ''
          }
        ],
        money: [
          {
            required: true,
            message: ''
          }
        ]
      },
      showDetail: false,
      curPost: {}
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getMemberId'])
  },
  created() {
    this.initAddressList()
    this.initIndustryList()
    this.initPostList()
  },
  methods: {
    initAddressList() {
      const formatterAddress = node => {
        for (let i = 0; i < node.length; i++) {
          if (!node[i].data_list) {
            continue
          }
          if (node[i].grade === 2) {
            // 此处不展示地区-只展示-省、市
            node[i].data_list = undefined
            continue
          }
          formatterAddress(node[i].data_list)
        }
      }
      getAllAddress().then(res => {
        if (res.code === 200) {
          formatterAddress(res.data)
          this.addressList = res.data
        }
      })
    },
    initIndustryList() {
      getAllIndustry().then(res => {
        if (res.code === 200) {
          this.industryList = res.data
        }
      })
    },
    initPostList() {
      getAllPost().then(res => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    },
    onSearchJob() {
      const keys = Object.keys(this.search)
      const sendData = keys.reduce((pre, item) => {
        if (this.search[item] && item !== 'city') {
          // 对待地区特殊处理
          pre[item] = this.search[item]
        }
        return pre
      }, {})
      // 对地区特殊处理
      if (this.search.city.length) {
        sendData.province = this.search.city[0]
        sendData.city = this.search.city[0]
      }
      if (this.search.city.length > 1) {
        sendData.city = this.search.city[1]
      }
      if (this.search.city.length > 2) {
        sendData.district = this.search.city[2]
      }
      this.sendData.page = 1 // 每次搜索初始化页码
      searchAllJob(sendData).then(res => {
        if (res.code === 200) {
          this.searchPostList = res.data
          this.pageData.allCount = res.pagelist.count_num
          this.pageData.pageNum = res.pagelist.page
          this.sendData = sendData // 记录当前查询条件，翻页使用
        } else if (res.code === 40001 && this.sendData.page === 1) {
          this.searchPostList = []
        }
      })
    },
    onPageChange(pageNum) {
      this.sendData.page = pageNum
      searchAllJob(this.sendData).then(res => {
        if (res.code === 200) {
          this.searchPostList = res.data
          this.pageData.allCount = res.pagelist.count_num
          this.pageData.pageNum = res.pagelist.page
          this.sendData = sendData // 记录当前查询条件，翻页使用
        } else if (res.code === 40001 && this.sendData.page === 1) {
          this.searchPostList = []
        }
      })
    },
    onResetSearch() {
      this.search = {
        key_name: '',
        job_category: '',
        district: '',
        city: [],
        industry: '',
        post: '',
        work_year: '',
        education: '',
        money_extent: '',
        comkind: '',
        employee_num: ''
      }
    },
    onSelectPost(data) {},
    onSharePost(data) {},
    onAddJobIntention() {
      if (this.jobIntentionList.length >= JOB_INTENTION_LENGTH) {
        return
      }
      this.dialogVisible = true
    },
    onEditorJobIntention(data) {
      if (data) {
        // 编辑
        this.dialogVisibleEditor = true
        this.jobIntentionData = data
        return
      }
      // 添加
      this.dialogVisible = false
      this.dialogVisibleEditor = true
    },
    onSaveJobIntention() {
      this.jobIntentionData.token = this.getToken
      this.jobIntentionData.member_id = this.getMemberId
      const sendData = {}
      const city = this.jobIntentionData.q_city
      for (
        let i = 0, keys = Object.keys(this.jobIntentionData);
        i < keys.length;
        i++
      ) {
        if (keys[i] === 'q_city') {
          continue
        }
        sendData[keys[i]] = this.jobIntentionData[keys[i]]
      }
      sendData.q_city =
        city && city.length ? this.jobIntentionData.q_city[city.length - 1] : ''
      sendData.num = this.jobIntentionList.length + 1
      this.$refs.jobIntentionWrap.validate(valid => {
        if (valid) {
          // 添加、保存 求职意向
          saveJobIntention(sendData).then(res => {
            if (res.code === 200) {
              // 更新求职意向列表--暂无此接口
              this.dialogVisibleEditor = false
              this.$message(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onSeePostInfo(data) {
      console.log(data)
      this.showDetail = true
      this.curPost = data
    },
    filterPost(id) {
      const item = this.postList.find(item => {
        return id === item.c_id
      })
      return item ? item.class_name : ''
    },
    filterIndustry(id) {
      const item = this.industryList.find(item => {
        return item.id === id
      })
      return item ? item.name : ''
    }
  },
  filters: {
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
  },
  components: {
    PostDetailInfoHR
  }
}
</script>

<style lang="scss">
.job-want {
  .main-box {
    max-width: 1240px;
    height: auto;
    padding-top: 40px;
    margin: 0 auto;
  }
  .seach {
    height: auto;
    max-width: 1280px;
    width: 100%;
    background: #fff;
  }

  .seach-box {
    padding-top: 30px;
    margin: 0 40px;
    .search-row {
      .el-input__inner {
        display: inline-block;
      }
    }
    & > .el-input {
      border-color: #f06358;
      .el-input-group__prepend {
        position: relative;
        vertical-align: middle;
        padding: 0;
        width: 140px;
        border: none;
        line-height: 58px;
        border-right: none;
        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 34px;
          background: #f2f2f5;
          z-index: 20;
        }
        .el-cascader {
          .el-input__inner {
            height: 58px;
            line-height: 58px;
            border-color: #f06358;
            border-right-color: transparent;
            border-right: none;
          }
        }
      }
    }
    .el-input-group__append {
      padding: 0;
      border-color: #f06358;
      border-left: none;
      border-radius: 0;
      .el-select {
        margin: 0;
        display: block;
        line-height: 56px;
        background: #fff;
      }
    }
    .btns-group {
      position: relative;
      width: 374px;
      display: flex;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 34px;
        background: #f2f2f5;
        z-index: 20;
      }
      .search-btn {
        width: 118px;
        height: 56px;
        background: #f06358;
        font-size: 20px;
        line-height: 56px;
        text-align: center;
        color: #fff;
        cursor: pointer;
      }
      .select-box {
        flex: 1;
      }
    }
    .el-input-group {
      & > .el-input__inner {
        line-height: 58px;
        height: 58px;
        border-color: #f06358;
        border-left: none;
        border-right: none;
      }
    }
    .radio-box-wrap {
      margin-right: 40px;
      margin-left: 15px;
      line-height: 40px;
      .is-checked {
        .el-radio__inner {
          border-color: #f06358;
          background: #f06358;
        }
        .el-radio__label {
          color: #f06358;
        }
      }
    }
    .clear-search-select {
      margin-right: 12px;
      font-size: 16px;
      line-height: 40px;
      color: #414a60;
      cursor: pointer;
    }
  }
  .search-hot-post {
    display: flex;
    & > .title {
      margin-right: 40px;
      font-size: 16px;
      line-height: 56px;
      color: #414a60;
      font-weight: bold;
    }
    .label-wrap {
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      .label {
        margin-right: 20px;
        display: flex;
        align-items: center;
        padding: 0;
        & > .title {
          display: block;
          padding-right: 10px;
          font-size: 14px;
          line-height: 34px;
          white-space: nowrap;
          text-align: left;
          overflow: hidden;
          max-width: 120px;
          color: #414a60;
        }
        .editor-btns {
          display: block;
          width: 12px;
          height: 12px;
          background: url(../assets/img/bianji.png) no-repeat 0 0;
          background-size: 12px 12px;
          cursor: pointer;
        }
      }
    }
    .add-hot-post {
      position: relative;
      padding-left: 16px;
      font-size: 14px;
      line-height: 56px;
      color: #414a60;
      cursor: pointer;
      &::after {
        content: '+';
        position: absolute;
        top: 22px;
        left: 0;
        width: 12px;
        height: 12px;
        // background: url(../assets/img/bianji.png) no-repeat 0 0;
        // background-size: 12px 12px;
        font-size: 20px;
        line-height: 12px;
      }
    }
  }
  .option {
    padding-bottom: 20px;
    display: flex;
    .select-box-wrap {
      flex: 1;
      display: flex;
      .select-box {
        margin-right: 30px;
        .el-input__inner {
          border: none;
          color: #414a60;
        }
      }
    }
  }
  .bottom-content {
    display: flex;
  }
  .jobintention-form {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 42px;
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-form-item__label {
      width: 100%;
      text-align: left;
      color: #afb4b6;
      font-size: 12px;
      &::before {
        content: '';
        display: none;
      }
    }
    .el-cascader,
    .el-select {
      width: 100%;
    }
  }
  .work-list {
    flex: 1;
    min-height: 613px;
    background: #fff;
    margin-top: 20px;
    padding-bottom: 88px;
    position: relative;
    ul {
      padding: 0 20px;
      background: #fff;
    }
    .post-item {
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid #cccccc;
      justify-content: space-between;
      cursor: pointer;
      .avatar-wrap {
        flex: 1;
        display: flex;
        .avatar-box {
          margin-right: 12px;
          width: 70px;
          height: 70px;
          background: #f2f2f2;
          border-radius: 50%;
          & > img {
            display: block;
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }
        .post-info {
          .title {
            max-width: 200px;
            font-size: 18px;
            line-height: 28px;
            color: #333333;
            text-align: left;
            font-weight: bold;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .subtitle {
            max-width: 260px;
            font-size: 14px;
            line-height: 24px;
            color: #afb4b6;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
          }
        }
      }
      & > .info {
        flex: 1;
        .title {
          font-size: 16px;
          line-height: 36px;
          color: #fd877d;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 260px;
        }
        .subtitle {
          max-width: 260px;
          font-size: 14px;
          line-height: 24px;
          color: #afb4b6;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          text-align: center;
        }
      }
      .btns-group {
        width: 170px;
        .btns-box {
          display: flex;
          border: 1px solid #ff7272;
          .share-btns {
            width: 84px;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            color: #ff7272;
            background: #fff;
            cursor: pointer;
          }
          .hand-resume {
            @extend .share-btns;
            background: #ff7272;
            color: #fff;
          }
        }
        .intro-wrap {
          display: flex;
          justify-content: space-around;
          .name {
            position: relative;
            font-size: 14px;
            line-height: 30px;
            color: #666666;
            padding-left: 20px;
            max-width: 80px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &::before {
              content: '';
              position: absolute;
              top: 9px;
              left: 0;
              width: 12px;
              height: 12px;
              background: url(../assets/img/my.png) no-repeat 0 0;
              background-size: 12px 12px;
            }
          }
          .level {
            @extend .name;
            &::before {
              content: '';
              background: url(../assets/img/dengji.png) no-repeat 0 0;
              background-size: 12px 12px;
            }
          }
        }
      }
    }
  }
  /* 没数据时 */
  .work-list > img {
    width: 291px;
    height: 236px;
    display: block;
    margin: 143px auto 33px;
  }
  .work-list > p {
    line-height: 20px;
    font-size: 20px;
    width: 100%;
    text-align: center;
    color: #61687c;
  }
  /* 底部换页 */
  .right-bar {
    width: 425px;
    height: 613px;
    margin-left: 20px;
    background: #fff;
    float: left;
    margin-top: 20px;
    padding: 20px 30px;
    position: relative;
  }
  .right-bar > p:first-child {
    font-size: 18px;
    line-height: 18px;
  }
  .right-bar > div:nth-child(2) {
    height: 14px;
    margin: 13px 0 0;
    background: #e4e4e4;
    text-align: center;
    line-height: 14px;
    font-size: 12px;
  }
  .right-bar > div:nth-child(3) {
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    padding-top: 19px;
  }
  .right-bar > div:nth-child(3) > div {
    float: left;
    font-size: 12px;
    height: 70px;
    line-height: 20px;
  }
  .right-bar > div:nth-child(3) > div:first-child {
    width: 35%;
  }
  .right-bar > div:nth-child(3) > div:nth-child(2) {
    width: 50%;
    text-align: center;
  }
  .right-bar > div:nth-child(3) > div:nth-child(3) {
    width: 15%;
    text-align: right;
    line-height: 30px;
  }
  .right-bar > div:nth-child(3) > div:nth-child(2) > p:first-child {
    color: #fd877d;
  }
  .right-bar > span {
    font-size: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 120px;
    text-align: center;
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
  .el-dialog__header {
    padding: 0;
    height: 0;
    overflow: hidden;
    .el-dialog__headerbtn {
      display: none;
    }
  }
  .el-dialog {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .el-dialog__body {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 0;
    & > .title {
      font-size: 18px;
      line-height: 40px;
      color: #fff;
      background-color: #f06358;
      text-align: center;
      height: 40px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .strong-title {
      padding: 34px 30px 0;
      font-size: 18px;
      line-height: 24px;
      color: #333333;
      text-align: left;
      font-weight: bold;
    }
    & > .subtitle {
      padding: 0 30px;
      font-size: 14px;
      line-height: 20px;
      color: #afb4b6;
      text-align: left;
    }
    .intention-wrap {
      padding: 10px 30px;
      & > h2 {
        font-size: 18px;
        line-height: 38px;
        padding-top: 30px;
        color: #333333;
        text-align: left;
        margin-bottom: 30px;
      }
      .subtitle {
        font-size: 14px;
        line-height: 28px;
        color: #afb4b6;
        text-align: left;
      }
      .intention-list {
        width: 380px;
        overflow: hidden;
        .info {
          padding-top: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e0e0e0;
          & > .title {
            font-size: 18px;
            line-height: 26px;
            color: #333;
            max-width: 360px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
          }
          & > .subtitle {
            font-size: 14px;
            line-height: 22px;
            color: #afb4b6;
            text-align: left;
          }
        }
      }
    }
    .btns-action {
      padding: 30px 36px;
      .add-btns {
        width: 100%;
        font-size: 18px;
        line-height: 40px;
        color: #fff;
        background: #f06358;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .el-form-item__error {
    display: none;
  }
}
</style>