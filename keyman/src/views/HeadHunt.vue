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
          <div>
            <p>top职位</p>
            <p v-for="(li, i) in item.datalist" :key="i">
              {{li.province}} {{li.company_name}} {{li.salary_above}}k-{{li.salary_below}}k
            </p>
            <!-- <p>城市HRVP 地产10强 500万年薪</p> -->
            <div v-if="!(index % 2)" class="name">{{item.nickname}}</div>
          </div>
          <div>
            <p>猎中职位</p>
            <p v-for="(li, i) in item.datalist" :key="i">
              {{li.province}} {{li.company_name}} {{li.salary_above}}k-{{li.salary_below}}k
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
        <div class="left">
          <img :src="item[0].headimgurl" alt />
          <div>
            <p>{{item[0].nickname}}</p>
            <p>{{item[0].profile}}</p>
            <!-- <p>行业|行业|行业</p> -->
          </div>
        </div>
        <!-- 用于判断一行只有1个 的情况 -->
        <div class="right" v-if="item[1]">
          <img :src="item[1].headimgurl" alt />
          <div>
            <p>{{item[1].nickname}}</p>
            <p>{{item[1].profile}}</p>
          </div>
        </div>
        <div v-else class="visibleH"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHHList1, getHHList2 } from '@/api/api'
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
    max-width: 1462px;
    margin-left: auto;
    margin-right: auto;
    height: 1225px;
    margin: 0 auto;
    padding-top: 10px;
    position: relative;
    z-index: 9999;
    margin-top: -86px;
  }

  .content > div {
    padding-left: 114px;
    padding-right: 114px;
    display: flex;
    height: 300px;
    margin-bottom: 150px;
    background: #ebfcff;
    border-radius: 10px;
    box-shadow: 0 0 10px #a5a5a5;
  }

  .content > .left-c img {
    height: 370px;
    width: 270px;
    margin-top: -115px;
    margin-right: 44px;
    background: url(../assets/img/headhunting-el.png) no-repeat center center;
    background-size: 270px 370px;
  }

  .content > .right-c img {
    height: 370px;
    width: 270px;
    margin-top: -115px;
    background: url(../assets/img/headhunting-el.png) no-repeat center center;
    background-size: 270px 370px;
  }

  .content > .left-c > div,
  .content > .right-c > div {
    flex: 1;
    display: flex;
    width: auto;
    height: 300px;
    justify-content: space-around;
  }

  .content > .left-c > div > div,
  .content > .right-c > div > div {
    text-align: left;
    white-space: nowrap;
    padding-top: 10px;
    position: relative;
  }

  .content > .left-c > div > div:first-child,
  .content > .right-c > div > div:first-child {
    position: relative;
  }

  .content > .left-c > div > div > p:first-child,
  .content > .right-c > div > div > p:first-child {
    font-size: 24px;
    font-weight: 700;
    line-height: 64px;
    color: #333;
  }

  .content > .left-c > div > div > p,
  .content > .right-c > div > div > p {
    line-height: 38px;
    font-size: 20px;
    color: #9aa0a2;
  }

  .content > .left-c > div > div > p > span,
  .content > .right-c > div > div > p > span {
    width: 80px;
    height: 20px;
    float: right;
    background: #f06358;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
    margin-left: 100px;
  }

  .content .left-c .name {
    position: absolute;
    top: -60px;
    left: 0;
    font-size: 30px;
    font-weight: 700;
  }

  .content .right-c .name {
    position: absolute;
    top: -60px;
    right: 0;
    font-size: 30px;
    font-weight: 700;
  }
  .list-c {
    max-width: 1462px;
    margin-left: auto;
    margin-right: auto;
    height: auto;
    margin: 0 auto;
    margin-top: 100px;
  }
  .list-c > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 44px;
    & > .left {
      margin-right: 44px;
    }
  }
  .list-c > div > .right,
  .list-c > div > .left {
    display: flex;
    flex: 1;
    height: 366px;
    padding: 23px;
    background: #ebfcff;
    align-items: center;
    text-align: left;
    border-radius: 20px;
    box-shadow: 0 0 10px #a5a5a5;
  }
  .list-c > div > .visibleH {
    flex: 1;
    height: 366px;
    padding: 23px;
    visibility: hidden;
  }

  .list-c > div img {
    height: 320px;
    width: 240px;
    float: left;
    margin-right: 80px;
    background: url(../assets/img/headhunting-el.png) no-repeat center center;
    background-size: 240px 320px;
  }
  .list-c > div > div p {
    font-size: 23px;
    line-height: 23px;
    color: #9aa0a2;
    margin-bottom: 23px;
  }
  .list-c > div > div p:first-child {
    color: #333;
    font-size: 27px;
    line-height: 27px;
  }
}
</style>