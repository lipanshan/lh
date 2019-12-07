<template>
  <div class="window">
    <p>欢迎登录</p>
    <ul>
      <li @click="tab_page" class="cur">短信注册/登陆</li>
      <li @click="tab_page">扫码登陆</li>
    </ul>
    <div class="one">
      <div>
        <img src="../assets/img/mobile2.png" alt />
        <input type="text" v-model="phone" />
      </div>
      <div class="verify-wrap" id="verify-wrap"></div>
      <div class="vcode-wrap">
        <img src="../assets/img/safe.png" alt />
        <input type="text" v-model="code" />
        <div @click="sendMsg" class="get-vcode">获取验证码</div>
        <p v-show="errMessage" class="error-message">{{errMessage}}</p>
        <p
          v-show="sendMsgSuccessTips && !errMessage"
          class="error-message success-color"
        >{{sendMsgSuccessTips}}</p>
      </div>
      <div class="login-btn" @click="onLogin">登录/注册</div>
      <p>
        <input v-model="registerProtocol" type="checkbox" />
        <span>
          我已同意并同意相关服务条款和隐私
          <a href="#">《注册协议》</a>
        </span>
      </p>
    </div>
    <div class="two hidden">
      <p>打开微信，扫一扫</p>
      <img src="../assets/img/wechat2code.png" alt />
    </div>
    <!-- 选择用户注册类型 -->
    <el-dialog :modal-append-to-body="false" width="410px" :visible.sync="resiger">
      <div class="register">
        <div class="title">请选择您的身份</div>
        <ul class="list">
          <li class="item" @click="onSelectUserType('1')">
            <div class="avatar">
              <img src="../assets/img/user_type1@2x.png" alt />
            </div>
            <div class="info">我要找工作</div>
          </li>
          <li class="item" @click="onSelectUserType('2')">
            <div class="avatar">
              <img src="../assets/img/user_type2@2x.png" alt />
            </div>
            <div class="info">我是HR</div>
          </li>
          <li class="item" @click="onSelectUserType('3')">
            <div class="avatar">
              <img src="../assets/img/user_type3@2x.png" alt />
            </div>
            <div class="info">我是猎头</div>
          </li>
        </ul>
      </div>
    </el-dialog>
    <!-- 注册HR -->
    <el-dialog
      :modal-append-to-body="false"
      width="460px"
      :visible.sync="resigerHr"
      class="register-model"
    >
      <el-form class="resiger-hr">
        <div class="step1" v-show="true">
          <div class="head">
            <div class="icon"></div>
            <div class="info">
              <p class="title">您的基本信息</p>
              <p class="subtitle">完善基本信息后会遇到更多对你感兴趣的HR\猎头</p>
            </div>
          </div>
          <div class="body">
            <div class="top">
              <div class="left">
                <el-form-item>
                  <el-input v-model="registerHRData.name" placeholder="*输入姓名"></el-input>
                </el-form-item>
                <el-radio-group v-model="registerHRData.sex">
                  <el-radio label="男" value="1"></el-radio>
                  <el-radio label="女" value="2"></el-radio>
                </el-radio-group>
                <el-form-item>
                  <el-input v-model="registerHRData.email" placeholder="*输入工作邮箱"></el-input>
                </el-form-item>
              </div>
              <div class="right">
                <el-upload action="#">
                  <div class="img">
                    <img src="../assets/img/register_upload.png" alt />
                  </div>
                  <div class="upload-btns">*上传</div>
                </el-upload>
              </div>
            </div>
            <div class="next-btn-wrap">
              <div class="next-btn">下一步</div>
            </div>
          </div>
        </div>
        <div v-show="true" class="step2">
          <div class="head">
            <div class="icon"></div>
            <div class="info">
              <p class="title">创建公司信息</p>
              <p class="subtitle">向大家介绍一下自己吧</p>
            </div>
          </div>
          <div class="body">
            <el-form-item>
              <el-input v-model="registerHRData.company" placeholder="*输入完整公司名称"></el-input>
            </el-form-item>
            <div class="top img-box-wrap">
              <div class="right">
                <el-upload action="#">
                  <div class="img">
                    <img src="../assets/img/register_upload.png" alt />
                  </div>
                  <div class="upload-btns">*上传公司logo</div>
                  <p class="tips">200K以内</p>
                </el-upload>
              </div>
              <div class="right">
                <el-upload action="#">
                  <div class="img">
                    <img src="../assets/img/register_upload.png" alt />
                  </div>
                  <div class="upload-btns">*上传营业执照</div>
                  <p class="tips">500K以内</p>
                </el-upload>
              </div>
            </div>
            <el-form-item>
              <el-input v-model="registerHRData.companycode" placeholder="*营业执照编号和组织机构代码"></el-input>
            </el-form-item>
            <div class="box">
              <div class="left2">
                <el-form-item>
                  <el-input v-model="registerHRData.companyname" placeholder="*公司简称"></el-input>
                </el-form-item>
              </div>
              <div class="right2">
                <el-form-item>
                  <el-select v-model="registerHRData.size" placeholder="*选择人员规模">
                    <el-option label="1-20" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="half-box">
              <div class="half">
                <el-form-item>
                  <el-select v-model="registerHRData.companytype" placeholder="*选择公司行业">
                    <el-option label="IT" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="half">
                <el-form-item>
                  <el-select v-model="registerHRData.companypost" placeholder="*选择担任职位">
                    <el-option label="IT" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="next-btn-wrap2">
              <div class="cancel-btn">取消</div>
              <div class="next-btn">下一步</div>
            </div>
          </div>
        </div>
        <div class="step3">
          <div class="head">
            <div class="icon"></div>
            <div class="info">
              <p class="title">在职证明</p>
              <p class="subtitle">向大家介绍一下自己吧</p>
            </div>
          </div>
          <div class="body">
            <div class="box">
              <p class="txt">有效工作证明为以下任意一种</p>
              <p class="txt">1.名片，且带有公司全称及姓名</p>
              <p class="txt">2.工作证，且带有公司全称及姓名</p>
              <p class="txt">3.工作证明，且带有公司全称、姓名及公章</p>
              <div class="wrap">
                <div class="download">下载工作证明范本</div>
                <div class="upload-wrap">
                  <el-upload action="#">
                    <div class="upload-img-wrap">
                      <img src alt />
                    </div>
                    <div class="upload-btns">上传营业执照</div>
                  </el-upload>
                </div>
              </div>
            </div>
            <div class="bottom-btns-wrap">
              <div class="prev-btn">上一步</div>
              <div class="end-btn">开始实名认证</div>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 注册猎头 -->
    <el-dialog
      :modal-append-to-body="false"
      width="460px"
      :visible.sync="resigerHeadhunt"
      class="register-model"
    >
      <el-form class="resiger-headhunt">
        <div class="step1" v-show="true">
          <div class="head">
            <div class="icon"></div>
            <div class="info">
              <p class="title">创建招聘名片</p>
              <p class="subtitle">向大家介绍一下自己吧</p>
            </div>
          </div>
          <div class="body">
            <div class="top">
              <div class="left">
                <el-form-item>
                  <el-input v-model="registerHHData.name" placeholder="*输入姓名"></el-input>
                </el-form-item>
                <el-radio-group v-model="registerHHData.sex">
                  <el-radio label="男" value="1"></el-radio>
                  <el-radio label="女" value="2"></el-radio>
                </el-radio-group>
                <el-form-item>
                  <el-input v-model="registerHHData.email" placeholder="*输入工作邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="registerHHData.code" placeholder="邀请码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="registerHHData.time2" placeholder="*选择职业行业，最多5项"></el-input>
                </el-form-item>
              </div>
              <div class="right">
                <el-upload action="#">
                  <div class="img">
                    <img src="../assets/img/register_upload.png" alt />
                  </div>
                  <div class="upload-btns">*上传半身照</div>
                </el-upload>
                <el-form-item>
                  <el-input v-model="registerHHData.time1" placeholder="*选择职业年限"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="registerHHData.time2" placeholder="*所在地"></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item>
              <el-input v-model="registerHHData.enname" placeholder="*英文名字，第一个字母大写"></el-input>
            </el-form-item>
            <div class="next-btn-wrap">
              <div class="next-btn">下一步</div>
            </div>
          </div>
        </div>
        <div v-show="true" class="step2">
          <div class="head">
            <div class="icon"></div>
            <div class="info">
              <p class="title">创建公司信息</p>
              <p class="subtitle">向大家介绍一下自己吧</p>
            </div>
          </div>
          <div class="body">
            <el-form-item>
              <el-input v-model="registerHHData.company" placeholder="*输入完整公司名称"></el-input>
            </el-form-item>
            <div class="top img-box-wrap">
              <div class="right">
                <el-upload action="#">
                  <div class="img">
                    <img src="../assets/img/register_upload.png" alt />
                  </div>
                  <div class="upload-btns">*上传公司logo</div>
                  <p class="tips">200K以内</p>
                </el-upload>
              </div>
              <div class="right">
                <el-upload action="#">
                  <div class="img">
                    <img src="../assets/img/register_upload.png" alt />
                  </div>
                  <div class="upload-btns">*上传营业执照</div>
                  <p class="tips">500K以内</p>
                </el-upload>
              </div>
            </div>
            <el-form-item>
              <el-input v-model="registerHHData.companycode" placeholder="*营业执照编号和组织机构代码"></el-input>
            </el-form-item>
            <div class="box">
              <div class="left2">
                <el-form-item>
                  <el-input v-model="registerHHData.companyname" placeholder="*公司简称"></el-input>
                </el-form-item>
              </div>
              <div class="right2">
                <el-form-item>
                  <el-select v-model="registerHHData.size" placeholder="*选择人员规模">
                    <el-option label="1-20" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="half-box">
              <div class="half">
                <el-form-item>
                  <el-select v-model="registerHHData.companytype" placeholder="*选择公司行业">
                    <el-option label="IT" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="half">
                <el-form-item>
                  <el-select v-model="registerHHData.companypost" placeholder="*选择担任职位">
                    <el-option label="IT" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="next-btn-wrap2">
              <div class="cancel-btn">取消</div>
              <div class="next-btn">下一步</div>
            </div>
          </div>
        </div>
        <div class="step3">
          <div class="head">
            <div class="icon"></div>
            <div class="info">
              <p class="title">在职证明</p>
              <p class="subtitle">向大家介绍一下自己吧</p>
            </div>
          </div>
          <div class="body">
            <div class="box">
              <p class="txt">有效工作证明为以下任意一种</p>
              <p class="txt">1.名片，且带有公司全称及姓名</p>
              <p class="txt">2.工作证，且带有公司全称及姓名</p>
              <p class="txt">3.工作证明，且带有公司全称、姓名及公章</p>
              <div class="wrap">
                <div class="download">下载工作证明范本</div>
                <div class="upload-wrap">
                  <el-upload action="#">
                    <div class="upload-img-wrap">
                      <img src alt />
                    </div>
                    <div class="upload-btns">上传营业执照</div>
                  </el-upload>
                </div>
              </div>
            </div>
            <div class="bottom-btns-wrap">
              <div class="prev-btn">上一步</div>
              <div class="end-btn">开始实名认证</div>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 注册求职者 -->
    <el-dialog
      :modal-append-to-body="false"
      width="460px"
      :visible.sync="resigerJobSeeker"
      class="register-model"
    >
      <el-form :model="resigerJobSee" :rules="resigerJobSeekerRules" class="register-jobwant">
        <div v-show="registerStep === 'step1'" class="step1">
          <div class="head">
            <div class="icon"></div>
            <div class="title-wrap">
              <p class="title">您的基本信息</p>
              <p class="subtitle">完善基本信息后会遇到更多对你感兴趣的HR\猎头</p>
            </div>
          </div>
          <div class="body">
            <div class="box">
              <div class="left">
                <el-form-item prop="nickname">
                  <el-input v-model="resigerJobSee.nickname" placeholder="*输入姓名"></el-input>
                </el-form-item>
                <el-radio-group prop="sex" v-model="resigerJobSee.sex">
                  <el-radio label="男" value="1"></el-radio>
                  <el-radio label="女" value="2"></el-radio>
                </el-radio-group>
              </div>
              <div class="right">
                <el-upload action="#" :before-upload="onBeforeUploadHeadImage">
                  <div class="img-wrap">
                    <img :src="headimgurl" alt />
                  </div>
                </el-upload>
              </div>
            </div>
            <el-form-item>
              <el-date-picker v-model="resigerJobSee.birthday" placeholder="*选择出生年月日"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="resigerJobSee.jobs_tart" placeholder="*参加工作时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="resigerJobSee.qiuzzt" placeholder="*当前求职状态">
                <el-option label="不在职" value="1"></el-option>
                <el-option label="正在找工作/在职" value="2"></el-option>
                <el-option label="打算近期换工作" value="3"></el-option>
              </el-select>
            </el-form-item>
            <div class="bottom-btns">
              <div class="upload-resume">
                <el-upload action="#" :limit="1" :http-request="onBeforeUploadResume">
                  <div class="upload-resume-btns">上传简历</div>
                </el-upload>
              </div>
              <div class="next-btn" @click="onNextStep('step2')">下一步</div>
            </div>
          </div>
        </div>
        <div v-show="registerStep === 'step2'" class="step2">
          <div class="head">
            <div class="icon"></div>
            <div class="title-wrap">
              <p class="title">您的学历信息</p>
              <p class="subtitle">完善学历信息您将被送到更多HR\猎头眼前</p>
            </div>
          </div>
          <div class="body">
            <el-form-item>
              <el-input v-model="resigerJobSee.school_name" placeholder="*输入学校名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="resigerJobSee.edu" placeholder="*选择学历">
                <el-option label="初中及以下" value="1"></el-option>
                <el-option label="中专/技校" value="2"></el-option>
                <el-option label="高中" value="3"></el-option>
                <el-option label="大专" value="4"></el-option>
                <el-option label="本科" value="5"></el-option>
                <el-option label="硕士" value="6"></el-option>
                <el-option label="博士" value="7"></el-option>
              </el-select>
            </el-form-item>
            <el-radio-group v-model="resigerJobSee.school_type">
              <el-radio label="全日制" value="1"></el-radio>
              <el-radio label="非全日制" value="2"></el-radio>
            </el-radio-group>
            <el-form-item>
              <el-input v-model="resigerJobSee.major" placeholder="*输入所学专业"></el-input>
            </el-form-item>
            <div class="box">
              <!-- <el-form-item>
                <el-date-picker v-model="resigerJobSee.starttime" placeholder="*输入入学时间"></el-date-picker>
              </el-form-item>-->
              <el-form-item>
                <el-date-picker
                  type="date"
                  v-model="resigerJobSee.graduation_time"
                  placeholder="*选择毕业时间"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="bottom-btns">
              <div class="prev-btns" @click="onPrevStep('step1')">上一步</div>
              <div class="next-btns" @click="onNextStep('step3')">下一步</div>
            </div>
          </div>
        </div>
        <div v-show="registerStep === 'step3'" class="step3">
          <div class="head">
            <div class="icon"></div>
            <div class="title-wrap">
              <p class="title">您期望的职位</p>
              <p class="subtitle">提出您现在的条件</p>
            </div>
          </div>
          <div class="body">
            <el-form-item>
              <el-input v-model="resigerJobSee.gangwei" placeholder="*选择期望的职位"></el-input>
              <!-- <el-select v-model="resigerJobSee.gangwei" placeholder="*选择期望的职位">
                <el-option label="ddd" value="1"></el-option>
              </el-select>-->
            </el-form-item>
            <div class="box">
              <el-form-item>
                <!-- <el-select v-model="resigerJobSee.qiwxz" placeholder="*选择期望月薪"></el-select> -->
                <el-input v-model="resigerJobSee.qiwxz" placeholder="*选择期望月薪"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-select v-model="resigerJobSee.hopewages2" placeholder="*选择期望月薪"></el-select>
              </el-form-item>-->
            </div>
            <el-form-item>
              <el-input v-model="resigerJobSee.industry" placeholder="*选择期望的行业"></el-input>
              <!-- <el-select v-model="resigerJobSee.industry" placeholder="*选择期望的行业">
                <el-option label="ddd" value="1"></el-option>
              </el-select>-->
            </el-form-item>
            <div class="half-box">
              <el-form-item>
                <el-input v-model="resigerJobSee.city" placeholder="*选择期望的工作地点"></el-input>
                <!-- <el-select v-model="resigerJobSee.city" placeholder="*选择期望的工作地点">
                  <el-option label="北京" value="1"></el-option>
                </el-select>-->
              </el-form-item>
            </div>
            <el-form-item>
              <el-input
                type="textarea"
                v-model="resigerJobSee.gertc"
                class="personal-info"
                placeholder="个人优势简单描述，在个人简历详细修改"
              ></el-input>
            </el-form-item>
            <div class="bottom-btns">
              <div class="prev-btns" @click="onPrevStep('step2')">上一步</div>
              <div class="next-btns" @click="onNextStep('step4')">下一步</div>
            </div>
          </div>
        </div>
        <div v-show="registerStep === 'step4'" class="step4">
          <div class="head">
            <div class="icon"></div>
            <div class="title-wrap">
              <p class="title">您最近的一份工作经历</p>
              <p class="subtitle">填写工作经历，我们会找到适合您的工作</p>
            </div>
          </div>
          <div class="body">
            <el-form-item>
              <el-input v-model="resigerJobSee.company" placeholder="*输入公司全称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="resigerJobSee.post" placeholder="*担任职位"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="resigerJobSee.skills" placeholder="*输入职位技能"></el-input>
              <!-- <el-autocomplete
                v-model="resigerJobSee.skills"
                :fetch-suggestions="onSkill"
                placeholder="*输入职位技能"
              ></el-autocomplete>-->
            </el-form-item>
            <div class="box">
              <el-form-item>
                <el-input v-model="resigerJobSee.money" placeholder="*选择税前月薪"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-select v-model="resigerJobSee.money" placeholder="*选择税前月薪"></el-select>
              </el-form-item>-->
              <el-form-item>
                <el-input v-model="resigerJobSee.sh_money" placeholder="*选择税后月薪"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-select v-model="resigerJobSee.sh_money" placeholder="*选择税后月薪"></el-select>
              </el-form-item>-->
            </div>
            <div class="box">
              <el-form-item>
                <el-date-picker v-model="resigerJobSee.starttime" placeholder="*选择入职时间"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-date-picker v-model="resigerJobSee.endtime" placeholder="*选择入职时间"></el-date-picker>
              </el-form-item>
            </div>
            <el-form-item>
              <el-input
                type="textarea"
                v-model="resigerJobSee.content"
                placeholder="工作内容简单描述，在个人简历详情修改"
                class="personal-info"
              ></el-input>
            </el-form-item>
            <div class="box">
              <el-upload action="#" :before-upload="onBeforeUploadResume">
                <div class="upload-btns">上传简历</div>
              </el-upload>
            </div>
            <div class="bottom-btns">
              <div class="prev-btns" @click="onPrevStep('step3')">上一步</div>
              <div class="next-btns" @click="onSubmitJobsee">完成</div>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SlideVerify from '../assets/js/jq-slideVerify.js'
