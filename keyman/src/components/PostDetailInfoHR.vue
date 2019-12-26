<template>
  <!-- 职位详情 -->
  <div v-show="show" class="detail-box">
    <div class="head">
      <p></p>
      <div>
        <img :src="detailData.url" alt />
        <div>
          <div>
            <span>{{detailData.job_name}}</span>
            <span>月薪{{detailData.salary_above | filterSalary}}{{detailData.salary_below | filterSalary}}</span>
            <img src="../assets/img/zhuangtai.png" alt />
            <span>{{detailData.nickname}}</span>
            <img src="../assets/img/zhiwei.png" alt />
            <span>{{detailData.rank}}</span>
            <span v-if="detailData.type === 1" class="status publish">发布中</span>
            <span v-else-if="detailData.type === 2" class="status pause">暂停中</span>
            <span v-else-if="detailData.type === 3" class="status delete">已删除</span>
          </div>
          <div>{{detailData.city}} {{ detailData.work_year | filterWorkYear}} {{detailData.education | filterEdu}}</div>
          <div>{{detailData.company_name}} {{detailData.employee_num | filterCompanySize}} {{detailData.comkind | filterComkind}}</div>
        </div>
        <span class="right-btns-group">
          <span class="btns-row">
            <span class="share">分享至微信</span>
            <span class="submit-resume" @click="onHandResumes(detailData)">投递简历</span>
          </span>
          <span class="btns-row">
            <span class="perfect-btns">完善在线简历</span>
            <span class="add-btns">新增附件简历</span>
          </span>
        </span>
        <!-- <div>
          <div>
            <img src="../assets/img/wx2.png" alt />
            <div>分享至微信</div>
            <div class="post-switch">
              <span class="editor" @click="onHandResumes(detailData)">投递简历</span>
            </div>
          </div>
        </div>-->
      </div>
    </div>
    <div class="detail-info">
      <div class="detail-content-wrap">
        <div class="detail-content">
          <ul>
            <li :class="{'cur': detailTag === 'post'}" @click="onSwitchTag('post')">职位</li>
            <li :class="{'cur': detailTag === 'company'}" @click="onSwitchTag('company')">公司</li>
            <li :class="{'cur': detailTag === 'info'}" @click="onSwitchTag('info')">猎头信息</li>
          </ul>
          <div v-show="detailTag === 'post'" class="post">
            <div v-show="editorOrSee === 'editor'" class="editor-post">
              <el-form :model="detailData" :rules="detailRules" label-position="top">
                <el-form-item label="薪资结构">
                  <el-select v-model="detailData.salary_above" placeholder="薪资最小值">
                    <el-option label="3K以下" :value="1"></el-option>
                    <el-option label="3-5K" :value="2"></el-option>
                    <el-option label="5-10K" :value="3"></el-option>
                    <el-option label="10-15K" :value="4"></el-option>
                    <el-option label="15-20K" :value="5"></el-option>
                    <el-option label="20-30K" :value="6"></el-option>
                    <el-option label="30-50K" :value="7"></el-option>
                    <el-option label="50K以上" :value="8"></el-option>
                  </el-select>

                  <span class="to">至</span>
                  <el-select v-model="detailData.salary_below" placeholder="薪资最大值">
                    <el-option label="3K以下" :value="1"></el-option>
                    <el-option label="3-5K" :value="2"></el-option>
                    <el-option label="5-10K" :value="3"></el-option>
                    <el-option label="10-15K" :value="4"></el-option>
                    <el-option label="15-20K" :value="5"></el-option>
                    <el-option label="20-30K" :value="6"></el-option>
                    <el-option label="30-50K" :value="7"></el-option>
                    <el-option label="50K以上" :value="8"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职位详情">
                  <el-input type="textarea" v-model="detailData.zwxq"></el-input>
                </el-form-item>
                <el-form-item label="职位点评">
                  <el-input type="textarea" v-model="detailData.comment"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="editorOrSee === 'see'" class="see-post">
              <div class="box">
                <div class="title">薪资结构</div>
                <p
                  class="txt"
                >{{detailData.salary_above | filterSalary}}{{detailData.salary_below | filterSalary}}</p>
              </div>
              <div class="box">
                <div class="title">职位详情</div>
                <p class="txt">{{ detailData.zwxq }}</p>
              </div>
              <div class="box">
                <div class="title">职位点评</div>
                <p v-if="detailData.comment" class="txt">{{detailData.comment}}</p>
              </div>
            </div>
          </div>
          <div v-show="detailTag === 'company'" class="company">
            <div class="company-info">
              <div class="address-img">
                <img src alt />
              </div>
              <div class="intro-wrap">
                <div class="avatar-wrap">
                  <div class="avatar">
                    <img :src="detailCompanyData.logo" alt />
                  </div>
                  <div class="info-wrap">
                    <p class="name">{{detailCompanyData.company_name}}</p>
                    <p
                      class="info"
                    >{{detailCompanyData.employee_num | filterCompanySize}}{{detailCompanyData.comkind | filterComkind}}</p>
                    <a
                      :href="detailCompanyData.website"
                      class="url"
                      target="_blank"
                    >{{detailCompanyData.website}}</a>
                  </div>
                </div>
                <p class="intro">{{detailCompanyData.profile}}</p>
              </div>
            </div>
            <div class="recruit-list">
              <p class="title">招聘职位</p>
              <ul v-if="detailCompanyData.data_list" class="list">
                <li
                  v-for="(item, index) in detailCompanyData.data_list"
                  :key="index"
                  class="recruit-item"
                >
                  <div class="info">
                    <p class="name">
                      {{item.company_name}}
                      <span
                        class="wages"
                      >{{item.salary_above | filterSalary}}-{{item.salary_below |filterSalary}}</span>
                    </p>
                    <p
                      class="intro"
                    >{{item.employee_num | filterCompanySize}} {{item.comkind | filterComkind}}</p>
                    <p
                      class="intro"
                    >{{item.company_name}} {{item.employee_num | filterCompanySize}} {{item.comkind | filterComkind}}</p>
                  </div>
                  <div class="avatar">
                    <img :src="item.logo" alt />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-show="detailTag === 'info'" class="info">
            <div class="info-top">
              <div class="avatar">
                <img :src="detailInfoData.headimgurl" alt />
              </div>
              <div class="intro">
                <p class="name">{{detailInfoData.nickname}}昵称</p>
                <p class="txt">{{detailInfoData.age}}</p>
                <p class="txt">{{detailInfoData.work_year | filterWorkYear}}</p>
                <p class="txt">{{detailInfoData.comkind | filterComkind}}</p>
                <p class="txt">
                  <span class="icon"></span>
                </p>
              </div>
            </div>
            <div class="recruit-list">
              <p class="title">招聘职位</p>
              <ul v-show="detailInfoData.data_list" class="list">
                <li
                  v-for="(item, index) in detailInfoData.data_list"
                  :key="index"
                  class="recruit-item"
                >
                  <div class="info">
                    <p class="name">
                      {{item.company_name}}
                      <span
                        class="wages"
                      >{{item.salary_above | filterSalary}}-{{item.salary_below |filterSalary}}</span>
                    </p>
                    <p
                      class="intro"
                    >{{item.employee_num | filterCompanySize}} {{item.comkind | filterComkind}}</p>
                    <p
                      class="intro"
                    >{{item.company_name}} {{item.employee_num | filterCompanySize}} {{item.comkind | filterComkind}}</p>
                  </div>
                  <div class="avatar">
                    <img :src="item.logo" alt />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="job-recomment-wrap">
          <jobRecomment
            @onMore="onGetMorePost"
            :list="[detail]"
            @onPostDetail="onSeeRecommentPost"
            @onJumpMorePost="onJumpMorePosts"
          ></jobRecomment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jobRecomment from '@/components/JobRecomment'
