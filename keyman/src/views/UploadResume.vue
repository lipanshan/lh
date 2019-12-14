<template>
  <div class="upload-resume">
    <div class="hr-info">
      <div class="head">
        <div @click="tab_index(1)" :class="{'cur': tag === 1}">个人信息</div>
        <div @click="tab_index(2)" :class="{'cur': tag === 2}">工作经历</div>
        <div @click="tab_index(3)" :class="{'cur': tag === 3}">教育经历</div>
        <div @click="tab_index(4)" :class="{'cur': tag === 4}">项目经历</div>
      </div>
      <div class="page-detail" v-show="tag === 1">
        <el-form :model="infoForm" :rules="infoRules" ref="infoWrap">
          <div class="nav-warp">
            <div class="left">
              <div class="navs">
                <span class="nav-item">微简历</span>
                <span class="nav-item">已上传</span>
              </div>
            </div>
            <div class="right">
              <div class="select-wrap"></div>
              <div class="select-wrap"></div>
              <div class="save-btn" @click="onSaveInfoForm">保存修改</div>
            </div>
          </div>
          <div class="form-box">
            <div class="left">
              <div class="rows">
                <div class="item">
                  <el-form-item prop="nickname" label="姓名">
                    <el-input v-model="infoForm.nickname"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="age" label="年龄">
                    <el-input v-model.number="infoForm.age"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="op_years" label="工龄">
                    <el-select v-model.number="infoForm.op_years">
                      <el-option label="不限" :value="0"></el-option>
                      <el-option label="在校生" :value="1"></el-option>
                      <el-option label="应届生" :value="2"></el-option>
                      <el-option label="一年以下" :value="3"></el-option>
                      <el-option label="1-3年" :value="4"></el-option>
                      <el-option label="3-5年" :value="5"></el-option>
                      <el-option label="5-10年" :value="6"></el-option>
                      <el-option label="10年以上" :value="7"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="education" label="学历">
                    <el-select v-model="infoForm.education">
                      <el-option :value="0">不限</el-option>
                      <el-option :value="1">初中</el-option>
                      <el-option :value="2">中专、技校</el-option>
                      <el-option :value="3">高中</el-option>
                      <el-option :value="4">大专</el-option>
                      <el-option :value="5">本科</el-option>
                      <el-option :value="6">研究生</el-option>
                      <el-option :value="7">博士</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="mobil" label="手机号">
                    <el-input v-model.number="infoForm.mobil" maxlength="11"></el-input>
                  </el-form-item>
                </div>
                <div class="item item2">
                  <el-form-item prop="email" label="邮箱">
                    <el-input v-model="infoForm.email"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="job_type" label="求职状态">
                    <el-select v-model="infoForm.job_type">
                      <el-option :value="1">在职</el-option>
                      <el-option :value="2">离职</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="right">
              <el-upload action="#" :show-file-list="false" :before-upload="onBeforeUploadInfoImg">
                <div class="img-wrap">
                  <img :src="infoImgUrl" alt />
                </div>
                <p class="tips">200k以内，正方形个人照片</p>
              </el-upload>
            </div>
          </div>
        </el-form>
      </div>
      <div class="page-detail" v-show="tag === 2">
        <el-form :model="workExperForm" :rules="workExperRules" ref="workExperWrap">
          <!-- 工作经历可能是多组---是一个列表 -->
          <div class="nav-warp">
            <div class="left"></div>
            <div class="right">
              <span class="save-btn" @click="onSaveWorkExper">保存修改</span>
            </div>
          </div>
          <ul class="experience-list">
            <li class="experience-item">
              <div class="rows">
                <div class="item">
                  <el-form-item prop="company" label="公司名称">
                    <el-input v-model="workExperForm.company"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="sh_money" label="薪资要求">
                    <div class="half">
                      <el-input v-model="workExperForm.money" placeholder="税前工资"></el-input>
                    </div>
                    <div class="half">
                      <el-input v-model="workExperForm.sh_money" placeholder="税后工资"></el-input>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="starttime" label="工作时间">
                    <div class="half">
                      <el-date-picker v-model="workExperForm.starttime" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div class="half">
                      <el-date-picker v-model="workExperForm.endtime" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="post" label="担任职务">
                    <el-input v-model="workExperForm.post"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="sjbm" label="汇报上级">
                    <el-input v-model="workExperForm.sjbm"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="xsrs" label="下属人数">
                    <div class="half">
                      <el-input v-model="workExperForm.xsrs"></el-input>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="row-box">
                <el-form-item>
                  <el-input
                    type="textarea"
                    maxlength="1500"
                    show-word-limit
                    v-model="workExperForm.content"
                    placeholder="工作内容"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="row-box">
                <el-form-item>
                  <el-input
                    type="textarea"
                    maxlength="1500"
                    placeholder="工作成绩"
                    show-word-limit
                    v-model="workExperForm.work_yj"
                  ></el-input>
                </el-form-item>
              </div>
            </li>
          </ul>
        </el-form>
      </div>
      <div class="page-detail" v-show="tag === 3">
        <el-form :model="eduForm" :rules="eduRules" ref="eduWrap">
          <div class="nav-warp">
            <div class="left"></div>
            <div class="right">
              <span class="save-btn" @click="onSaveEdu">保存修改</span>
            </div>
          </div>
          <ul class="experience-list">
            <li class="experience-item">
              <div class="rows">
                <div class="item">
                  <el-form-item prop="school" label="学校名称">
                    <el-input v-model="eduForm.school"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="major" label="所学专业">
                    <el-input v-model="eduForm.major"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="end_time" label="毕业时间">
                    <div class="half">
                      <el-date-picker v-model="eduForm.star_time" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div class="half">
                      <el-date-picker v-model="eduForm.end_time" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="edu_type" label="选择学历">
                    <el-select v-model="eduForm.edu_type">
                      <el-option label="初中及以下" value="1"></el-option>
                      <el-option label="中专/技校" value="2"></el-option>
                      <el-option label="高中" value="3"></el-option>
                      <el-option label="大专" value="4"></el-option>
                      <el-option label="本科" value="5"></el-option>
                      <el-option label="硕士" value="6"></el-option>
                      <el-option label="博士" value="7"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="row-box">
                <el-form-item>
                  <el-input
                    type="textarea"
                    maxlength="1500"
                    show-word-limit
                    v-model="eduForm.content"
                    placeholder="在校经历"
                  ></el-input>
                </el-form-item>
              </div>
            </li>
          </ul>
        </el-form>
      </div>
      <div class="page-detail" v-show="tag === 4">
        <el-form :model="projectsForm" :rules="projectsRules" ref="projectsWrap">
          <div class="nav-warp">
            <div class="left"></div>
            <div class="right">
              <span class="save-btn" @click="onSaveProject">保存修改</span>
            </div>
          </div>
          <ul class="experience-list">
            <li class="experience-item">
              <div class="rows">
                <div class="item">
                  <el-form-item prop="project_name" label="项目名称">
                    <el-input v-model="projectsForm.project_name"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="post" label="项目角色">
                    <el-input v-model="projectsForm.post"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="rows">
                <div class="item">
                  <el-form-item prop="endtime" label="开始时间">
                    <div class="half">
                      <el-date-picker v-model="projectsForm.starttime" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div class="half">
                      <el-date-picker v-model="projectsForm.endtime" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                  </el-form-item>
                </div>
                <div class="item">
                  <el-form-item prop="url_link" label="项目链接(选填)">
                    <el-input v-model="projectsForm.url_link"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row-box">
                <el-form-item>
                  <el-input
                    type="textarea"
                    maxlength="1500"
                    show-word-limit
                    v-model="projectsForm.content"
                    placeholder="在校经历"
                  ></el-input>
                </el-form-item>
              </div>
            </li>
          </ul>
        </el-form>
      </div>
    </div>
    <el-dialog title="操作提示" width="360px" :visible.sync="dialogTip.show">
      <div class="dialog-tip-content">
        <h1 class="message">
          上传
          <span>{{dialogTip.message}}</span>
        </h1>
        <p class="message">{{dialogTip.message2}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  uploadResumeInfo,
  uploadResumeExper,
  getUserResume,
  uploadResumeEdu,
  uploadResumeProject
} from '@/api/api'
const INFO_IMG_SIZE = 1024 * 500 // 个人信息上传图片限制大小500k
export default {
  name: 'uploadresume',
  data() {
    return {
      tag: 1,
      dialogTip: {
        show: false,
        message: '',
        message2: '祝您工作愉快'
      },
      infoForm: {
        member_id: '',
        token: '',
        nickname: '',
        age: '',
        op_years: '',
        education: '',
        mobil: '',
        email: '',
        job_type: '',
        q_pic: '',
        uploadFileSign: ['q_pic']
      },
      infoImgUrl: '',
      infoRules: {
        nickname: [
          {
            required: false,
            message: ''
          }
        ],
        age: [
          {
            required: false,
            message: '',
            type: 'number'
          }
        ],
        op_years: [
          {
            required: false,
            message: '',
            type: 'number'
          }
        ],
        education: [
          {
            required: false,
            message: ''
          }
        ],
        mobil: [
          {
            required: false,
            message: '',
            type: 'number'
          }
        ],
        email: [
          {
            required: false,
            message: ''
          }
        ],
        job_type: [
          {
            required: false,
            message: ''
          }
        ],
        q_pic: [
          {
            required: false,
            message: ''
          }
        ]
      },
      workExperForm: {
        member_id: '',
        resume_id: '',
        token: '',
        company: '',
        sh_money: '',
        money: '',
        starttime: '',
        endtime: '',
        post: '',
        sjbm: '',
        xsrs: '',
        work_yj: '',
        content: ''
      },
      workExperRules: {
        company: [{ required: false, message: '' }],
        sh_money: [{ required: false, message: '' }],
        money: [{ required: false, message: '' }],
        starttime: [{ required: false, message: '' }],
        endtime: [{ required: false, message: '' }],
        post: [{ required: false, message: '' }],
        sjbm: [{ required: false, message: '' }],
        xsrs: [{ required: false, message: '' }],
        work_yj: [{ required: false, message: '' }],
        content: [{ required: false, message: '' }]
      },
      eduForm: {
        member_id: '',
        token: '',
        school: '',
        major: '',
        star_time: '',
        end_time: '',
        edu_type: '',
        content: ''
      },
      eduRules: {
        school: [{ required: false, message: '' }],
        major: [{ required: false, message: '' }],
        star_time: [{ required: false, message: '' }],
        end_time: [{ required: false, message: '' }],
        edu_type: [{ required: false, message: '' }],
        content: [{ required: false, message: '' }]
      },
      projectsForm: {
        member_id: '',
        resume_id: '',
        token: '',
        project_name: '',
        post: '',
        starttime: '',
        endtime: '',
        url_link: '',
        content: ''
      },
      projectsRules: {
        project_name: [{ required: false, message: '' }],
        post: [{ required: false, message: '' }],
        starttime: [{ required: false, message: '' }],
        endtime: [{ required: false, message: '' }],
        url_link: [{ required: false, message: '' }],
        content: [{ required: false, message: '' }]
      }
    }
  },
  created() {
    this.getResumeInfo()
  },
  computed: {
    ...mapGetters(['getToken', 'getMemberId'])
  },
  methods: {
    tab_index(index) {
      this.tag = index
    },
    getResumeInfo() {
      // getUserResume({
      //   member_id: this.getMemberId,
      //   token: this.getToken,
      //   resume_uid: this.$router.query.resume_id
      // })
    },
    onPreviewImg(file, key) {
      const fs = new FileReader()
      fs.readAsDataURL(file)
      fs.addEventListener('load', e => {
        this[key] = e.target.result
      })
    },
    onBeforeUploadInfoImg(file) {
      if (file.size > INFO_IMG_SIZE) {
        this.$message.error('上传图片失败，不得超过500k')
        return false
      }
      this.onPreviewImg(file, 'infoImgUrl')
      this.infoForm.q_pic = file
      return false
    },
    onSaveInfoForm() {
      this.$refs.infoWrap.validate(valid => {
        if (valid) {
          this.infoForm.token = this.getToken
          this.infoForm.member_id = this.getMemberId
          uploadResumeInfo(this.infoForm).then(res => {
            this.dialogTip.show = true
            if (res.code === 200) {
              this.dialogTip.message = res.message
            } else {
              this.dialogTip.message = res.message
              this.dialogTip.message2 = ''
            }
          })
        }
      })
    },
    onSaveWorkExper() {
      this.$refs.workExperWrap.validate(valid => {
        if (valid) {
          this.workExperForm.token = this.getToken
          this.workExperForm.member_id = this.getMemberId
          this.workExperForm.resume_id = '' // 还未想好在哪里获取简历id
          uploadResumeExper(this.workExperForm).then(res => {
            this.dialogTip.show = true
            if (res.code === 200) {
              this.dialogTip.message = res.message
            } else {
              this.dialogTip.message = res.message
              this.dialogTip.message2 = ''
            }
          })
        }
      })
    },
    onSaveEdu() {
      this.$refs.eduWrap.validate(valid => {
        if (valid) {
          this.eduForm.token = this.getToken
          this.eduForm.member_id = this.getMemberId
          uploadResumeEdu(this.eduForm).then(res => {
            this.dialogTip.show = true
            if (res.code === 200) {
              this.dialogTip.message = res.message
            } else {
              this.dialogTip.message = res.message
              this.dialogTip.message2 = ''
            }
          })
        }
      })
    },
    onSaveProject() {
      this.$refs.projectsWrap.validate(valid => {
        console.log(this.projectsForm)
        if (valid) {
          this.projectsForm.token = this.getToken
          this.projectsForm.member_id = this.getMemberId
          uploadResumeProject(this.projectsForm).then(res => {
            this.dialogTip.show = true
            if (res.code === 200) {
              this.dialogTip.message = res.message
            } else {
              this.dialogTip.message = res.message
              this.dialogTip.message2 = ''
            }
          })
        }
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
.upload-resume {
  .hr-info {
    height: auto;
    width: 1240px;
    margin: 40px auto;
    background: #fff;
  }
  .hr-info > .head {
    height: 50px;
    width: 100%;
    background: #49444b;
  }
  .hr-info > .head > div {
    height: 100%;
    width: 220px;
    float: left;
    text-align: center;
    line-height: 50px;
    color: #fff;
    cursor: pointer;
  }
  .hr-info > .head > div.cur {
    background: #fe7271;
  }
  .hr-info > .page-detail {
    height: auto;
    width: 100%;
  }
  .nav-warp {
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dcdcdc;
    .left {
      padding-left: 70px;
      .navs {
        display: flex;
        .nav-item {
          margin-right: 36px;
          display: block;
          font-size: 18px;
          line-height: 30px;
          color: #495060;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          &.active {
            color: #fe7271;
            border-color: #fe7271;
          }
        }
      }
    }
    .right {
      padding-right: 40px;
      display: flex;
      justify-content: flex-end;
      .select-wrap {
        margin-right: 10px;
        flex: 0 0 100px;
        width: 100px;
        height: 30px;
      }
      .save-btn {
        margin-bottom: 10px;
        display: block;
        font-size: 14px;
        line-height: 24px;
        width: 100px;
        height: 24px;
        text-align: center;
        color: #fff;
        background: #ff7272;
        border-radius: 14px;
        cursor: pointer;
      }
    }
  }
  .form-box {
    display: flex;
    padding-top: 24px;
    justify-content: space-between;
    .left {
      .rows {
        display: flex;
        .item {
          width: 310px;
          .el-form-item {
            display: flex;
            .el-form-item__label {
              display: block;
              width: 130px;
            }
            .el-input__inner {
              width: 190px;
              border-radius: 0;
            }
          }
          &.item2 {
            width: 380px;
            .el-input__inner {
              width: 260px;
              border-radius: 0;
            }
          }
        }
      }
    }
    .right {
      padding-top: 20px;
      padding-right: 100px;
      .img-wrap {
        margin: auto;
        width: 150px;
        height: 150px;
        background: url(../assets/img/upload_bg@2x.png) no-repeat 0 0;
        background-size: 150px 150px;
        & > img {
          display: block;
          width: 150px;
          height: 150px;
        }
      }
      .tips {
        font-size: 16px;
        line-height: 36px;
        color: #9fa3b0;
        text-align: center;
      }
    }
  }
  .experience-list {
    padding-bottom: 76px;
    .experience-item {
      padding-top: 34px;
      .rows {
        display: flex;
        width: 1100px;
        .item {
          display: flex;
          flex: 1;
          .el-form-item {
            flex: 1;
            display: flex;
            align-items: flex-start;
            .el-form-item__label {
              width: 150px;
            }
            .el-form-item__content {
              display: flex;
              flex: 1;
            }
          }
          .half {
            width: 50%;
            &:nth-child(1) {
              margin-right: 40px;
            }
            .el-date-editor.el-input {
              width: 180px;
            }
          }
        }
      }
      .row-box {
        margin-top: 20px;
        padding-left: 72px;
        padding-right: 70px;
        height: 170px;
        .el-textarea__inner {
          display: block;
          resize: none;
          height: 170px;
          border-radius: 0;
        }
      }
    }
  }
  .dialog-tip-content {
    padding-bottom: 40px;
    .message {
      font-size: 14px;
      line-height: 18px;
      color: #333333;
      span {
        color: #fe7271;
      }
    }
  }
  .el-upload__input {
    display: none;
  }
  .el-form-item__error {
    display: none;
  }
  .el-input__inner {
    border-radius: 0;
  }
}
</style>