import { sendTelVcode, login } from '../api/api'
import { mapGetters, mapMutations } from 'vuex'
const MESSAGE_TEMPETE = 'SMS_166995245'
export default {
  name: 'Login',
  data() {
    return {
      phone: '15383262069',
      code: '413023',
      registerProtocol: false,
      sendMsgFlag: false,
      sendMsgSuccessTips: '',
      errMessage: '',
      headimgurl: '',
      resiger: false,
      resigerHr: false,
      resigerHeadhunt: false,
      resigerJobSeeker: true,
      registerStep: 'step1',
      registerHHData: {
        name: '',
        sex: '',
        email: '',
        code: '',
        time: '',
        time2: '',
        address: '',
        enname: '',
        company: '',
        companycode: '',
        companyname: '',
        companytype: '',
        companypost: ''
      },
      registerHRData: {
        name: '',
        sex: '',
        email: '',
        company: '',
        companycode: '',
        companyname: '',
        companytype: '',
        companypost: ''
      },
      resigerJobSee: {
        member_id: this.getMemberId,
        token: this.getToken,
        nickname: '',
        sex: '',
        birthday: '',
        jobs_tart: '',
        qiuzzt: '', // 求职状态(1不在职，2正在找工作/在职，3打算近期换工作)’
        school_name: '',
        edu: '', // 最高学历（1初中及以下 2中专/技校 3高中 4大专 5本科 6硕士 7博士）
        school_type: '', // 学习类型 1全日制 2非全日制
        major: '',
        graduation_time: '',
        company: '',
        post: '',
        skills: '',
        money: '',
        sh_money: '',
        starttime: '',
        endtime: '',
        content: '',
        qiwxz: '',
        gangwei: '',
        industry: '',
        city: '',
        gertc: '',
        headimgurl: '',
        profile_file_url: ''
      },
      resigerJobSeekerRules: {
        nickname: [{ required: true, message: '', trigger: 'change' }],
        sex: [{ required: true, message: '', trigger: 'change' }],
        birthday: [{ required: true, message: '', trigger: 'change' }],
        jobs_tart: [{ required: true, message: '', trigger: 'change' }],
        qiuzzt: [{ required: true, message: '', trigger: 'change' }],
        school_name: [{ required: true, message: '', trigger: 'change' }],
        edu: [{ required: true, message: '', trigger: 'change' }],
        school_type: [{ required: true, message: '', trigger: 'change' }],
        major: [{ required: true, message: '', trigger: 'change' }],
        graduation_time: [{ required: true, message: '', trigger: 'change' }],
        company: [{ required: true, message: '', trigger: 'change' }],
        post: [{ required: true, message: '', trigger: 'change' }],
        skills: [{ required: true, message: '', trigger: 'change' }],
        money: [{ required: true, message: '', trigger: 'change' }],
        sh_money: [{ required: true, message: '', trigger: 'change' }],
        starttime: [{ required: true, message: '', trigger: 'change' }],
        endtime: [{ required: true, message: '', trigger: 'change' }],
        content: [{ required: true, message: '', trigger: 'change' }],
        qiwxz: [{ required: true, message: '', trigger: 'change' }],
        gangwei: [{ required: true, message: '', trigger: 'change' }],
        industry: [{ required: true, message: '', trigger: 'change' }],
        city: [{ required: true, message: '', trigger: 'change' }],
        wages2: [{ required: true, message: '', trigger: 'change' }],
        gertc: [{ required: true, message: '', trigger: 'change' }],
        headimgurl: [{ required: true, message: '', trigger: 'change' }],
        profile_file_url: [{ required: true, message: '', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['getMemberId', 'getToken'])
  },
  mounted: function() {
    var that = this
    // var SlideVerifyPlug = window.slideVerifyPlug
    var slideVerify = new SlideVerify('#verify-wrap', {
      wrapWidth: '100%', //设置 容器的宽度 ，默认为 350 ，也可不用设，你自己css 定义好也可以，插件里面会取一次这个 容器的宽度
      initText: '按住滑块拖动到最右侧', //设置  初始的 显示文字
      sucessText: '验证通过', //设置 验证通过 显示的文字
      getSucessState: function(res) {
        if (res) {
          that.sendMsgFlag = true
        }
        //当验证完成的时候 会 返回 res 值 true，只留了这个应该够用了
      }
    })
  },
  methods: {
    tab_page: function(e) {
      var index = $(e.target).index()
      $(e.target)
        .addClass('cur')
        .siblings()
        .removeClass('cur')
      if (index == 0) {
        $('.one').show()
        $('.two').hide()
      } else if (index == 1) {
        $('.two').show()
        $('.one').hide()
      }
    },
    sendMsg() {
      if (this.sendMsgFlag) {
        sendTelVcode({
          phone_number: this.phone,
          templateCode: MESSAGE_TEMPETE
        })
          .then(res => {
            if (res.code === 200) {
              this.sendMsgSuccessTips = '验证码发送成功'
            } else {
              this.errMessage = res.message
            }
          })
          .catch(err => {
            this.errMessage = err.message
          })
      }
    },
    onSelectUserType(type) {
      // 用户类型 1求职者，2hr，3猎头，4兼职猎头
      type === '1' && (this.resigerJobSeeker = true)
      type === '2' && (this.resigerHr = true)
      type === '3' && (this.resigerHeadhunt = true)
      this.resiger = false
    },
    onLogin() {
      if (!this.phone || !this.code) {
        return
      }

      if (!this.registerProtocol) {
        this.errMessage = '请选择同意注册协议'
        return
      }
      this.resiger = true //用于测试 不走接口
      // login({
      //   mobile: this.phone,
      //   vcode: this.code
      // })
      //   .then(res => {
      //     // 用户类型是空也进入了登录页面，处理异常情况
      //     if ((res.code === 200 && !res.data.type) || res.code === 40011) {
      //       this.resiger = true
      //     } else if (res.code === 200) {
      //       this.syncSetToken(res.data.token)
      //       this.syncSetUsetType(res.data.type)
      //       this.syncSetMemberId(res.data.member_id)
      //       this.$router.push('/user')
      //     } else {
      //       this.errMessage = res.message
      //     }
      //   })
      //   .catch(res => {
      //     this.errMessage = res.message
      //   })
    },
    onPrevStep(step) {
      this.registerStep = step
    },
    onNextStep(step) {
      this.registerStep = step
    },

    onSkill(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      cb([{ value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' }])
    },
    onPreviewAvatar(file) {
      //预览头像
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.addEventListener('load', e => {
        this.headimgurl = e.target.result
      })
    },
    onBeforeUploadHeadImage(file) {
      // 头像上传后校验
      this.onPreviewAvatar(file)
      this.resigerJobSee.headimgurl = file
      return false
    },
    onBeforeUploadResume(file) {
      // 上传简历
      this.resigerJobSee.profile_file_url = file.file
    },
    onSubmitJobsee() {
      // 提交注册求职人员
      console.log(this.resigerJobSee)
    },

    ...mapMutations(['syncSetToken', 'syncSetUsetType', 'syncSetMemberId'])
  }
}
</script>

<style lang="scss">
@import '../assets/css/login.css';
.vcode-wrap {
  position: relative;
  display: flex;
  & > input {
    flex: 1;
  }
  .error-message {
    position: absolute;
    left: 0;
    bottom: -30px;
    right: 0;
    font-size: 14px;
    line-height: 24px;
    color: #ff7272;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    &.success-color {
      color: #2db353;
    }
  }
}
.login-btn,
.get-vcode {
  cursor: pointer;
}
.el-dialog__header {
  height: 0;
  padding: 0;
}
.el-dialog__body {
  padding: 0;
}
.register {
  background: #f5f5f6;
  & > .title {
    padding-top: 18px;
    font-size: 22px;
    line-height: 46px;
    text-align: center;
    color: #303030;
  }
  .list {
    padding-bottom: 40px;
    & > .item {
      display: flex;
      margin: 30px auto;
      width: 342px;
      height: 92px;
      border-radius: 5px;
      background: #fff;
      align-items: center;
      cursor: pointer;
      .avatar {
        margin-left: 50px;
        margin-top: 14px;
        width: 58px;
        height: 64px;
        & > img {
          display: block;
          width: 58px;
          height: 64px;
        }
      }
      .info {
        margin-left: 75px;
        position: relative;
        font-size: 22px;
        line-height: 40px;
        &::after {
          content: '';
          position: absolute;
          top: 13px;
          right: -32px;
          width: 8px;
          height: 14px;
          background: url(../assets/img/next_icon.png) no-repeat 0 0;
        }
      }
    }
  }
}
.el-dialog {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.register-model {
  .el-dialog__headerbtn {
    display: none;
  }
}
.resiger-headhunt {
  background-size: #f2f2f2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .head {
    padding-left: 41px;
    padding-right: 20px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    text-align: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #f06359;
    & > .icon {
      width: 54px;
      height: 58px;
      background: url(../assets/img/zhaopin@2x.png) no-repeat 0 -5px;
      background-size: 54px 58px;
    }
    .info {
      padding-left: 6px;
      & > .title {
        font-size: 20px;
        line-height: 30px;
        color: #fff;
      }
      & > .subtitle {
        font-size: 14px;
        line-height: 24px;
        color: #fff;
      }
    }
  }
  .step1 {
    .body {
      padding: 30px 38px 24px 44px;
      background: #f2f2f2;
      .el-input__inner {
        border-radius: 0;
      }
      & > .top {
        display: flex;
        text-align: left;
        .left {
          margin-right: 15px;
          padding-top: 18px;
          width: 182px;
          .el-radio-group {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .el-radio {
              margin-right: 0;
              &.is-checked {
                .el-radio__label {
                  background: #f06359;
                  color: #fff;
                }
              }
            }
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              display: block;
              padding-left: 0;
              width: 84px;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              color: #abacac;
              text-align: center;
              background: #fff;
            }
          }
        }
        .right {
          width: 180px;
          .el-upload__input {
            display: none;
          }
          .img {
            margin-left: 58px;
            width: 104px;
            height: 138px;
            & > img {
              display: block;
              width: 104px;
              height: 138px;
            }
          }
          .upload-btns {
            margin-left: 58px;
            margin-bottom: 24px;
            width: 104px;
            height: 40px;
            border: 1px solid #f06359;
            font-size: 14px;
            line-height: 40px;
            color: #f06359;
            text-align: center;
            background-color: #fff;
          }
        }
      }
      & > .next-btn-wrap {
        display: flex;
        justify-content: flex-end;
        .next-btn {
          width: 140px;
          height: 38px;
          font-size: 14px;
          line-height: 38px;
          color: #fff;
          background: #f06359;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
  .step2 {
    @extend .step1;
    .head {
      & > .icon {
        background: url(../assets/img/gongsi.png) no-repeat 0 0;
        background-size: 65px 61px;
      }
    }
    .body {
      .top {
        &.img-box-wrap {
          .right {
            flex: 1;
            .img {
              margin-left: 42px;
            }
            .upload-btns {
              margin-left: 42px;
            }
            .tips {
              margin-bottom: 10px;
              padding-left: 42px;
              margin-top: -20px;
              font-size: 12px;
              line-height: 20px;
              color: #9a9a9a;
              text-align: left;
            }
          }
        }
      }
      .box {
        display: flex;
        text-align: left;
        .left2 {
          margin-right: 14px;
          width: 228px;
        }
        .right2 {
          flex: 1;
        }
      }
      .half-box {
        display: flex;
        .half {
          flex: 1;
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }
      .next-btn-wrap2 {
        display: flex;
        justify-content: space-between;
        .cancel-btn {
          width: 140px;
          height: 38px;
          border: 1px solid #f06359;
          color: #f06359;
          font-size: 14px;
          line-height: 38px;
          background: #fff;
          cursor: pointer;
        }
        .next-btn {
          width: 140px;
          height: 38px;
          border: 1px solid #f06359;
          color: #fff;
          font-size: 14px;
          line-height: 38px;
          background: #f06359;
          cursor: pointer;
        }
      }
    }
  }
  .step3 {
    .head {
      & > .icon {
        background: url(../assets/img/kuaijietongdao_zaizhizhengming@2x.png)
          no-repeat 0 0;
        background-size: 54px 58px;
      }
    }
    .body {
      .box {
        margin: 36px auto 0;
        .txt {
          padding-left: 116px;
          font-size: 16px;
          line-height: 24px;
          color: #303030;
          text-align: left;
          &:nth-child(1) {
            line-height: 36px;
          }
        }
        .wrap {
          width: 134px;
          margin: 14px auto 0;
          .download {
            width: 132px;
            height: 36px;
            margin: 12px auto 0;
            border: 1px solid #f06359;
            font-size: 14px;
            line-height: 36px;
            text-align: center;
            background: #fff;
            color: #f06359;
            cursor: pointer;
          }
          .upload-wrap {
            margin-top: 12px;
            .upload-img-wrap {
              width: 134px;
              height: 134px;
              background: url(../assets/img/p_card.png) no-repeat 0 0;
              background-size: 134px 134px;
            }
            .el-upload__input {
              display: none;
            }
            .upload-btns {
              margin-top: 10px;
              margin-bottom: 38px;
              width: 134px;
              height: 36px;
              border: 1px solid #f06359;
              font-size: 14px;
              line-height: 36px;
              color: #f06359;
              text-align: center;
              background-color: #fff;
            }
          }
        }
      }
      .bottom-btns-wrap {
        width: 382px;
        margin: 0 auto;
        padding-bottom: 29px;
        display: flex;
        justify-content: space-between;
        .prev-btn {
          width: 140px;
          height: 36px;
          background: #fff;
          font-size: 14px;
          line-height: 36px;
          color: #f06359;
          text-align: center;
          border: 1px solid #f06359;
          cursor: pointer;
        }
        .end-btn {
          @extend .prev-btn;
          background: #f06359;
          color: #fff;
        }
      }
    }
  }
}
.resiger-hr {
  @extend .resiger-headhunt;
  .head {
    & > .icon {
      width: 50px;
      height: 50px;
      background: #f06358;
      border: 1px solid #fff;
    }
  }
  .step2 {
    .head {
      .icon {
        background: #f06358;
      }
    }
  }
  .step3 {
    .head {
      .icon {
        background: #f06358;
      }
    }
  }
}
.register-jobwant {
  .head {
    padding-left: 41px;
    padding-right: 20px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    text-align: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #f06359;
    & > .icon {
      width: 50px;
      height: 50px;
      background: #f06359;
      border: 1px solid #fff;
    }
    .title-wrap {
      padding-left: 6px;
      & > .title {
        font-size: 20px;
        line-height: 30px;
        color: #fff;
      }
      & > .subtitle {
        font-size: 14px;
        line-height: 24px;
        color: #fff;
      }
    }
  }
  .el-input__inner {
    border-radius: 0;
  }
  .body {
    padding: 40px;
    background: #f2f2f2;
    .el-upload__input {
      display: none;
    }
    .box {
      display: flex;
      text-align: left;
      justify-content: space-between;
      padding-bottom: 25px;
      .left {
        width: 180px;
        & > .el-radio-group {
          .el-radio {
            margin-right: 0;
            .el-radio__input {
              display: none;
            }
            .el-radio__label {
              display: block;
              padding: 0;
              width: 86px;
              height: 40px;
              background: #fff;
              font-size: 14px;
              line-height: 40px;
              text-align: center;
            }
            &:nth-child(1) {
              margin-right: 8px;
            }
            &.is-checked {
              .el-radio__label {
                color: #fff;
                background: #f06359;
              }
            }
          }
        }
      }
      .right {
        float: none;
        & > div {
          width: 104px;
          margin-right: 18px;
        }
        .img-wrap {
          width: 104px;
          height: 104px;
          background: url(../assets/img/upload_bg.png) no-repeat 0 0;
          background-size: 104px 104px;
          & > img {
            display: block;
            width: 104px;
            height: 104px;
          }
        }
      }
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .bottom-btns {
      padding-top: 38px;
      .upload-resume {
        margin-left: 240px;
        width: 140px;
        height: 38px;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        border: 1px solid #f06359;
        background: #fff;
        color: #f06359;
        cursor: pointer;
      }
      .next-btn {
        @extend .upload-resume;
        margin-top: 10px;
        background: #f06359;
        color: #fff;
      }
    }
  }
  .step2 {
    .body {
      .el-radio-group {
        white-space: nowrap;
        margin-bottom: 20px;
        .el-radio {
          &:nth-child(1) {
            margin-right: 20px;
          }
          .el-radio__input {
            display: none;
          }
          .el-radio__label {
            display: block;
            padding-left: 0;
            margin: 0;
            width: 180px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
            background: #fff;
          }
          &.is-checked {
            .el-radio__label {
              background: #f06359;
              color: #fff;
            }
          }
        }
      }
      .box {
        .el-form-item {
          &:nth-child(1) {
            margin-right: 20px;
          }
        }
      }
      .bottom-btns {
        padding-top: 32px;
        display: flex;
        justify-content: space-between;
        .prev-btns {
          width: 140px;
          height: 38px;
          border: 1px solid #f06359;
          font-size: 14px;
          line-height: 38px;
          text-align: center;
          background: #fff;
          color: #f06359;
          cursor: pointer;
        }
        .next-btns {
          @extend .prev-btns;
          background: #f06359;
          color: #fff;
        }
      }
    }
  }
  .step3 {
    @extend .step2;
    .half-box {
      width: 180px;
    }
    .personal-info {
      height: 180px;
      & > .el-textarea__inner {
        resize: none;
        height: 180px;
        border-radius: 0;
      }
    }
  }
  .step4 {
    @extend .step3;
    .el-autocomplete {
      width: 100%;
    }
    .box {
      .upload-btns {
        width: 140px;
        height: 38px;
        border: 1px solid #f06359;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        background: #fff;
        color: #f06359;
        cursor: pointer;
      }
    }
    .body {
      .bottom-btns {
        padding-top: 0;
      }
    }
  }
}
</style>