import { mapGetters } from 'vuex'
import { getDetailPost, getDetailCompany, getDetailHH } from '@/api/api'
export default {
  name: 'postDetailInfo',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isLogined: {
      type: Boolean,
      default: true
    },
    detail: {
      type: Object,
      default() {
        return {
          job_name: null,
          salary_above: 0,
          salary_below: 0,
          nickname: '',
          rank: null,
          type: null,
          city: '',
          work_year: 0,
          education: 0,
          company_name: '',
          employee_num: '',
          comkind: 0,
          xzjg: null,
          zwxq: null
        }
      }
    }
  },
  data() {
    return {
      currentDetailId: '',
      // detailData: {
      //   job_name: null,
      //   salary_above: 0,
      //   salary_below: 0,
      //   nickname: '',
      //   rank: null,
      //   type: null,
      //   city: '',
      //   work_year: 0,
      //   education: 0,
      //   company_name: '',
      //   employee_num: '',
      //   comkind: 0,
      //   xzjg: null,
      //   zwxq: null
      // },
      detailRules: {
        salary_above: [
          {
            required: false,
            message: '',
            type: 'number'
          }
        ],
        salary_below: [
          {
            required: false,
            message: '',
            type: 'number'
          }
        ]
      },
      // detailCompanyData: {
      //   job_name: null,
      //   salary_above: 5,
      //   salary_below: 20,
      //   nickname: '张三',
      //   rank: null,
      //   type: null,
      //   city: '北京市',
      //   work_year: 1,
      //   education: 3,
      //   company_name: '北京智慧小喇叭',
      //   employee_num: '4',
      //   comkind: 4,
      //   logo: '',
      //   website: 'http://www.baidu.com',
      //   profile: '',
      //   id: 1,
      //   data_list: [
      //     {
      //       company_name: '北京智慧小喇叭',
      //       employee_num: '4',
      //       comkind: 4,
      //       salary_above: 5,
      //       salary_below: 20,
      //       logo: ''
      //     }
      //   ]
      // },
      // detailInfoData: {
      //   job_name: null,
      //   salary_above: 5,
      //   salary_below: 20,
      //   nickname: '张三',
      //   rank: null,
      //   type: null,
      //   city: '北京市',
      //   work_year: 1,
      //   education: 3,
      //   company_name: '北京智慧小喇叭',
      //   employee_num: '4',
      //   comkind: 4,
      //   logo: '',
      //   website: '',
      //   profile: '',
      //   id: 1,
      //   headimgurl: '/uploads/admin/1563244624666.jpg',
      //   age: 18,
      //   data_list: [
      //     {
      //       company_name: '北京智慧小喇叭',
      //       employee_num: '4',
      //       comkind: 4,
      //       salary_above: 5,
      //       salary_below: 20,
      //       logo: ''
      //     }
      //   ]
      // },
      detailTag: 'post',
      editorOrSee: 'see'
    }
  },
  computed: {
    detailData() {
      const data = JSON.parse(JSON.stringify(this.detail))
      data.job_name = data.job_title
      return data
    },
    detailCompanyData() {
      const data = JSON.parse(JSON.stringify(this.detail))
      return data
    },
    detailInfoData() {
      const data = JSON.parse(JSON.stringify(this.detail))
      return data
    },
    ...mapGetters(['getUserType', 'getMemberId', 'getToken'])
  },
  created() {
    // this.onDetail()
  },
  methods: {
    onSwitchTag(val) {
      this.detailTag = val
    },
    onEditorSee(val) {
      // 职位详情-职位-保存
      this.editorOrSee = val
      // 暂时缺少保存接口
    },
    onDetail(data) {
      if (data.status === 0) {
        return
      }
      getDetailPost({
        member_id: this.getMemberId,
        token: this.getToken,
        job_id: data.id
      }).then(res => {
        if (res.code === 200) {
          this.detail = true
          this.detailData = Object.assign(res.data[0], {
            type: data.type
          })
          this.detailTag = 'post'
          this.editorOrSee = 'see'
        } else if (res.code === 40001) {
          // 使用默认数据避免出现undefined
          this.detail = true
          this.detailTag = 'post'
          this.editorOrSee = 'see'
        } else {
          this.$message.error(res.message)
        }
      })
      this.currentDetailId = data.id // 记录当前查看职位id
    },
    getDetailCompanyData() {
      getDetailCompany({
        member_id: this.getMemberId,
        token: this.getToken,
        job_id: this.currentDetailId
      }).then(res => {
        if (res.code === 200) {
          this.detailCompanyData = res.data
        } else if (res.code === 40001) {
          // 使用默认数据避免出现undefined
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getDetailInfoData() {
      getDetailHH({
        member_id: this.getMemberId,
        token: this.getToken,
        job_id: this.currentDetailId
      }).then(res => {
        if (res.code === 200) {
          this.detailInfoData = res.data
        } else if (res.code === 40001) {
          // 使用默认数据避免出现undefined
          this.detail = true
        } else {
          this.$message.error(`获取猎头信息失败：${res.message}`)
        }
      })
    },
    onGetMorePost(data) {
      console.log(data)
    },
    onJumpMorePosts() {
      console.log('跳转更多详情页面')
    },
    onSeeRecommentPost(data) {
      console.log(data, '相似职位详情')
    },
    onHandResumes(data) {
      console.log(data, '投简历')
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
  },
  components: {
    jobRecomment
  }
}
</script>

<style lang="scss">
// 职位详情--开始
.detail-box {
  margin: 0 auto 0;
  background: #eff1f5;
}

.detail-box > .head {
  min-height: 213px;
  width: 100%;
  background: #4a4956;
  padding: 16px 20px;
  text-align: left;
}

.detail-box > .head > p:first-child {
  font-size: 14px;
  color: #fff;
  line-height: 14px;
  margin-bottom: 20px;
}

.detail-box > .head > div:nth-child(2) {
  // height: 115px;
  width: 100%;
  display: flex;
}

.detail-box > .head > div:nth-child(2) > img:first-child {
  flex: 0 0 115px;
  height: 115px;
  width: 115px;
  border-radius: 50%;
  margin-right: 22px;
  background: #f2f2f2;
}

.detail-box > .head > div:nth-child(2) > div:nth-child(2) {
  // width: 750px;
  flex: 1;
  // height: 115px;
}
.detail-box > .head > div:nth-child(2) > div:nth-child(2) > div:first-child {
  display: flex;
  // overflow: hidden;
}
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > span {
  color: #fff;
  display: block;
  white-space: nowrap;
  margin-right: 20px;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > span:first-child {
  font-size: 32px;
  line-height: 32px;
}

.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > span:nth-child(2) {
  font-size: 32px;
  line-height: 32px;
  color: #fd877d;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > span:nth-child(4),
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > span:nth-child(6) {
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  margin-top: 13px;
  max-width: 100px;
}

.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > img:nth-child(3),
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:first-child
  > img:nth-child(5) {
  height: 12px;
  width: 12px;
  margin-top: 16px;
  margin-right: 5px;
  float: left;
}

.detail-box > .head > div:nth-child(2) > div:nth-child(2) > div:nth-child(2),
.detail-box > .head > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) {
  font-size: 14px;
  margin-top: 10px;
  line-height: 14px;
  color: #d9dee3;
  overflow: hidden;
}
.detail-box > .head > div:nth-child(2) > div:nth-child(2) > div:nth-child(4) {
  height: 26px;
  overflow: hidden;
  margin-top: 12px;
}
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(2)
  > div:nth-child(4)
  > span {
  width: 70px;
  border: 1px solid #fd877d;
  color: #fd877d;
  line-height: 24px;
  text-align: center;
  height: 26px;
  font-size: 12px;
  float: left;
  padding: 0 21px;
  border-radius: 12px;
  margin-right: 14px;
}
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(3)
  > div:first-child
  > div:nth-child(2) {
  width: auto;
  line-height: 46px;
  font-size: 18px;
  // float: left;
  color: #fff;
}
.detail-box > .head > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) {
  font-size: 16px;
  width: 100%;
}
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(3)
  > div:nth-child(2)
  > img {
  margin-top: 2px;
}

.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(3)
  > div:nth-child(2)
  > img,
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(3)
  > div:nth-child(2)
  > span {
  float: left;
}
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(3)
  > div:nth-child(2)
  > span {
  margin: 0 40px 0 15px;
  color: #fd877d;
  line-height: 16px;
}
.detail-box
  > .head
  > div:nth-child(2)
  > div:nth-child(3)
  > div:nth-child(2)
  > span:last-child {
  margin-right: 0;
}

.detail-info {
  margin-top: 20px;
  background: #eff1f5;
  overflow: hidden;
}
.detail-info ul {
  height: 46px;
  width: 100%;
  border-bottom: 1px solid #a5a5a5;
  overflow: hidden;
  padding-left: 6px;
}
.detail-info ul li {
  line-height: 45px;
  height: 45px;
  font-size: 15px;
  margin: 0 24px;
  float: left;
  cursor: pointer;
}
.detail-info ul li.cur {
  color: #fd877d;
  border-bottom: 2px solid #fd877d;
}
.detail-box {
  .head {
    .status {
      font-size: 18px;
      line-height: 42px;
      &.publish {
        color: #9cd77f;
        padding-left: 22px;
        &::before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 21px;
          height: 21px;
          background: url(../assets/img/publish_icon@2x.png) no-repeat 0 0;
          background-size: 21px 21px;
        }
      }
      &.pause {
        color: #ff7272;
        padding-left: 22px;
        &::before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 21px;
          height: 21px;
          background: url(../assets/img/pause_icon@2x.png) no-repeat 0 0;
          background-size: 21px 21px;
        }
      }
      &.delete {
        color: #fff;
        padding-left: 28px;
        &::before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 26px;
          height: 26px;
          background: url(../assets/img/pause_icon@2x.png) no-repeat 0 0;
          background-size: 26px 26px;
        }
      }
    }
  }
  .detail-content-wrap {
    display: flex;
    justify-content: space-between;
    .job-recomment-wrap {
      flex: 0 0 426px;
      width: 426px;
      margin-left: 20px;
      background: #fff;
    }
  }
  .detail-content {
    flex: 1;
    min-height: 500px;
    background: #fff;
    & > .post {
      & > .see-post {
        & > .box {
          padding-top: 18px;
          padding-left: 40px;
          padding-right: 50px;
          text-align: left;
          & > .title {
            padding-left: 12px;
            position: relative;
            font-size: 16px;
            line-height: 36px;
            font-weight: bold;
            color: #424a5e;
            &::before {
              content: '';
              position: absolute;
              top: 11px;
              left: 0;
              width: 2px;
              height: 14px;
              background-color: #ff7272;
            }
          }
          & > .txt {
            padding-left: 12px;
            font-size: 14px;
            line-height: 34px;
            color: #424a5e;
            white-space: pre-wrap;
            word-break: break-all;
          }
        }
      }
      & > .editor-post {
        padding-top: 28px;
        padding-left: 40px;
        padding-right: 50px;
        .el-form-item {
          display: block;
          text-align: left;
          .el-form-item__label {
            padding-left: 12px;
            position: relative;
            font-size: 16px;
            line-height: 36px;
            font-weight: bold;
            color: #424a5e;
            &::before {
              content: '';
              position: absolute;
              top: 11px;
              left: 0;
              width: 2px;
              height: 14px;
              background-color: #ff7272;
            }
          }
          .el-form-item__content {
            padding-left: 12px;
            .el-input {
              width: 132px;
            }
            .el-input__inner {
              width: 132px !important;
            }
            .to {
              padding-left: 10px;
              padding-right: 10px;
            }
            .el-textarea__inner {
              width: 1140px;
              height: 86px;
              resize: none;
              border-radius: 0;
            }
          }
        }
      }
    }
    & > .company {
      .company-info {
        padding-left: 70px;
        display: flex;
        text-align: left;
        .address-img {
          margin-top: 20px;
          width: 200px;
          height: 130px;
          background: #eef0f5;
          & > img {
            display: block;
            width: 200px;
            height: 130px;
          }
        }
        .intro-wrap {
          padding-left: 12px;
          .avatar-wrap {
            display: flex;
            .avatar {
              margin-top: 20px;
              margin-right: 8px;
              width: 60px;
              height: 60px;
              background: #eef0f5;
              & > img {
                display: block;
                width: 60px;
                height: 60px;
              }
            }
            .info-wrap {
              .name {
                padding-top: 17px;
                font-size: 14px;
                line-height: 20px;
                color: #424a5e;
              }
              .info {
                font-size: 14px;
                line-height: 20px;
                color: #afb4b6;
              }
              .url {
                font-size: 14px;
                line-height: 20px;
                color: #677dda;
              }
            }
          }
          .intro {
            width: 426px;
            padding-top: 10px;
            font-size: 14px;
            line-height: 20px;
            color: #424a5e;
          }
        }
      }
      //招聘职位
      .recruit-list {
        padding-left: 60px;
        padding-right: 60px;
        text-align: left;
        padding-top: 20px;
        & > .title {
          font-size: 16px;
          line-height: 36px;
          color: #424a5e;
          font-weight: bold;
        }
        & > .list {
          margin-bottom: 10px;
          overflow: hidden;
          text-align: left;
          border: 1px solid #eef0f5;
          & > .recruit-item {
            float: left;
            display: flex;
            width: 372px;
            height: 80px;
            & > .info {
              flex: 1;
              padding-left: 24px;
              & > .name {
                padding-top: 12px;
                font-size: 14px;
                line-height: 20px;
                color: #424a5e;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                & > .wages {
                  padding-left: 20px;
                  color: #fd9087;
                }
              }
              & > .intro {
                font-size: 12px;
                line-height: 18px;
                color: #afb4b6;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            & > .avatar {
              margin-top: 10px;
              margin-right: 24px;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background-color: #a5a5a5;
              & > img {
                display: block;
                width: 60px;
                height: 60px;
              }
            }
          }
        }
      }
    }
    & > .info {
      @extend .company;
      .info-top {
        display: flex;
        text-align: left;
        padding-left: 64px;
        padding-top: 20px;
        & > .avatar {
          width: 100px;
          height: 100px;
          background: #eef0f5;
          border-radius: 50%;
          & > img {
            display: block;
            width: 100px;
            height: 100px;
          }
        }
        & > .intro {
          padding-left: 20px;
          & > .name {
            font-size: 14px;
            line-height: 22px;
            color: #424a5e;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          & > .txt {
            font-size: 12px;
            line-height: 20px;
            color: #424a5e;
            & > .icon {
              display: block;
              width: 32px;
              height: 26px;
              background: url(../assets/img/weixin.png) no-repeat 0 0;
              background-size: 32px 26px;
            }
          }
        }
      }
    }
  }
  .right-btns-group {
    .btns-row {
      display: flex;
      padding-top: 30px;
      .share {
        position: relative;
        padding-left: 24px;
        font-size: 18px;
        line-height: 46px;
        color: #fff;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15px;
          width: 16px;
          height: 16px;
          background: url(../assets/img/wx2.png) no-repeat 0 0;
          background-size: 16px 16px;
        }
      }
      .submit-resume {
        margin-left: 30px;
        display: block;
        width: 150px;
        height: 46px;
        font-size: 18px;
        line-height: 46px;
        text-align: center;
        color: #fff;
        background: #ff7272;
        cursor: pointer;
      }
      .perfect-btns {
        position: relative;
        flex: 1;
        display: block;
        padding-left: 32px;
        font-size: 16px;
        line-height: 36px;
        color: #ff7272;
        cursor: pointer;
        &::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 0;
          width: 12px;
          height: 12px;
          background: url(../assets/img/wanshanjianli@2x.png) no-repeat 0 0;
          background-size: 12px 12px;
        }
      }
      .add-btns {
        @extend .perfect-btns;
        &::before {
          content: '';
          background: url(../assets/img/add_resume.png) no-repeat 0 0;
          background-size: 12px 12px;
        }
      }
    }
  }
}
// 职位详情--结束
</style>