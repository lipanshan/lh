<template>
  <div class="head-hunting">
    <div class="banner">
      <img src="../assets/img/banner-headhunting.png" alt />
      <p>值得信赖的职业发展伙伴</p>
    </div>
    <div v-show="list1.length" class="content">
      <div
        v-for="(item, index) in list1"
        :key="item.member_id"
        :class="{'right-c': index % 2, 'left-c': !(index % 2)}"
      >
        <img v-if="!(index % 2)" :src="item.headimgurl" alt />
        <div>
          <div class="title-top">
            <!-- 最多展示 5条数据 -->
            <p>top职位</p>
            <p
              v-for="(li, i) in item.datalist.slice(0, 5)"
              :key="i"
            >{{li.province}} {{li.company_name}} {{li.salary_above}}k-{{li.salary_below}}k</p>
            <!-- <p>城市HRVP 地产10强 500万年薪</p> -->
            <div v-if="!(index % 2)" class="name">{{item.nickname}}</div>
          </div>
          <div class="title-hh">
            <!-- 最多展示 5条数据 -->
            <p>猎中职位</p>
            <p v-for="(li, i) in item.datalist.slice(0, 5)" :key="i">
              <strong
                class="ellipsis"
              >{{li.province}} {{li.company_name}} {{li.salary_above}}k-{{li.salary_below}}k</strong>
              <span>砸简历</span>
            </p>
            <div v-if="index % 2" class="name">{{item.nickname}}</div>
          </div>
        </div>
        <img v-if="index % 2" :src="item.headimgurl" alt />
      </div>
    </div>
    <div v-show="list2.length" class="list-c">
      <div v-for="(item, index) in list2" :key="index">
        <div class="left" @click="onSeeUploadResume(item[0])">
          <img :src="item[0].headimgurl" alt />
          <div>
            <p>{{item[0].nickname}}</p>
            <p>{{item[0].profile}}</p>
            <p>{{item[0].province}}|{{item[0].company_name}}|{{item[0].class_name}}</p>
          </div>
        </div>
        <!-- 用于判断一行只有1个 的情况 -->
        <div class="right" v-if="item[1]" @click="onSeeUploadResume(item[1])">
          <img :src="item[1].headimgurl" alt />
          <div>
            <p>{{item[1].nickname}}</p>
            <p>{{item[1].profile}}</p>
            <p>{{item[1].province}}|{{item[1].company_name}}|{{item[1].class_name}}</p>
          </div>
        </div>
        <div v-else class="visibleH"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHHList1, getHHList2, publicGetResumeInfo } from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'HeadHunt',
  data() {
    return {
      list1: [
        // {
        //   member_id: 1,
        //   headimgurl: '/uploads/admin/1563244624666.jpg',
        //   nickname: '张三',
        //   datalist: [
        //     {
        //       province: '北京市',
        //       salary_above: 5,
        //       salary_below: 20,
        //       company_name: '',
        //       class_name: '游戏'
        //     },
        //     {
        //       province: '北京市',
        //       salary_above: 5,
        //       salary_below: 20,
        //       company_name: '',
        //       class_name: '游戏'
        //     }
        //   ]
        // }
      ],
      list2: [
        // [
        //   {
        //     member_id: 4,
        //     headimgurl: '/uploads/admin/15632469878049.jpg',
        //     nickname: null,
        //     profile: null
        //   },
        //   {
        //     member_id: 4,
        //     headimgurl: '/uploads/admin/15632469878049.jpg',
        //     nickname: null,
        //     profile: null
        //   }
        // ]
      ]
    }
  },
  created() {
    this.initList1()
    this.initList2()
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    initList1() {
      getHHList1({}).then(res => {
        if (res.code === 200) {
          this.list1 = res.data
        }
      })
    },
    initList2() {
      getHHList2({}).then(res => {
        const list = []
        if (res.code === 200) {
          for (let i = 0; i < res.data.length - 1; i += 2) {
            if (res.data[i]) {
              list.push([res.data[i]])
            }
            if (res.data[i + 1]) {
              list[list.length - 1].push(res.data[i + 1])
            }
          }
          this.list2 = list
        }
      })
    },
    onSeeUploadResume(data) {
      if (!this.getToken) {
        this.$router.push('/login')
        return
      }
      publicGetResumeInfo({
        member_id: data.member_id,
        token: this.getToken
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          window.open(data.data.profile_file_url)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.head-hunting {
  width: 100%;
  min-width: 1280px;
  .banner {
    height: 480px;
    width: 100%;
    background-color: #fff;
    position: relative;
  }

  .banner > img {
    height: 160px;
    width: 100%;
    margin-top: -8px;
  }

  .banner > p {
    position: absolute;
    text-align: center;
    font-size: 47px;
    top: 40px;
    width: 100%;
    color: #fff;
  }

  .content {
    // max-width: 1462px;
    // margin-left: auto;
    // margin-right: auto;
    // height: 1225px;
    width: 1200px;
    margin: 0 auto;
    padding-top: 10px;
    position: relative;
    z-index: 9999;
    margin-top: -86px;
  }

  .content > div {
    padding-left: 90px;
    padding-right: 90px;
    display: flex;
    min-height: 246px;
    margin-bottom: 124px;
    background: #ebfcff;
    border-radius: 6px;
    box-shadow: 0 0 10px #a5a5a5;
  }

  .content > .left-c img {
    flex: 0 0 230px;
    height: 310px;
    width: 230px;
    margin-top: -98px;
    margin-right: 34px;
    background: url(../assets/img/headhunting-el.jpg) no-repeat center center;
    background-size: 230px 310px;
  }

  .content > .right-c img {
    flex: 0 0 230px;
    height: 310px;
    width: 230px;
    margin-left: 24px;
    margin-top: -98px;
    background: url(../assets/img/headhunting-el.jpg) no-repeat center center;
    background-size: 230px 310px;
  }

  .content > .left-c > div,
  .content > .right-c > div {
    flex: 1;
    display: flex;
    width: auto;
    justify-content: space-between;
    .title-top {
      max-width: 300px;
    }
  }

  .content > .left-c > div > div,
  .content > .right-c > div > div {
    max-width: 400px;
    padding-right: 10px;
    text-align: left;
    white-space: nowrap;
    position: relative;
  }

  .content > .left-c > div > div:first-child,
  .content > .right-c > div > div:first-child {
    position: relative;
  }

  .content > .left-c > div > div > p:first-child,
  .content > .right-c > div > div > p:first-child {
    padding-top: 12px;
    font-size: 24px;
    font-weight: 700;
    line-height: 48px;
    color: #333;
  }

  .content > .left-c > div > div > p,
  .content > .right-c > div > div > p {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
    font-size: 16px;
    color: #9aa0a2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content > .left-c > div > div > p > span,
  .content > .right-c > div > div > p > span {
    width: 80px;
    height: 20px;
    background: #f06358;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
  }
  .content {
    .ellipsis {
      flex: 1;
      margin-right: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .content .left-c .name {
    position: absolute;
    top: -60px;
    left: 0;
    font-size: 30px;
    font-weight: 700;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .content .right-c .name {
    position: absolute;
    top: -60px;
    right: 0;
    font-size: 30px;
    font-weight: 700;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-c {
    // max-width: 1462px;
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    margin: 0 auto;
    margin-top: 82px;
  }
  .list-c > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
    & > .left {
      margin-right: 36px;
    }
  }
  .list-c > div > .right,
  .list-c > div > .left {
    display: flex;
    flex: 1;
    min-height: 300px;
    padding: 20px;
    background: #ebfcff;
    align-items: center;
    text-align: left;
    border-radius: 6px;
    box-shadow: 0 0 10px #a5a5a5;
  }
  .list-c > div > .visibleH {
    flex: 1;
    height: 366px;
    padding: 23px;
    visibility: hidden;
  }

  .list-c > div img {
    height: 262px;
    width: 196px;
    float: left;
    margin-right: 66px;
    background: url(../assets/img/headhunting-el.jpg) no-repeat center center;
    background-size: 196px 262px;
  }
  .list-c > div > div p {
    max-width: 260px;
    font-size: 20px;
    line-height: 42px;
    color: #9aa0a2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list-c > div > div p:first-child {
    color: #333;
    font-size: 24px;
    line-height: 46px;
  }
}
</style>