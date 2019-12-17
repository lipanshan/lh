<template>
  <div class="news-wrap">
    <div class="banner"></div>
    <div class="news">
      <ul v-show="consultList.length">
        <li v-for="item in consultList" :key="item.content_id">
          <a class="box" target="_blank" :href="item.url">
            <img :src="item.pic" alt />
            <div class="info">
              <h2 class="title">{{item.title}}</h2>
              <p class="intro">{{item.description}}</p>
              <p class="time">{{item.create_time | filterTime}}</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="news-nav">
        <div @click="getMoreInfo">{{hasMore ? '查看更多>>' : '没有了'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getConsult } from '@/api/api'
const PAGE_SIZE = 10
export default {
  name: 'Consult',
  data() {
    return {
      consultList: [],
      pageData: {
        page: 1,
        number: PAGE_SIZE,
        count_num: 0
      },
      hasMore: true
    }
  },
  created() {
    this.initConstultList()
  },
  methods: {
    initConstultList(pageNum = 1) {
      getConsult({ page: pageNum, number: PAGE_SIZE }).then(res => {
        console.log(res)
        if (res.code === 200) {
          if (pageNum === 1) {
            this.consultList = res.data // 添加第一页
            this.pageData.page = res.pagelist.page
            this.pageData.count_num = res.pagelist.count_num
          } else {
            this.consultList.push(...res.data) // 追加更多页
          }
        } else if (res.code === 40001) {
          this.hasMore = false
        }
      })
    },
    getMoreInfo() {
      if (!this.hasMore) {
        return
      }
      this.pageData.page = this.pageData.page + 1
      this.initConstultList(this.pageData.page)
    }
  },
  filters: {
    filterTime(num) {
      const formatTime = time => {
        return `00${time}`.slice(`${time}`.length)
      }
      const time = new Date(num * 1000)
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      const h = time.getHours()
      const m = time.getMinutes()
      const s = time.getSeconds()
      return `${year}-${formatTime(month)}-${formatTime(day)} ${formatTime(
        h
      )}:${formatTime(m)}:${formatTime(s)}`
    }
  }
}
</script>

<style lang="scss">
.news-wrap {
  min-width: 1280px;
  width: 100%;
  background: #f3f5f6;
  padding-bottom: 48px;
  .banner {
    height: 496px;
    width: 100%;
    background: url('../assets/img/banner-news.png') no-repeat 0 -60px;
    background: cover;
    position: relative;
  }
}
.news {
  width: 1250px;
  margin: 0 auto 48px;
  text-align: left;
  & > ul {
    width: 100%;
    height: auto;
    padding: 20px 100px;
    background: #fff;
    .box {
      display: flex;
      border-bottom: 1px solid #d6d6d6;
      text-decoration: none;
      & > img {
        margin-top: 30px;
        margin-bottom: 30px;
        margin-right: 52px;
        width: 300px;
        height: 166px;
        background: url(../assets/img/news.png) no-repeat 0 0;
        background-size: 300px 166px;
      }
      & > .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          padding-top: 30px;
          font-size: 20px;
          line-height: 24px;
          color: #414a60;
        }
        .intro {
          margin-top: 10px;
          flex: 1;
          overflow: hidden;
          font-size: 14px;
          line-height: 24px;
          color: #666666;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .time {
          font-size: 14px;
          line-height: 24px;
          color: #999999;
          padding-bottom: 30px;
        }
      }
    }
  }
  .news-nav {
    width: 1250px;
    height: auto;
    background: #fff;
    padding-bottom: 33px;
    overflow: hidden;
  }
  .news-nav:hover {
    cursor: pointer;
  }
  .news-nav > div {
    width: 1050px;
    height: 78px;
    text-align: center;
    line-height: 78px;
    font-size: 20px;
    margin: 0 auto;
    color: #bbb;
    border: 1px solid #d6d6d6;
  }
}
</style>