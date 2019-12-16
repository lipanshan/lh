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
          <div class="clear-search-select">清空条件选项</div>
        </div>
      </div>
    </div>
    <div class="part-main">
      <div class="content">
        <div class="work-list">
          <ul>
            <li>
              <div>
                <p>
                  <span>数据挖掘</span>
                  <span>20-40k 13薪</span>
                </p>
                <p>
                  <span>北京 海淀区 上地</span>
                  <span>3-5年</span>
                  <span>本科</span>
                </p>
              </div>
              <div>
                <p>醉库</p>
                <p>
                  <span>互联网</span>
                  <span>A轮</span>
                  <span>20-99人</span>
                </p>
              </div>
              <div>
                <p>
                  <img src alt />
                  <span>王先生</span> |
                  <span>研发总监</span>
                </p>
                <p>发于11月4号</p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>数据挖掘</span>
                  <span>20-40k 13薪</span>
                </p>
                <p>
                  <span>北京 海淀区 上地</span>
                  <span>3-5年</span>
                  <span>本科</span>
                </p>
              </div>
              <div>
                <p>醉库</p>
                <p>
                  <span>互联网</span>
                  <span>A轮</span>
                  <span>20-99人</span>
                </p>
              </div>
              <div>
                <p>
                  <img src alt />
                  <span>王先生</span> |
                  <span>研发总监</span>
                </p>
                <p>发于11月4号</p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>数据挖掘</span>
                  <span>20-40k 13薪</span>
                </p>
                <p>
                  <span>北京 海淀区 上地</span>
                  <span>3-5年</span>
                  <span>本科</span>
                </p>
              </div>
              <div>
                <p>醉库</p>
                <p>
                  <span>互联网</span>
                  <span>A轮</span>
                  <span>20-99人</span>
                </p>
              </div>
              <div>
                <p>
                  <img src alt />
                  <span>王先生</span> |
                  <span>研发总监</span>
                </p>
                <p>发于11月4号</p>
              </div>
            </li>
          </ul>
          <div class="list-nav">
            <div class="box">
              <div><</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>...</div>
              <div>></div>
            </div>
          </div>
        </div>
        <div class="right-regist">
          <div>
            <p>各大行业职位任你选</p>
            <div>
              <img src="../assets/img/mobile.png" alt />
              <span>+86</span>
              <img src="../assets/img/down2.png" alt />
              <input type="text" placeholder="请输入" />
            </div>
            <div id="box" onselectstart="return false;">
              <div class="bgColor"></div>
              <div class="txt">请按住滑块, 拖动到最右边</div>
              <!--给i标签添加上相应字体图标的类名即可-->
              <div class="slider">
                <img src="../assets/img/next.png" alt />
              </div>
            </div>
            <div>
              <img src="../assets/img/email.png" alt />
              <input type="text" placeholder="请输入" />
              <div>发送验证码</div>
            </div>
            <div>登陆/注册</div>
            <div>
              <input type="checkbox" style="background: #fff;" />
              <span>我已同意用户协议及隐私政策</span>
            </div>
          </div>
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
          <img class="gg" src="../assets/img/5.png" alt />
          <img class="gg" style="margin-bottom: 20px" src="../assets/img/5.png" alt />
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
  </div>
</template>

<script>
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
      curDistrictName: ''
    }
  },
  created() {
    this.initAddressList()
    this.initIndustryList()
    this.initPostList()
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
    initAddressList() {
      getAllAddress().then(res => {
        if (res.code === 200) {
          formatterAddressData(res.data)
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
      this.search.city.splice(0, this.search.city.length, data.cid)
    },
    onSelectDistrict(data) {
      this.curDistrict = data.cid
      this.curDistrictName = data.name
      if (this.search.city.length >= 1) {
        this.search.city.splice(1, 1, data.cid)
      }
    },
    onChangeCity(data) {
      console.log(data)
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
      if (this.search.city.length > 1) {
        sendData.city = this.search.city[0]
        sendData.district = this.search.city[1]
      } else if (this.search.city.length === 1) {
        sendData.city = this.search.city[0]
      }
      searchAllJob(sendData).then(res => {
        console.log(res)
        if (res.code === 200) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.fulltime {
  text-align: left;
  .seach {
    height: auto;
    min-width: 1280px;
    width: 100%;
  }

  .seach-box {
    padding-top: 30px;
    width: 1280px;
    margin: 0 auto;
    .search-row {
      width: 1150px;
    }
    & > .el-input {
      border-color: #f06358;
      .el-input-group__prepend {
        position: relative;
        vertical-align: top;
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
    height: auto;
    background: #f3f5f6;
  }

  .part-main .content {
    width: 1250px;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
  }

  .part-main .content .work-list {
    width: 860px;
    height: auto;
    float: left;
    margin-top: 38px;
  }

  .part-main .content .work-list li {
    height: 113px;
    width: 100%;
    border-bottom: 1px solid #f2f2f5;
    background: #fff;
    padding: 0 40px;
    cursor: pointer;
  }

  .part-main .content .work-list li > div {
    float: left;
    width: 33.33%;
    height: 100%;
    padding: 34px 0 27px;
  }

  .part-main .content .work-list li > div:nth-child(3) {
    text-align: right;
  }

  .part-main .content .work-list li > div:nth-child(2) {
    text-align: center;
  }

  .part-main .content .work-list li > div:nth-child(3) p:nth-child(1) {
    color: #9fa3b0;
  }

  .part-main .content .work-list li > div:nth-child(3) p:nth-child(1) span {
    color: #414a60;
  }

  .part-main .content .work-list li > div p {
    font-size: 17px;
    height: 26px;
    line-height: 26px;
  }

  .part-main .content .work-list li > div:first-child p:first-child {
    font-size: 20px;
    font-size: #333;
  }

  .part-main
    .content
    .work-list
    li
    > div:first-child
    p:first-child
    span:nth-child(2) {
    color: #f06358;
    margin-left: 10px;
  }

  .part-main .content .work-list li > div p:nth-child(2),
  .part-main .content .work-list li > div p:nth-child(2) > span {
    font-size: 14px;
    color: #9fa3b0;
  }

  .right-regist {
    width: 370px;
    height: auto;
    float: right;
    margin-top: 38px;
  }

  /* .right-regist>div {
    margin-bottom: 40px;
} */

  .right-regist > div:first-child {
    width: 100%;
    height: 513px;
    background: #f06358ff;
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

  .txt {
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

  .list-nav {
    width: 100%;
    height: 66px;
    background: #fff;
    border-bottom: 1px solid #f2f2f5;
    margin-bottom: 19px;
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
}
</style>