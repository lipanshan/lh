<template>
  <div class="fulltime">
    <div class="seach">
      <div class="seach-box">
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
            @expand-change="onExpendChange"
            @change="onChangeCity"
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
        <div class="city">
          <div class="left">
            <div>{{curCityName ? curCityName : '不限'}}</div>
            <div class="next-icon">></div>
            <div>{{curDistrictName ? curDistrictName :'不限'}}</div>
            <div class="next-icon">></div>
            <div class="hotCity">
              <div>热门城市:</div>
              <ul v-show="addressList.length" :class="{'collpase': cityFlag}">
                <li
                  v-for="item in addressList"
                  :key="item.cid"
                  :class="{'active': item.cid === curCity}"
                  @click="onSelectCity(item)"
                >{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="allCity" @click="onShowAllCity">{{cityFlag ? '全部' : '热门'}}城市>></div>
        </div>
        <div class="area">
          <div class="all-district" :class="{'active': curDistrict === 0}">不限</div>
          <ul v-show="districtList.length">
            <li
              v-for="item in districtList"
              :key="item.cid"
              :class="{'active': item.cid === curDistrict}"
              @click="onSelectDistrict(item)"
            >{{item.name}}</li>
          </ul>
        </div>
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
          <div class="clear-search-select" @click="onResetSearch">清空条件选项</div>
        </div>
      </div>
    </div>
    <div class="part-main">
      <div class="content">
        <div class="work-list">
          <ul v-show="workList.length">
            <li v-for="item in workList" :key="item.id" @click="onSeePostDetail(item)">
              <div class="left">
                <p class="title">
                  <span>{{item.job_title}}</span>
                  <span
                    class="color"
                  >{{item.salary_above}}k-{{item.salary_below}}k {{item.month_money}}薪</span>
                </p>
                <p class="subtitle">
                  <span>{{item.province}} {{item.city}} {{item.district}}</span>
                  <span>{{item.work_year | filterWorkYear}}</span>
                  <span>{{item.education | filterEdu}}</span>
                </p>
              </div>
              <div class="center">
                <p class="title">{{item.company_name}}</p>
                <p class="subtitle">
                  <span>{{item.description}}</span>
                  <span>{{item.comkind | filterComkind}}</span>
                  <span>{{item.filterCompanySize}}</span>
                </p>
              </div>
              <!-- 暂时没有这些字段 -->
              <div class="right">
                <p class="title">
                  <span class="point"></span>
                  <!-- <span class="name">{{item.nickname}}</span> -->
                  <!-- <span class="post">{{item.}}</span> -->
                </p>
                <p class="subtitle time"></p>
              </div>
              <div class="btns" @click="onContact(item)">立即沟通</div>
            </li>
          </ul>
          <div v-if="!workList.length" class="post-list-nothing">
            <img src="../assets/img/nothing_icon@2x.png" alt />
            <p>暂无职位信息</p>
          </div>
          <el-pagination
            v-show="workList.length"
            layout="prev, pager, next"
            @current-change="onPageChange"
            :page-size="20"
            :total="pageData.allCount"
          ></el-pagination>
        </div>
        <div class="right-regist">
          <div class="go-regist" @click="onGoRegist"></div>
          <div class="upload">
            <div>上传简历一键注册</div>
          </div>
          <div class="seen-work">
            <div>看过的职位</div>
            <ul>
              <li>
                <p>
                  <span>移动游戏测试 工程...</span>
                  <span>25-35K</span>
                </p>
                <p>腾讯</p>
              </li>
              <li>
                <p>
                  <span>移动游戏测试 工程...</span>
                  <span>25-35K</span>
                </p>
                <p>腾讯</p>
              </li>
              <li>
                <p>
                  <span>移动游戏测试 工程...</span>
                  <span>25-35K</span>
                </p>
                <p>腾讯</p>
              </li>
            </ul>
          </div>
          <img class="gg advert_img" src="../assets/img/fulltime1.png" alt />
          <img
            class="gg advert-img"
            style="margin-bottom: 20px"
            src="../assets/img/fulltime2.png"
            alt
          />
        </div>
      </div>
    </div>
    <div class="proposal">
      <div class="proposal-box">
        <div>对搜索结果是否满意</div>
        <div>
          <div>
            <img src="../assets/img/no.png" alt />
            <p>不满意</p>
          </div>
          <div>
            <img src="../assets/img/en.png" alt />
            <p>一般</p>
          </div>
          <div>
            <img src="../assets/img/good.png" alt />
            <p>满意</p>
          </div>
          <div>
            <textarea name id cols="30" rows="10" placeholder="请填写更多反馈建议..."></textarea>
            <div>提交</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showDetail" :model-append-to-body="false" width="1240px">
      <PostDetail :show="true" :isLogined="false" :detail="curPost"></PostDetail>
    </el-dialog>
  </div>
</template>

<script>
import PostDetail from '@/components/PostDetailInfo'
import {
  getAllAddress,
  formatterAddressData,
  getAllIndustry,
  getAllPost,
  searchAllJob
} from '@/api/api'
export default {
  name: 'FullTime',
  data() {
    return {
      box: '',
      bgColor: '',
      txt: '',
      slider: '',
      icon: '',
      successMoveDistance: '',
      isSuccess: false,
      downX: 0,
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
      addressList: [],
      industryList: [],
      postList: [],
      cityList: [],
      districtList: [],
      cityFlag: true,
      curCity: 0,
      curDistrict: 0,
      curCityName: '',
      curDistrictName: '',
      workList: [
        // {
        //   id: 1,
        //   job_title: 'PHP开发',
        //   salary_above: 5,
        //   salary_below: 20,
        //   province: '北京市',
        //   city: '北京市',
        //   district: '朝阳区',
        //   education: 3,
        //   work_year: 1,
        //   description: 'dasdasddddddddddddddddd',
        //   recruiting_num: 0,
        //   sortid: 1,
        //   month_money: 12,
        //   company_name: '北京智慧小喇叭',
        //   employee_num: '4',
        //   comkind: 4
        // }
      ],
      pageData: {
        pageNum: 1,
        allCount: 0
      },
      sendData: {},
      curPost: {},
      showDetail: false
    }
  },
  created() {
    this.initAddressList()
    this.initIndustryList()
    this.initPostList()
    this.initList()
  },
  mounted() {
    // this.box = this.getEle('#box') //容器
    // this.bgColor = this.getEle('.bgColor') //背景色
    // this.txt = this.getEle('.txt') //文本
    // this.slider = this.getEle('.slider') //滑块
    // this.icon = this.getEle('.slider>i')
    // this.successMoveDistance = this.box.offsetWidth - this.slider.offsetWidth //解锁需要滑动的距离
    // // downX //用于存放鼠标按下时的位置
    // // isSuccess = false //是否解锁成功的标志，默认不成功
    // this.slider.onmousedown = this.mousedownHandler
  },
  methods: {
    getEle: function(selector) {
      return document.querySelector(selector)
    },
    mousedownHandler: function(e) {
      this.bgColor.style.transition = ''
      this.slider.style.transition = ''
      var e = e || window.event || e.which
      this.downX = e.clientX
      //在鼠标按下时，分别给鼠标添加移动和松开事件
      document.onmousemove = this.mousemoveHandler
      document.onmouseup = this.mouseupHandler
    },
    mousemoveHandler: function(e) {
      var e = e || window.event || e.which
      var moveX = e.clientX
      var offsetX = this.getOffsetX(
        moveX - this.downX,
        0,
        this.successMoveDistance
      )
      this.bgColor.style.width = offsetX + 'px'
      this.slider.style.left = offsetX + 'px'

      if (offsetX == this.successMoveDistance) {
        this.success()
      }
      //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
      e.preventDefault()
    },
    mouseupHandler: function(e) {
      if (!this.isSuccess) {
        this.bgColor.style.width = 0 + 'px'
        this.slider.style.left = 0 + 'px'
        this.bgColor.style.transition = 'width 0.8s linear'
        this.slider.style.transition = 'left 0.8s linear'
      }
      document.onmousemove = null
      document.onmouseup = null
    },
    getOffsetX: function(offset, min, max) {
      if (offset < min) {
        offset = min
      } else if (offset > max) {
        offset = max
      }
      return offset
    },
    success: function() {
      this.isSuccess = true
      this.txt.innerHTML = '解锁成功'
      this.bgColor.style.backgroundColor = 'lightgreen'
      this.slider.className = 'slider active'
      // this.icon.className = 'iconfont icon-xuanzhong'
      //滑动成功时，移除鼠标按下事件和鼠标移动事件
      this.slider.onmousedown = null
      document.onmousemove = null
    },
    initList() {
      if (this.$route.query.search === undefined) {
        return
      }
      this.search.key_name = this.$route.query.search
      this.onSearchJob()
    },
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
    onShowAllCity() {
      this.cityFlag = !this.cityFlag
    },
    onSelectCity(data) {
      this.curCity = data.cid
      this.curCityName = data.name
      this.districtList = data.data_list
      this.curDistrict = 0 // 初始化地区-不限
      this.curDistrictName = ''
      // this.search.city.splice(0, this.search.city.length, data.cid)
    },
    onSelectDistrict(data) {
      this.curDistrict = data.cid
      this.curDistrictName = data.name
      this.search.city = [this.curCity, data.cid]
    },
    onChangeCity(data) {
      if (data.length) {
        this.curCity = data[0]
        const itemData = this.addressList.find(item => {
          return item.cid === data[0]
        })
        this.curCityName = itemData ? itemData.name : ''
        this.districtList =
          itemData && itemData.data_list ? itemData.data_list : [] // 初始化地区列表
        this.curDistrict = 0 // 初始化地区-不限
        this.curDistrictName = ''
      }
      if (data.length >= 2) {
        this.curDistrict = data[1]
        const item = this.districtList.find(item => {
          return item.cid === data[1]
        })
        this.curDistrictName = item ? item.name : ''
      }
    },
    onExpendChange(data) {},
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
          this.workList = res.data
          this.pageData.allCount = res.pagelist.count_num
          this.pageData.pageNum = res.pagelist.page
          this.sendData = sendData // 记录当前查询条件，翻页使用
        } else if (res.code === 40001 && this.sendData.page === 1) {
          this.workList = []
        }
      })
    },
    onPageChange(pageNum) {
      this.sendData.page = pageNum
      searchAllJob(this.sendData).then(res => {
        if (res.code === 200) {
          this.workList = res.data
          this.pageData.allCount = res.pagelist.count_num
          this.pageData.pageNum = res.pagelist.page
          this.sendData = sendData // 记录当前查询条件，翻页使用
        } else if (res.code === 40001 && this.sendData.page === 1) {
          this.workList = []
        }
      })
    },
    onContact(data) {
      console.log(data)
      this.$router.push({
        path: '/user/jobchart'
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
      this.districtList = []
      this.cityFlag = true
      this.curCity = 0
      this.curDistrict = 0
      this.curCityName = ''
      this.curDistrictName = ''
    },
    onSendVcode() {},
    onGoRegist() {
      this.$router.push('/login')
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
    PostDetail
  },
  showDetail: false,
  curPost: {}
}
</script>

<style lang="scss">
.fulltime {
  text-align: left;
  .seach {
    height: auto;
    min-width: 1280px;
    width: 100%;
    background: #fff;
  }

  .seach-box {
    padding-top: 30px;
    width: 1280px;
    margin: 0 auto;
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
    .clear-search-select {
      font-size: 16px;
      line-height: 40px;
      color: #414a60;
      cursor: pointer;
    }
  }

  .city {
    width: 100%;
    display: flex;
    margin-top: 17px;
    border-bottom: 1px solid #eef0f5;
    .left {
      display: flex;
      flex: 1;
      white-space: nowrap;
      .next-icon {
        padding-left: 10px;
        padding-right: 10px;
      }
      .hotCity {
        display: flex;
        & > ul {
          flex: 1;
          font-size: 0;
          white-space: pre-wrap;
          word-break: break-all;
          &.collpase {
            height: 50px;
            overflow: hidden;
          }
          & > li {
            padding: 0 15px;
            display: inline-block;
            vertical-align: top;
            color: #414a60;
            cursor: pointer;
            font-size: 16px;
            line-height: 49px;
            &.active {
              color: #f06358;
            }
          }
        }
      }
    }
    .allCity {
      font-size: 16px;
      line-height: 49px;
      cursor: pointer;
    }
  }

  .city > div {
    // height: 49px;
    padding: 0 15px;
    // line-height: 49px;
    // float: left;
    // color: #414a60;
    // cursor: pointer;
    // font-size: 16px;
  }

  .city > div > div {
    line-height: 49px;
    float: left;
    font-size: 16px;
    color: #414a60;
  }

  .area {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #eef0f5;
    overflow: hidden;
    .all-district {
      &.active {
        color: #f06358;
      }
    }
  }

  .area > div:first-child {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 64px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }

  .area > ul {
    flex: 1;
    padding: 10px 0;
  }

  .area > ul li {
    float: left;
    line-height: 20px;
    height: 40px;
    text-align: center;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    &.active {
      color: #f06358;
    }
  }

  .option {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    .select-box-wrap {
      flex: 1;
      display: flex;
      .select-box {
        margin-right: 30px;
        width: 146px;
        .el-input__inner {
          border: none;
          color: #414a60;
        }
      }
    }
  }

  .part-main {
    width: 100%;
    min-width: 1280px;
    height: auto;
    background: #f3f5f6;
  }

  .part-main .content {
    display: flex;
    width: 1250px;
    overflow: hidden;
    margin: 0 auto;
  }

  .part-main .content .work-list {
    flex: 1;
    margin-right: 20px;
    margin-top: 38px;
    & > ul {
      background: #fff;
      & > li {
        position: relative;
        padding: 20px 30px 20px 40px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #9fa3b0;
        &:hover {
          & > .right {
            visibility: hidden;
            overflow: hidden;
          }
          & > .btns {
            display: block;
          }
        }
        & > .left {
          .title {
            display: flex;
            font-size: 22px;
            line-height: 42px;
            color: #333333;
            width: 260px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .color {
              margin-left: 5px;
              margin-right: 5px;
              color: #f06358ff;
            }
          }
          .subtitle {
            font-size: 14px;
            line-height: 34px;
            color: #9fa3b0;
            display: flex;
            & > span {
              display: block;
              margin-right: 10px;
              max-width: 110px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        & > .center {
          @extend .left;
          .title,
          .subtitle {
            justify-content: center;
            max-width: 260px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        & > .right {
          @extend .left;
          justify-content: flex-end;
          .title {
            align-items: center;
            max-width: 260px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            justify-content: flex-end;
            & > span {
              margin-right: 10px;
              max-width: 110px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .subtitle {
            justify-content: flex-end;
          }
          .point {
            width: 26px;
            height: 26px;
            background-color: #edbc4a;
            border-radius: 50%;
          }
        }
        & > .btns {
          display: none;
          position: absolute;
          top: 50%;
          right: 40px;
          transform: translateY(-50%);
          width: 150px;
          height: 50px;
          font-size: 22px;
          line-height: 50px;
          color: #fff;
          text-align: center;
          background: #f06358ff;
          z-index: 10;
          border-radius: 0;
          cursor: pointer;
        }
      }
    }
  }

  .right-regist {
    height: 0;
    overflow: hidden;
    width: 324px;
    height: auto;
    float: right;
    margin-top: 38px;
  }

  /* .right-regist>div {
    margin-bottom: 40px;
} */

  .right-regist > div:first-child {
    width: 100%;
    height: 450px;
    background: url(../assets/img/go_regist.png) no-repeat 0 0;
    background-size: 324px 450px;
    overflow: hidden;
  }

  .right-regist div:first-child > p:first-child {
    box-sizing: border-box;
    font-size: 22px;
    line-height: 22px;
    margin-top: 34px;
    margin-bottom: 42px;
    text-align: center;
    width: 100%;
    color: #fff;
  }

  .right-regist div:first-child > div:nth-child(2) {
    height: 55px;
    width: 292px;
    line-height: 55px;
    margin: 0 auto 40px;
    background: #fff;
  }

  .right-regist div:first-child > div:nth-child(2) > img:first-child {
    margin: 16px 18px;
    height: 24px;
    width: 16px;
    float: left;
  }

  .right-regist div:first-child > div:nth-child(2) > span:nth-child(2) {
    float: left;
    font-size: 14px;
    line-height: 55px;
    color: #414a60ff;
  }

  .right-regist div:first-child > div:nth-child(2) > img:nth-child(3) {
    height: 10px;
    width: 17px;
    float: left;
    margin: 23px 9px 0;
  }

  .right-regist div:first-child > div:nth-child(2) > input {
    width: 160px;
    float: left;
    height: 20px;
    font-size: 16px;
    margin: 16px 0;
    border: none;
  }

  .right-regist div:first-child > div:nth-child(3) {
    height: 55px;
    width: 292px;
    margin: 0 auto 40px;
    background: #fff;
  }

  #box {
    position: relative;
    width: 292px;
    height: 55px;
    margin: 0 auto;
    background: #f3f5f6;
    /* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2); */
  }

  .bgColor {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 55px;
    background-color: lightblue;
  }

  .slide-txt {
    position: absolute;
    width: 100%;
    height: 55px;
    line-height: 55px;
    font-size: 14px;
    color: #000;
    text-align: center;
    padding-left: 10px;
  }

  .slider {
    position: absolute;
    left: 0;
    top: 0;
    width: 63px;
    height: 55px;
    border: 1px solid #ccc;
    background: #fff;
    text-align: center;
    cursor: move;
  }

  .slider > img {
    height: 12px;
    margin-top: 22px;
  }

  .slider > i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .slider.active > i {
    color: green;
  }

  .right-regist div:first-child > div:nth-child(4) {
    height: 55px;
    width: 292px;
    margin: 40px auto;
    background: #fff;
    padding: 18px 15px;
  }

  .right-regist div:first-child > div:nth-child(4) img {
    height: 18px;
    width: 22px;
    float: left;
  }

  .right-regist div:first-child > div:nth-child(4) input {
    float: left;
    height: 18px;
    width: 110px;
    border: none;
    padding-left: 20px;
    outline: none;
  }

  .right-regist div:first-child > div:nth-child(4) div {
    float: left;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 110px;
    color: #f06358ff;
    font-size: 19px;
    border-left: 1px solid #e8e9ed;
  }

  .right-regist div:first-child > div:nth-child(5) {
    height: 55px;
    width: 292px;
    line-height: 55px;
    text-align: center;
    margin: 0 auto;
    font-size: 21px;
    color: #f06358ff;
    background: #fff;
  }

  .right-regist div:first-child > div:nth-child(6) {
    text-align: center;
    padding-left: 73px;
  }

  .right-regist div:first-child > div:nth-child(6) > input {
    height: 17px;
    width: 17px;
    background: #fff;
    float: left;
    margin-top: 22px;
  }

  .right-regist div:first-child > div:nth-child(6) > span {
    float: left;
    font-size: 16px;
    height: 18px;
    line-height: 18px;
    margin-top: 20px;
    color: #fff;
  }

  .upload {
    height: 96px;
    width: 100%;
    padding: 26px 39px;
    margin: 20px 0;
    background: #fff;
  }

  .upload > div {
    height: 100%;
    width: 100%;
    background: #f06358ff;
    font-size: 16px;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }

  .seen-work {
    width: 100%;
    height: auto;
    background: #fff;
    margin-bottom: 20px;
  }

  .seen-work div:first-child {
    border-bottom: 2px solid #eef0f5;
    font-size: 20px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    width: 100%;
    color: #f06358;
  }

  .seen-work ul {
    width: 100%;
    padding: 0 40px;
  }

  .seen-work ul li {
    height: 84px;
    width: 100%;
    border-bottom: 1px solid #eef0f5;
    padding: 18px 0;
  }

  .seen-work ul li:last-child {
    border: none;
  }

  .seen-work ul li p:first-child {
    font-size: 18px;
    height: 18px;
    line-height: 18px;
  }

  .seen-work ul li p:last-child {
    font-size: 16px;
    margin-top: 15px;
    color: #8d92a1;
  }

  .seen-work ul li p:first-child span {
    float: left;
  }

  .seen-work ul li p:first-child span:last-child {
    float: right;
    color: #f06358;
  }

  .gg {
    width: 100%;
    height: 209px;
  }
  .advert-img {
    margin-top: 20px;
  }

  .list-nav {
    width: 100%;
    height: 66px;
    background: #fff;
    border-bottom: 1px solid #f2f2f5;
    margin-bottom: 19px;
    text-align: center;
  }

  .list-nav .box {
    width: 410px;
    height: 66px;
    padding: 17px 0;
    margin: 0 auto;
  }

  .list-nav .box > div {
    float: left;
    width: 37px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin: 0 16px;
  }

  .list-nav .box > div:first-child,
  .list-nav .box > div:last-child {
    color: #e8e9ed;
    border: 1px solid #e8e9ed;
  }

  .list-nav .box > div:first-child {
    margin-left: 0;
  }

  .list-nav .box > div:last-child {
    margin-right: 0;
  }

  .proposal {
    height: 220px;
    width: 100%;
    background: #f3f5f6;
    overflow: hidden;
    padding-bottom: 50px;
  }

  .proposal .proposal-box {
    height: 170px;
    width: 1250px;
    padding: 26px 40px 0;
    margin: 0 auto;
    background: #fff;
  }

  .proposal .proposal-box > div:first-child {
    font-size: 18px;
    color: #414a60;
    line-height: 20px;
  }

  .proposal .proposal-box > div:nth-child(2) > div {
    float: left;
    padding-top: 24px;
    margin-right: 60px;
    width: 51px;
  }

  .proposal .proposal-box > div:nth-child(2) > div > img {
    height: 41px;
    width: 41px;
    display: block;
    margin: 0 auto 18px;
  }

  .proposal .proposal-box > div:nth-child(2) > div > p {
    text-align: center;
    color: #9398a6;
  }

  .proposal .proposal-box > div:nth-child(2) > div:nth-child(4) {
    height: 81px;
    width: auto;
    padding-top: 20px;
    float: right;
  }

  .proposal .proposal-box > div:nth-child(2) > div:nth-child(4) textarea {
    height: 81px;
    width: 607px;
    resize: none;
    margin-right: 39px;
    float: left;
    font-size: 17px;
    padding: 20px 14px;
    box-sizing: border-box;
  }

  .proposal .proposal-box > div:nth-child(2) > div:nth-child(4) div {
    height: 47px;
    width: 120px;
    background: #e8eaed;
    font-size: 20px;
    color: #fff;
    line-height: 47px;
    text-align: center;
    float: left;
    margin-top: 20px;
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
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>