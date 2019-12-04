<template>
  <div>
    <div class="banner">
      <div class="slogen">你身边可靠的职业发展伙伴</div>
      <div class="seach">
        <input type="text" />
        <div class="confirm">搜索</div>
      </div>
    </div>
    <div class="main">
      <div class="main-box">
        <div class="part-time">
          <div>
            <p>白领兼职</p>
            <div>
              <div>热招兼职</div>
              <ul>
                <li style="float: left;" v-for="(x, index) in hotWork" :key="index">{{x.class_name}}</li>
              </ul>
              <div>查看更多兼职></div>
            </div>
          </div>
          <div>
            <div v-for="(x, index) in j_work" :key="index" :data-id="x.id">
              <p>
                <span>{{x.job_title}}</span>
                <span>每月</span>
                <span>{{x.salary_above}}k-{{x.salary_below}}k</span>
              </p>
              <p>
                <span>{{x.city}}</span> |
                <span>{{x.work_year|year}}</span> |
                <span>{{x.education|education}}</span>
              </p>
              <p>{{x.description}}</p>
            </div>
          </div>
        </div>
        <div class="all-time part-time">
          <div>
            <p>高薪全职</p>
            <div>
              <div>热招职位</div>
              <ul>
                <li style="float: left;" v-for="(x, index) in hotWork" :key="index">{{x.class_name}}</li>
              </ul>
              <router-link to="/" tag="div">查看更多兼职></router-link>
              <div @click="jump_j">></div>
            </div>
          </div>
          <div>
            <div v-for="(x, index) in q_work" :key="index" :data-id="x.id">
              <p>
                <span>{{x.job_title}}</span>
                <span>每月</span>
                <span>{{x.salary_above}}k-{{x.salary_below}}k</span>
              </p>
              <p>
                <span>{{x.city}}</span> |
                <span>{{x.work_year|year}}</span> |
                <span>{{x.education|education}}</span>
              </p>
              <p>{{x.description}}</p>
            </div>
            <!-- <div>
                            <p>
                                <span>HRD\HRVP</span>
                                <span>每月</span>
                                <span> 5k-8k</span>
                            </p>
                            <p>
                                <span>北京</span> |
                                <span>3-5年</span> |
                                <span>本科</span>
                            </p>
                            <p>负责各省、市营销团队基层及管理层招聘，搭建高效...</p>
                        </div>
                        <div>
                            <p>
                                <span>HRD\HRVP</span>
                                <span>每月</span>
                                <span> 5k-8k</span>
                            </p>
                            <p>
                                <span>北京</span> |
                                <span>3-5年</span> |
                                <span>本科</span>
                            </p>
                            <p>负责各省、市营销团队基层及管理层招聘，搭建高效...</p>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="advert">
      <div class="advert-box">
        <img src="../assets/img/1.png" alt />
        <img src="../assets/img/4.png" alt />
        <img src="../assets/img/2.png" alt />
        <img src="../assets/img/3.png" alt />
        <img src="../assets/img/5.png" alt />
        <img src="../assets/img/5.png" alt />
        <img src="../assets/img/5.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
const url = 'http://www.wzgwebsite.top/'
export default {
  name: 'HomePage',
  data() {
    return {
      message: 'Hello Vue!',
      city: '',
      c: null,
      j_work: null,
      q_work: null,
      hotWork: null
    }
  },
  created() {
    const that = this
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
      url: url + 'api/apidate/full_time?status=1',
      dataType: 'json',
      type: 'get',
      success: function(res) {
        console.log(res)
        if (res.code == 200) {
          that.q_work = res.data
        }
      }
    })
    $.ajax({
      url: url + 'api/apidate/time_job?status=1',
      dataType: 'json',
      type: 'get',
      success: function(res) {
        if (res.code == 200) {
          that.j_work = res.data
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
    },
    login: function(e) {
      window.location.href = 'page/login/login.html'
    },
    jump_lt: function(e) {
      window.location.href = 'page/headhunting.html'
    },
    jump_app: function(e) {
      window.location.href = 'page/download.html'
    },
    jump_news: function(e) {
      window.location.href = 'page/news.html'
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

<style>
</style>