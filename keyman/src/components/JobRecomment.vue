<template>
  <div class="job-recomment">
    <div class="head">
      <div class="title">相似职位</div>
      <div class="more" @click="onMorePost">更多职位</div>
    </div>
    <div v-show="list.length" class="body">
      <div class="list-wrap">
        <ul class="list">
          <li v-for="item in list" :key="item.id" class="item" @click="onSelectPost(item)">
            <div class="info">
              <div class="info-row">
                <span class="name">{{item.job_title}}</span>
                <span
                  class="mony"
                >{{item.salary_above | filterSalary}}{{item.salary_below | filterSalary}}</span>
              </div>
              <div class="info-row">
                <p
                  class="txt"
                >{{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</p>
              </div>
              <div class="info-row">
                <p
                  class="txt"
                >{{item.company_name}}|{{item.province}} {{item.city === item.province ? '' : item.city}}|{{item.comkind | filterComkind}}</p>
              </div>
            </div>
            <div class="avatar-wrap">
              <img :src="item.headimgurl" alt />
            </div>
          </li>
        </ul>
      </div>
      <div class="more-wrap">
        <div class="more" @click="onGetMore">查看更多职位</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommentJob',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onSelectPost(data) {
      this.$emit('onPostDetail', data)
    },
    onMorePost() {
      this.$emit('onJumpMorePost')
    },
    onGetMore() {
      const list = JSON.parse(JSON.stringify(this.list))
      this.$emit('onMore', list)
    }
  },
  filters: {
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
    },
    filterSalary(num) {
      const map = {
        1: '3K以下',
        2: '3-5K',
        3: '5-10K',
        4: '10-15K',
        5: '15-20K',
        6: '20-30K',
        7: '30-50K',
        8: '50K以上'
      }
      return map[num]
    },
    filterMonthMoney(num) {
      return num > 0 ? `${num}薪` : ''
    }
  }
}
</script>

<style lang="scss">
.job-recomment {
  background: #fff;
  min-height: 500px;
  padding: 0 12px 20px 14px;
  .head {
    padding-left: 8px;
    padding-right: 8px;
    display: flex;
    justify-content: space-between;
    & > .title {
      position: relative;
      flex: 1;
      font-size: 16px;
      line-height: 58px;
      color: #424a5e;
      padding-left: 10px;
      text-align: left;
      &::before {
        content: '';
        position: absolute;
        top: 22px;
        left: 0;
        width: 2px;
        height: 16px;
        background: #ff7272;
      }
    }
    & > .more {
      font-size: 16px;
      line-height: 58px;
      color: #9fa3b0;
      cursor: pointer;
    }
  }
  .body {
    .list-wrap {
      .list {
        height: auto;
        padding: 0;
        border: none;
        & > .item {
          // 取消样式干扰
          float: none;
          display: flex;
          height: auto;
          margin: 0;
          border-bottom: 1px solid #eef0f5;
          padding-bottom: 20px;
          .info {
            flex: 1;
            text-align: left;
            padding-left: 20px;
            .info-row {
              display: flex;
              padding: 3px 0;
              .name {
                padding-right: 10px;
                font-size: 14px;
                line-height: 20px;
                color: #424a5e;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 180px;
                font-weight: bold;
              }
              .mony {
                @extend .name;
                color: #ff7272;
                max-width: 100px;
                font-weight: normal;
              }
              .txt {
                font-size: 12px;
                line-height: 20px;
                color: #afb4b6;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
              }
            }
          }
          .avatar-wrap {
            margin-right: 20px;
            flex: 0 0 60px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #eef0f5;
            & > img {
              display: block;
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .more-wrap {
      margin-top: 20px;
      border: 1px solid #e3e7ed;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      color: #9fa3b0;
      cursor: pointer;
    }
  }
}
</style>