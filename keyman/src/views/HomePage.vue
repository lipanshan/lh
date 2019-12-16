<template>
  <div class="home-page">
    <div class="banner">
      <div class="context">
        <div class="slogen">你身边可靠的职业发展伙伴</div>
        <div class="seach">
          <input type="text" />
          <div class="confirm">搜索</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-box">
        <div class="part-time">
          <div>
            <p>白领兼职</p>
            <div class="subtitle-wrap">
              <div class="left-babel">
                <div>热招兼职</div>
                <ul>
                  <li v-for="(x, index) in hotWork" :key="index">{{x.class_name}}</li>
                </ul>
              </div>
              <div @click="jump_j">查看更多兼职></div>
            </div>
          </div>
          <div class="post-list" v-show="j_work.length">
            <div class="post-item" v-for="(x, index) in j_work" :key="index" :data-id="x.id">
              <p>
                <span class="name">{{x.job_title}}</span>
                <span class="money">{{x.salary_above}}k-{{x.salary_below}}k</span>
                <span class="month">每月</span>
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
            <div class="subtitle-wrap">
              <div class="left-babel">
                <div>热招职位</div>
                <ul>
                  <li v-for="(x, index) in hotWork" :key="index">{{x.class_name}}</li>
                </ul>
              </div>
              <div @click="jump_q">查看更多全职></div>
            </div>
          </div>
          <div class="post-list" v-show="q_work.length">
            <div class="post-item" v-for="(x, index) in q_work" :key="index" :data-id="x.id">
              <p>
                <span class="name">{{x.job_title}}</span>
                <span class="money">{{x.salary_above}}k-{{x.salary_below}}k</span>
                <span class="month">每月</span>
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
        <div class="img-row">
          <div class="img-wrap order-2">
            <img src="../assets/img/1.png" alt />
          </div>
          <div class="img-wrap order-1">
            <img src="../assets/img/4.png" alt />
          </div>
        </div>
        <div class="img-row">
          <div class="img-wrap order-2">
            <img src="../assets/img/2.png" alt />
          </div>
          <div class="img-wrap order-1">
            <img src="../assets/img/3.png" alt />
          </div>
        </div>
        <div class="img-row">
          <div class="img-wrap order-1">
            <img src="../assets/img/5.png" alt />
          </div>
          <div class="img-wrap order-1">
            <img src="../assets/img/5.png" alt />
          </div>
          <div class="img-wrap order-1">
            <img src="../assets/img/5.png" alt />
          </div>
        </div>
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
      j_work: [],
      q_work: [],
      hotWork: []
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
    jump_j() {
      this.$router.push({
        path: '/parttime'
      })
    },
    jump_q() {
      this.$router.push({
        path: '/fulltime'
      })
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

<style lang="scss">
.home-page {
  background: #f3f5f6;
  .banner {
    position: relative;
    height: 0;
    padding-top: 32.7%;
    width: 100%;
    min-width: 1280px;
    background: url('../assets/img/banner.png') no-repeat;
    background-size: cover;
    .context {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 10;
    }
  }

  .banner .slogen {
    font-size: 70px;
    color: #fff;
    text-align: center;
  }

  .banner .seach {
    margin-top: 70px;
    width: 850px;
    height: 70px;
  }

  .banner .seach input {
    width: 708px;
    float: left;
    height: 70px;
    background: #fff;
    border: none;
    box-sizing: border-box;
    font-size: 20px;
    padding-left: 27px;
  }

  .banner .seach .confirm {
    width: 140px;
    background: #f06358;
    text-align: center;
    line-height: 70px;
    height: 70px;
    font-size: 20px;
    color: #fff;
    float: left;
    cursor: pointer;
  }

  .main {
    margin: 0 auto;
    width: 1280px;
    background: #f3f5f6;
    overflow: hidden;
    padding-top: 43px;
  }
  .main-box > .part-time {
    text-align: left;
    background: #fff;
  }

  .main-box > .part-time > div {
    // height: 136px;
    // width: 100%;
  }

  .main-box > .part-time > div:first-child {
    padding: 30px 30px 21px;
    border: 1px solid #ebebeb;
  }

  .main-box > .part-time > div:first-child > p:first-child {
    font-size: 42px;
    line-height: 42px;
  }
  .main-box > .part-time > div .subtitle-wrap {
    display: flex;
    justify-content: space-between;
    .left-babel {
      flex: 1;
      display: flex;
      & > div {
        font-size: 20px;
        line-height: 30px;
      }
      & > ul {
        margin-left: 78px;
        font-size: 0;
        flex: 1;
        color: #afb4b6;
        & > li {
          display: inline-block;
          vertical-align: top;
          margin-right: 20px;
          font-size: 18px;
          line-height: 30px;
          word-break: break-all;
          white-space: pre-wrap;
        }
      }
    }
    & > div {
      margin-top: 10px;
      font-size: 14px;
      line-height: 30px;
      color: #f06358;
      cursor: pointer;
    }
  }
  .main-box > .part-time > div:first-child > div:nth-child(2) {
    display: flex;
    margin-top: 27px;
  }
  .main-box
    > .part-time
    > div:first-child
    > div:nth-child(2)
    > div:nth-child(3) {
    float: right;
    font-size: 14px;
    line-height: 30px;
    color: #fd877d;
    cursor: pointer;
  }

  .main-box > .part-time .post-list {
    border-bottom: 1px solid #ebebeb;
    font-size: 0;
    & > .post-item {
      width: 426px;
      display: inline-block;
      vertical-align: top;
      padding: 10px 0;
      font-size: 18px;
      border-right: 1px solid #ebebeb;
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      & > p {
        display: flex;
        .name {
          flex: 1;
          font-size: 26px;
          line-height: 40px;
          color: #333;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .money {
          color: #fd877d;
          float: right;
          font-size: 26px;
          // font-weight: 600;
        }
        .month {
          padding-top: 10px;
          font-size: 16px;
          line-height: 30px;
          margin-left: 10px;
          color: #fd877d;
        }
      }
    }
  }

  .main-box > .part-time > div:nth-child(2) > div:hover,
  .main-box > .part-time > div:nth-child(3) > div:hover {
    cursor: pointer;
    box-shadow: 0 0 5px rgba(60, 61, 62, 0.3);
  }

  .main-box > .part-time > div:nth-child(2) > div:last-child,
  .main-box > .part-time > div:nth-child(3) > div:last-child {
    border: none;
  }

  .main-box > .part-time > div:nth-child(2) > div > p,
  .main-box > .part-time > div:nth-child(3) > div > p {
    line-height: 45px;
    padding: 0 27px;
  }

  .main-box > .part-time > div:nth-child(2) > div > p:first-child,
  .main-box > .part-time > div:nth-child(3) > div > p:first-child {
    font-size: 24px;
  }

  .main-box > .part-time > div:nth-child(2) > div > p:nth-child(2) span,
  .main-box > .part-time > div:nth-child(2) > div > p:nth-child(3) span,
  .main-box > .part-time > div:nth-child(2) > div p,
  .main-box > .part-time > div:nth-child(3) > div > p:nth-child(2) span,
  .main-box > .part-time > div:nth-child(3) > div > p:nth-child(3) span,
  .main-box > .part-time > div:nth-child(3) > div p {
    font-size: 18px;
    color: #afb4b6;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .main-box
    > .all-time
    > div:nth-child(2)
    > div
    > p:first-child
    > span:nth-child(2),
  .main-box
    > .all-time
    > div:nth-child(3)
    > div
    > p:first-child
    > span:nth-child(2) {
    font-size: 24px;
  }

  .all-time {
    margin-top: 42px;
    margin-bottom: 34px;
  }

  .advert {
    // display: none;
    width: 100%;
    min-width: 1280px;
    height: auto;
    background: #f3f5f6;
    margin-bottom: 10px;
  }
  .advert-box {
    & > .img-row {
      display: flex;
      & > .img-wrap {
        margin: 2px;
        display: block;
        flex: 1;
        &.order-1 {
          flex: 1;
        }
        &.order-2 {
          flex: 2;
        }
        & > img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // .advert-box > img:first-child {
  //   width: 973px;
  //   height: 422px;
  // }
  // .advert-box > img:nth-child(2) {
  //   height: 485px;
  //   height: 422px;
  // }
  // .advert-box > img:nth-child(3) {
  //   height: 973px;
  //   height: 209px;
  // }
  // .advert-box > img:nth-child(4) {
  //   height: 485px;
  //   height: 209px;
  // }
  // .advert-box > img:nth-child(5),
  // .advert-box > img:nth-child(5),
  // .advert-box > img:nth-child(5) {
  //   height: 485px;
  //   height: 209px;
  // }
}
</style>