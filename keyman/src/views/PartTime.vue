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
  methods: {
    jump_j: function() {
      window.location.href = 'page/part.html'
    },
    jump_q: function() {
      window.location.href = 'page/allTime.html'
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/part.css';
</style>