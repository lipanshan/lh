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
              <li v-for="(x, index) in hotWork" :key="index">{{x.class_name}}</li>
            </ul>
          </div>
        </div>
        <div>
          <div>地区：</div>
          <div>
            <ul>
              <li>不限</li>
              <li v-for="(x, index) in area" :key="index">{{x.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="check-type">
        <div class="left">结算方式</div>
        <div class="left">性别要求</div>
        <div class="left">
          <span></span> 官方自营
        </div>
        <div class="right">工资最高</div>
        <div class="right">最新发布</div>
        <div class="right">推荐排序</div>
      </div>

      <ul class="work-list">
        <li>
          <div>
            <p>陌陌电台招音频女主播（</p>
            <p>
              <span>工作时间：长期可做</span>
              <span>工作类型：主播</span>
            </p>
            <p>
              <span>工作地点：北京</span>
              <span>招聘人数：9999人</span>
            </p>
          </div>
          <div>
            <p>最酷</p>
            <p>
              <span>互联网</span> |
              <span>A轮</span> |
              <span>20-99人</span>
            </p>
          </div>
          <div>
            <p>
              <span>200</span>
              <span>元/天</span>
              <span>月结</span>
            </p>
            <div>报名参加</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
const url = 'http://www.wzgwebsite.top/'
export default {
  name: 'PartTime',
  data() {
    return {
      data: null,
      area: null,
      hotWork: null
    }
  },
  mounted: function() {
    var that = this

    $.ajax({
      url: url + 'api/apidate/time_job_list',
      dataType: 'json',
      type: 'post',
      data: {
        status: 1
      },
      success: function(res) {
        if (res.code == 200) {
          that.data = res.data
        }
      }
    })
    $.ajax({
      url: url + 'api/apidate/hot_job',
      dataType: 'json',
      type: 'post',
      data: {
        num: 10,
        status: 1
      },
      success: function(res) {
        console.log(res)
        if (res.code == 200) {
          that.hotWork = res.data
        }
      }
    })
    $.ajax({
      url: url + 'api/apidate/hot_area',
      dataType: 'json',
      type: 'post',
      data: {
        status: 1,
        num: 20
      },
      success: function(res) {
        if (res.code == 200) {
          that.area = res.data
        }
      }
    })
  },
  methods: {},
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
    &:hover {
      color: #f06358;
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
  }

  .work-list li > div:first-child > p:nth-child(2) > span,
  .work-list li > div:first-child > p:nth-child(3) > span {
    font-size: 15px;
    color: #707070;
    float: left;
    width: 260px;
    line-height: 15px;
    margin-bottom: 10px;
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
  }

  .work-list li > div:nth-child(2) p:last-child {
    height: 14px;
    color: #9fa3b0;
    margin-top: 10px;
    width: 160px;
    text-align: center;
  }

  .work-list li > div:nth-child(2) p:last-child span {
    font-size: 14px;
    color: #9fa3b0;
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
  }
  .work-list li > div:last-child p span {
    color: #999;
    font-size: 15px;
  }
  .work-list li > div:last-child p span:last-child {
    padding-left: 20px;
  }

  .work-list li > div:last-child p:first-child span:first-child {
    color: #f06358;
    font-size: 20px;
    line-height: 20px;
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
}
</style>