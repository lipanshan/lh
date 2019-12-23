<template>
  <div class="login-wrap">
    <div class="window">
      <p>欢迎登录</p>
      <ul>
        <li @click="tab_page('one')" :class="{'cur': tag === 'one'}">短信注册/登陆</li>
        <li @click="tab_page('two')" :class="{'cur': tag === 'two'}">扫码登陆</li>
      </ul>
      <div v-show="tag === 'one'" class="one">
        <div>
          <img src="../assets/img/mobile2.png" alt />
          <input type="text" maxlength="11" v-model="phone" />
        </div>
        <div class="verify-wrap" id="verify-wrap"></div>
        <div class="vcode-wrap">
          <img src="../assets/img/safe.png" alt />
          <input type="text" maxlength="6" v-model="code" />
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
            <router-link target="_blank" to="/registerintro">《注册协议》</router-link>
          </span>
        </p>
      </div>
      <div v-show="tag === 'two'" class="two">
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
        <el-form
          :model="registerHRData"
          :rules="registerHRDataRules"
          ref="registerHRWrap"
          class="resiger-hr"
        >
          <div class="step1" v-show="registerStep === 'step1'">
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
                  <el-form-item prop="nickname">
                    <el-input v-model="registerHRData.nickname" placeholder="*姓名"></el-input>
                  </el-form-item>
                  <el-form-item prop="sex">
                    <el-radio-group v-model="registerHRData.sex">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item prop="email">
                    <el-input v-model="registerHRData.email" placeholder="*工作邮箱"></el-input>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-upload action="#" :before-upload="onBeforeUploadHeadimgurl1">
                    <div class="img">
                      <img :src="headimgurl1" alt />
                    </div>
                    <div class="upload-btns">*上传</div>
                  </el-upload>
                </div>
              </div>
              <div class="next-btn-wrap">
                <div class="next-btn" @click="onNextStep('step2')">下一步</div>
              </div>
            </div>
          </div>
          <div v-show="registerStep === 'step2'" class="step2">
            <div class="head">
              <div class="icon"></div>
              <div class="info">
                <p class="title">创建公司信息</p>
                <p class="subtitle">向大家介绍一下自己吧</p>
              </div>
            </div>
            <div class="body">
              <el-form-item prop="company_name">
                <el-input v-model="registerHRData.company_name" placeholder="*完整公司名称"></el-input>
              </el-form-item>
              <div class="top img-box-wrap">
                <div class="right">
                  <el-upload action="#" :before-upload="onBeforeUploadheadimgurl2">
                    <div class="img">
                      <img :src="headimgurl2" alt />
                    </div>
                    <div class="upload-btns">*上传公司logo</div>
                    <p class="tips">200K以内</p>
                  </el-upload>
                </div>
                <div class="right">
                  <el-upload action="#" :before-upload="onBeforeUploadheadimgurl3">
                    <div class="img">
                      <img :src="headimgurl3" alt />
                    </div>
                    <div class="upload-btns">*上传营业执照</div>
                    <p class="tips">500K以内</p>
                  </el-upload>
                </div>
              </div>
              <el-form-item prop="institution">
                <el-input v-model="registerHRData.institution" placeholder="*营业执照编号和组织机构代码"></el-input>
              </el-form-item>
              <div class="box">
                <div class="left2">
                  <el-form-item prop="company_short_name">
                    <el-input v-model="registerHRData.company_short_name" placeholder="*公司简称"></el-input>
                  </el-form-item>
                </div>
                <div class="right2">
                  <el-form-item prop="employee_num">
                    <el-select v-model="registerHRData.employee_num" placeholder="*选择人员规模">
                      <el-option label="0-20人" value="1"></el-option>
                      <el-option label="20-99人" value="2"></el-option>
                      <el-option label="100-499人" value="3"></el-option>
                      <el-option label="500-999人" value="4"></el-option>
                      <el-option label="1000-9999人" value="5"></el-option>
                      <el-option label="10000以上" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="half-box">
                <div class="half">
                  <el-form-item prop="industry">
                    <el-select v-model="registerHRData.industry" placeholder="*选择公司行业">
                      <el-option
                        v-for="item in industryList"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item prop="position">
                    <el-select v-model="registerHRData.position" placeholder="*选择担任职位">
                      <el-option
                        v-for="item in postList"
                        :value="item.c_id"
                        :key="item.c_id"
                        :label="item.class_name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="next-btn-wrap2">
                <div class="cancel-btn" @click="onPrevStep('step1')">上一步</div>
                <div class="next-btn" @click="onNextStep('step3')">下一步</div>
              </div>
            </div>
          </div>
          <div class="step3" v-show="registerStep === 'step3'">
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
                  <!-- <div class="download">下载工作证明范本</div> -->
                  <div class="upload-wrap">
                    <el-upload action="#" :before-upload="onBeforeUploadheadimgurl4">
                      <div class="upload-img-wrap">
                        <img :src="headimgurl4" alt />
                      </div>
                      <div class="upload-btns">上传工作证明</div>
                    </el-upload>
                  </div>
                </div>
              </div>
              <div class="bottom-btns-wrap">
                <div class="prev-btn" @click="onPrevStep('step2')">上一步</div>
                <div class="end-btn" @click="onCertificationHR">开始实名认证</div>
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
        <el-form
          :model="registerHHData"
          :rules="registerHHDataRules"
          ref="registerHHWrap"
          class="resiger-headhunt"
        >
          <div class="step1" v-show="registerStep === 'step1'">
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
                  <el-form-item prop="nickname">
                    <el-input v-model="registerHHData.nickname" placeholder="*姓名"></el-input>
                  </el-form-item>
                  <el-radio-group v-model="registerHHData.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                  <el-form-item prop="email">
                    <el-input v-model="registerHHData.email" placeholder="*工作邮箱"></el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input v-model="registerHHData.code" placeholder="邀请码"></el-input>
                  </el-form-item>
                  <el-form-item prop="zy_industry">
                    <el-select
                      v-model="registerHHData.zy_industry"
                      :multiple-limit="5"
                      multiple
                      placeholder="*职业行业，最多5项"
                    >
                      <el-option
                        v-for="item in industryList"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="right">
                  <el-upload action="#" :before-upload="onBeforeUploadheadimgurl5">
                    <div class="img">
                      <img :src="headimgurl5" alt />
                    </div>
                    <div class="upload-btns">*上传半身照</div>
                  </el-upload>
                  <el-form-item prop="op_years">
                    <el-select v-model="registerHHData.op_years" placeholder="*职业年限">
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
                  <el-form-item prop="city">
                    <el-cascader
                      v-model="registerHHData.city"
                      placeholder="*选择所在地"
                      :options="addressList"
                      :props="{
                      value: 'name',
                      label: 'name',
                      children: 'data_list'
                    }"
                      value="name"
                      label="name"
                      children="data_list"
                    >
                      <template slot-scope="{ node, data }">
                        <span>{{ data.name }}</span>
                      </template>
                    </el-cascader>
                  </el-form-item>
                </div>
              </div>
              <el-form-item prop="en_name">
                <el-input v-model="registerHHData.en_name" placeholder="*英文名字，第一个字母大写"></el-input>
              </el-form-item>
              <div class="next-btn-wrap">
                <div class="next-btn" @click="onNextStep('step2')">下一步</div>
              </div>
            </div>
          </div>
          <div v-show="registerStep === 'step2'" class="step2">
            <div class="head">
              <div class="icon"></div>
              <div class="info">
                <p class="title">创建公司信息</p>
                <p class="subtitle">向大家介绍一下自己吧</p>
              </div>
            </div>
            <div class="body">
              <el-form-item prop="company_name">
                <el-input v-model="registerHHData.company_name" placeholder="*完整公司名称"></el-input>
              </el-form-item>
              <div class="top img-box-wrap">
                <div class="right">
                  <el-upload action="#" :before-upload="onBeforeUploadheadimgurl6">
                    <div class="img">
                      <img :src="headimgurl6" alt />
                    </div>
                    <div class="upload-btns">*上传公司logo</div>
                    <p class="tips">200K以内</p>
                  </el-upload>
                </div>
                <div class="right">
                  <el-upload action="#" :before-upload="onBeforeUploadheadimgurl7">
                    <div class="img">
                      <img :src="headimgurl7" alt />
                    </div>
                    <div class="upload-btns">*上传营业执照</div>
                    <p class="tips">500K以内</p>
                  </el-upload>
                </div>
              </div>
              <el-form-item prop="institution">
                <el-input v-model="registerHHData.institution" placeholder="*营业执照编号和组织机构代码"></el-input>
              </el-form-item>
              <div class="box">
                <div class="left2">
                  <el-form-item prop="company_short_name">
                    <el-input v-model="registerHHData.company_short_name" placeholder="*公司简称"></el-input>
                  </el-form-item>
                </div>
                <div class="right2">
                  <el-form-item prop="employee_num">
                    <el-select v-model="registerHHData.employee_num" placeholder="*选择人员规模">
                      <el-option label="0-20人" value="1"></el-option>
                      <el-option label="20-99人" value="2"></el-option>
                      <el-option label="100-499人" value="3"></el-option>
                      <el-option label="500-999人" value="4"></el-option>
                      <el-option label="1000-9999人" value="5"></el-option>
                      <el-option label="10000以上" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="half-box">
                <div class="half">
                  <el-form-item prop="industry">
                    <el-select v-model="registerHHData.industry" placeholder="*选择公司行业">
                      <el-option
                        v-for="item in industryList"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item prop="position">
                    <el-select v-model="registerHHData.position" placeholder="*担任职位">
                      <el-option
                        v-for="item in postList"
                        :value="item.c_id"
                        :key="item.c_id"
                        :label="item.class_name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="next-btn-wrap2">
                <div class="cancel-btn" @click="onPrevStep('step1')">上一步</div>
                <div class="next-btn" @click="onNextStep('step3')">下一步</div>
              </div>
            </div>
          </div>
          <div class="step3" v-show="registerStep === 'step3'">
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
                  <a :href="workProofUrl" class="download">下载工作证明范本</a>
                  <!-- <div class="download">下载工作证明范本</div> -->
                  <div class="upload-wrap">
                    <el-upload action="#" :before-upload="onBeforeUploadheadimgurl8">
                      <div class="upload-img-wrap">
                        <img :src="headimgurl8" alt />
                      </div>
                      <div class="upload-btns">上传营业执照</div>
                    </el-upload>
                  </div>
                </div>
              </div>
              <div class="bottom-btns-wrap">
                <div class="prev-btn" @click="onPrevStep('step2')">上一步</div>
                <div class="end-btn" @click="onCertificationHH">开始实名认证</div>
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
        <el-form
          :model="resigerJobSee"
          :rules="resigerJobSeekerRules"
          ref="resigerJobSeeWrap"
          class="register-jobwant"
        >
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
                    <el-input v-model="resigerJobSee.nickname" placeholder="*姓名"></el-input>
                  </el-form-item>
                  <el-radio-group prop="sex" v-model="resigerJobSee.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
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
              <el-form-item prop="birthday">
                <el-date-picker
                  v-model="resigerJobSee.birthday"
                  value-format="timestamp"
                  placeholder="*选择出生年月日"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="jobs_tart">
                <el-date-picker
                  value-format="timestamp"
                  v-model="resigerJobSee.jobs_tart"
                  placeholder="*参加工作时间"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="qiuzzt">
                <el-select v-model="resigerJobSee.qiuzzt" placeholder="*当前求职状态">
                  <el-option label="不在职" value="1"></el-option>
                  <el-option label="正在找工作/在职" value="2"></el-option>
                  <el-option label="打算近期换工作" value="3"></el-option>
                </el-select>
              </el-form-item>
              <div class="bottom-btns">
                <div class="upload-resume">
                  <el-upload
                    action="#"
                    :limit="1"
                    :show-file-list="false"
                    :before-upload="onBeforeUploadResume"
                  >
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
              <el-form-item prop="school_name">
                <el-input v-model="resigerJobSee.school_name" placeholder="*学校名称"></el-input>
              </el-form-item>
              <el-form-item prop="edu">
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
              <el-radio-group prop="school_type" v-model="resigerJobSee.school_type">
                <el-radio label="1">全日制</el-radio>
                <el-radio label="2">非全日制</el-radio>
              </el-radio-group>
              <el-form-item prop="major">
                <el-input v-model="resigerJobSee.major" placeholder="*所学专业"></el-input>
              </el-form-item>
              <div class="box">
                <el-form-item prop="graduation_time">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
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
              <el-form-item prop="gangwei">
                <el-select v-model="resigerJobSee.gangwei" placeholder="*选择期望的职位">
                  <el-option
                    v-for="item in postList"
                    :value="item.c_id"
                    :key="item.c_id"
                    :label="item.class_name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div class="box">
                <el-form-item prop="qiwxz">
                  <el-select v-model="resigerJobSee.qiwxz" placeholder="薪资要求">
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
              </div>
              <el-form-item prop="industry">
                <el-select v-model="resigerJobSee.industry" placeholder="*选择期望的行业">
                  <el-option
                    v-for="item in industryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div class="half-box">
                <el-form-item prop="city">
                  <el-cascader
                    v-model="resigerJobSee.city"
                    placeholder="*选择期望的工作地点"
                    :options="addressList"
                    :props="{
                      value: 'name',
                      label: 'name',
                      children: 'data_list'
                    }"
                    value="name"
                    label="name"
                    children="data_list"
                  >
                    <template slot-scope="{ node, data }">
                      <span>{{ data.name }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </div>
              <el-form-item prop="gertc">
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
              <el-form-item prop="company">
                <el-input v-model="resigerJobSee.company" placeholder="*公司全称"></el-input>
              </el-form-item>
              <el-form-item prop="post">
                <el-select v-model="resigerJobSee.post" placeholder="*选择担任职位">
                  <el-option
                    v-for="item in postList"
                    :value="item.c_id"
                    :key="item.c_id"
                    :label="item.class_name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="skills">
                <el-input v-model="resigerJobSee.skills" placeholder="*职位技能"></el-input>
                <!-- <el-autocomplete
                v-model="resigerJobSee.skills"
                :fetch-suggestions="onSkill"
                placeholder="*职位技能"
                ></el-autocomplete>-->
              </el-form-item>
              <div class="box">
                <el-form-item prop="money">
                  <el-input v-model.number="resigerJobSee.money" maxlength="9" placeholder="*税前月薪"></el-input>
                </el-form-item>
                <el-form-item prop="sh_money">
                  <el-input
                    v-model.number="resigerJobSee.sh_money"
                    maxlength="9"
                    placeholder="*税后月薪"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="box">
                <el-form-item prop="starttime">
                  <el-date-picker
                    value-format="timestamp"
                    v-model="resigerJobSee.starttime"
                    placeholder="*选择入职时间"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="endtime">
                  <el-date-picker
                    value-format="timestamp"
                    v-model="resigerJobSee.endtime"
                    placeholder="*选择离职时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <el-form-item prop="content">
                <el-input
                  type="textarea"
                  v-model="resigerJobSee.content"
                  placeholder="工作内容简单描述，在个人简历详情修改"
                  class="personal-info"
                ></el-input>
              </el-form-item>
              <div class="box">
                <el-upload action="#" :show-file-list="false" :before-upload="onBeforeUploadResume">
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
  </div>
</template>

<script>
// import SlideVerify from '../assets/js/jq-slideVerify.js'
import '../assets/js/verify.js'
import {
  sendTelVcode,
  login,
  registerJobseeUser,
  registerHRUser,
  registerHHUser,
  getAllPost, // 职位
  getAllAddress, // 地区
  getAllIndustry // 行业
} from '../api/api'
import { mapGetters, mapMutations } from 'vuex'
const MESSAGE_TEMPETE = 'SMS_166995245'
export default {
  name: 'Login',
  data() {
    return {
      workProofUrl: '',
      phone: '',
      code: '',
      registerProtocol: false,
      sendMsgFlag: false,
      sendMsgSuccessTips: '',
      errMessage: '',
      headimgurl: '',
      headimgurl1: '',
      headimgurl2: '',
      headimgurl3: '',
      headimgurl4: '',
      headimgurl5: '',
      headimgurl6: '',
      headimgurl7: '',
      headimgurl8: '',
      headimgurl9: '',
      postList: [],
      addressList: [],
      industryList: [],
      resiger: false,
      resigerHr: false,
      resigerHeadhunt: false,
      resigerJobSeeker: false,
      registerStep: 'step1',
      registerHHData: {
        member_id: '',
        nickname: '',
        sex: '',
        email: '',
        code: '',
        zy_industry: '',
        en_name: '',
        op_years: '',
        city: '',
        company_name: '',
        institution: '',
        employee_num: '',
        company_short_name: '',
        industry: '',
        position: '',
        headimgurl: '',
        logo: '',
        q_pic: '',
        h_pic: '',
        uploadFileSign: ['headimgurl', 'logo', 'q_pic', 'h_pic']
      },
      registerHHDataRules: {
        nickname: [
          {
            required: true,
            message: ''
          }
        ],
        sex: [
          {
            required: true,
            message: ''
          }
        ],
        email: [
          {
            required: true,
            message: ''
          }
        ],
        code: [
          {
            required: true,
            message: ''
          }
        ],
        en_name: [
          {
            required: true,
            message: ''
          }
        ],
        zy_industry: [
          {
            required: true,
            message: ''
          }
        ],
        op_years: [
          {
            required: true,
            message: ''
          }
        ],
        city: [
          {
            required: true,
            message: ''
          }
        ],
        company_name: [
          {
            required: true,
            message: ''
          }
        ],
        institution: [
          {
            required: true,
            message: ''
          }
        ],
        employee_num: [
          {
            required: true,
            message: ''
          }
        ],
        company_short_name: [
          {
            required: true,
            message: ''
          }
        ],
        industry: [
          {
            required: true,
            message: ''
          }
        ],
        position: [
          {
            required: true,
            message: ''
          }
        ],
        headimgurl: [
          {
            required: true,
            message: ''
          }
        ],
        logo: [
          {
            required: true,
            message: ''
          }
        ],
        q_pic: [
          {
            required: true,
            message: ''
          }
        ],
        h_pic: [
          {
            required: true,
            message: ''
          }
        ]
      },
      registerHRData: {
        member_id: '',
        nickname: '',
        sex: '',
        email: '',
        company_name: '',
        institution: '',
        employee_num: '',
        company_short_name: '',
        industry: '',
        position: '',
        headimgurl: '',
        logo: '',
        q_pic: '',
        h_pic: '',
        uploadFileSign: ['headimgurl', 'logo', 'q_pic', 'h_pic']
      },
      registerHRDataRules: {
        nickname: [
          {
            required: true,
            message: ''
          }
        ],
        sex: [
          {
            required: true,
            message: ''
          }
        ],
        email: [
          {
            required: true,
            message: ''
          }
        ],
        company_name: [
          {
            required: true,
            message: ''
          }
        ],
        institution: [
          {
            required: true,
            message: ''
          }
        ],
        employee_num: [
          {
            required: true,
            message: ''
          }
        ],
        company_short_name: [
          {
            required: true,
            message: ''
          }
        ],
        industry: [
          {
            required: true,
            message: ''
          }
        ],
        position: [
          {
            required: true,
            message: ''
          }
        ],
        headimgurl: [
          {
            required: true,
            message: ''
          }
        ],
        logo: [
          {
            required: true,
            message: ''
          }
        ],
        q_pic: [
          {
            required: true,
            message: ''
          }
        ],
        h_pic: [
          {
            required: true,
            message: ''
          }
        ]
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
        qiwxz: null,
        gangwei: '',
        industry: '',
        city: '',
        gertc: '',
        headimgurl: '',
        profile_file_url: '',
        uploadFileSign: ['profile_file_url', 'headimgurl']
      },
      resigerJobSeekerRules: {
        nickname: [
          {
            required: true,
            message: ''
          }
        ],
        sex: [
          {
            required: true,
            message: ''
          }
        ],
        birthday: [
          {
            required: true,
            message: ''
          }
        ],
        jobs_tart: [
          {
            required: true,
            message: ''
          }
        ],
        qiuzzt: [
          {
            required: true,
            message: '',
            validator: this.onValidateSelect
          }
        ], // 求职状态(1不在职，2正在找工作/在职，3打算近期换工作)’
        school_name: [
          {
            required: true,
            message: ''
          }
        ],
        edu: [
          {
            required: true,
            message: '',
            validator: this.onValidateSelect
          }
        ], // 最高学历（1初中及以下 2中专/技校 3高中 4大专 5本科 6硕士 7博士）
        school_type: [
          {
            required: true,
            message: ''
          }
        ], // 学习类型 1全日制 2非全日制
        major: [
          {
            required: true,
            message: ''
          }
        ],
        graduation_time: [
          {
            required: true,
            message: ''
          }
        ],
        company: [
          {
            required: true,
            message: ''
          }
        ],
        post: [
          {
            required: true,
            message: ''
          }
        ],
        skills: [
          {
            required: true,
            message: ''
          }
        ],
        money: [
          {
            required: true,
            message: '',
            type: 'number'
          }
        ],
        sh_money: [
          {
            required: true,
            message: '',
            type: 'number'
          }
        ],
        starttime: [
          {
            required: true,
            message: ''
          }
        ],
        endtime: [
          {
            required: true,
            message: ''
          }
        ],
        content: [
          {
            required: true,
            message: ''
          }
        ],
        qiwxz: [
          {
            required: true,
            message: ''
          }
        ],
        gangwei: [
          {
            required: true,
            message: ''
          }
        ],
        industry: [
          {
            required: true,
            message: ''
          }
        ],
        city: [
          {
            required: true,
            message: ''
          }
        ],
        gertc: [
          {
            required: true,
            message: ''
          }
        ],
        headimgurl: [
          {
            required: true,
            message: ''
          }
        ],
        profile_file_url: [
          {
            required: true,
            message: ''
          }
        ]
      },
      tag: 'one'
    }
  },
  computed: {
    ...mapGetters(['getMemberId', 'getToken'])
  },
  created() {
    // 初始化下载离职文档范本

    this.workProofUrl = `http://${location.hostname}/word/关键人才在职证明.docx`
    this.initAddressSelect()
    this.initPostSelect()
    this.initAllIndustry()
  },
  mounted: function() {
    var that = this
    $('#verify-wrap').slideVerify({
      type: 1, //类型
      vOffset: 5, //误差量，根据需求自行调整
      barSize: {
        width: '640px',
        height: '48px'
      },
      ready: function() {},
      success: function() {
        that.sendMsgFlag = true
      }
    })
  },
  methods: {
    tab_page: function(tag) {
      this.tag = tag
    },
    sendMsg() {
      if (this.sendMsgFlag) {
        sendTelVcode({
          phone_number: this.phone,
          templateCode: MESSAGE_TEMPETE
        })
          .then(res => {
            console.log(res)
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
    initPostSelect() {
      getAllPost().then(res => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    },
    initAddressSelect() {
      const loop = node => {
        for (let i = 0; i < node.length; i++) {
          if (!node[i].data_list) {
            continue
          }
          if (node[i].data_list && !node[i].data_list.length) {
            node[i].data_list = undefined
            continue
          }
          loop(node[i].data_list)
        }
      }

      getAllAddress().then(res => {
        if (res.code === 200) {
          loop(res.data)
          this.addressList = res.data
        }
      })
    },
    initAllIndustry() {
      getAllIndustry().then(res => {
        if (res.code === 200) {
          this.industryList = res.data
        }
      })
    },
    onLogin() {
      if (!this.phone || !this.code) {
        return
      }

      if (!this.registerProtocol) {
        this.errMessage = '请选择同意注册协议'
        return
      }
      // this.resiger = true //用于测试 不走接口
      login({
        mobile: this.phone,
        vcode: this.code
      })
        .then(res => {
          // 用户类型是空也进入了登录页面，处理异常情况
          res.data && res.data.token !== undefined
            ? this.syncSetToken(res.data.token)
            : ''

          res.data && res.data.member_id !== undefined
            ? this.syncSetMemberId(res.data.member_id)
            : ''
          res.data && res.data.type !== undefined
            ? this.syncSetUsetType(res.data.type)
            : ''
          if (res.code === 200) {
            this.resigerJobSee.token = res.data.token
            if (!res.data.type) {
              this.resiger = true
            } else {
              if (res.data.type === 1) {
                // 已注册 求职者进入求职列表
                this.$router.replace('/user/jobwant')
              } else {
                // 已注册 猎头、hr 进入搜索简历
                this.$router.replace('/user')
              }
            }
          } else if (res.code === 40011) {
            this.resigerJobSee.token = res.data.token
            this.resiger = true
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(res => {
          this.errMessage = res.message
        })
    },
    onPrevStep(step) {
      this.registerStep = step
    },
    onNextStep(step) {
      this.registerStep = step
    },
    onValidateSelect(rule, value, callback) {
      value ? callback() : callback(new Error(''))
    },
    onSkill(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      cb([{ value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' }])
    },
    onPreviewAvatar(file, key) {
      //预览头像
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.addEventListener('load', e => {
        this[`${key}`] = e.target.result
      })
    },
    onBeforeUploadHeadImage(file) {
      // 头像上传后校验
      this.onPreviewAvatar(file, 'headimgurl')
      this.resigerJobSee.headimgurl = file
      return false
    },
    onBeforeUploadResume(file) {
      // 上传简历
      this.resigerJobSee.profile_file_url = file
      this.$message('上传简历成功')
      return false
    },
    onSubmitJobsee() {
      // 提交注册求职人员
      this.$refs.resigerJobSeeWrap.validate((valid, fields) => {
        if (valid) {
          this.resigerJobSee.member_id = this.getMemberId
          this.resigerJobSee.token = this.getToken
          //对jobs_tart、birthday 字段时间格式转化为秒数
          this.resigerJobSee.birthday = `${this.resigerJobSee.birthday}`.slice(
            0,
            -3
          )
          this.resigerJobSee.jobs_tart = `${this.resigerJobSee.jobs_tart}`.slice(
            0,
            -3
          )
          this.resigerJobSee.starttime = `${this.resigerJobSee.starttime}`.slice(
            0,
            -3
          )
          this.resigerJobSee.endtime = `${this.resigerJobSee.endtime}`.slice(
            0,
            -3
          )

          // 对city 字段特殊处理
          const list = this.resigerJobSee.city
          this.resigerJobSee.city = list[list.length - 1]
          registerJobseeUser(this.resigerJobSee).then(res => {
            if (res.code === 200) {
              this.syncSetUsetType('1')
              this.$router.replace('/user/jobwant')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('请检查表单是否填写完成')
          return false
        }
      })
    },
    onCancelRegister(key) {
      this[`${key}`] = false
    },
    onBeforeUploadHeadimgurl1(file) {
      this.onPreviewAvatar(file, 'headimgurl1')
      // this.registerHRData.headimgurl = file
      this.registerHRData.headimgurl = file
      return false
    },
    onBeforeUploadheadimgurl2(file) {
      if (file.size > 1000 * 200) {
        //logo 不能大于200k
        this.$message.error('logo不能大于200k')
        return false
      }
      this.onPreviewAvatar(file, 'headimgurl2')
      this.registerHRData.logo = file
      return false
    },
    onBeforeUploadheadimgurl3(file) {
      if (file.size > 1000 * 500) {
        //营业执照 不能大于500k
        this.$message.error('营业执照不能大于500k')
        return false
      }
      this.onPreviewAvatar(file, 'headimgurl3')
      this.registerHRData.q_pic = file
      return false
    },
    onBeforeUploadheadimgurl4(file) {
      this.onPreviewAvatar(file, 'headimgurl4')
      this.registerHRData.h_pic = file
      return false
    },
    onCertificationHR() {
      this.$refs.registerHRWrap.validate(valid => {
        if (valid) {
          this.registerHRData.member_id = this.getMemberId
          registerHRUser(this.registerHRData).then(res => {
            if (res.code === 200) {
              this.syncSetUsetType('2')
              this.$router.replace('/user/myaccount')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('请检查表单是否填写完成')
          return false
        }
      })
    },
    onBeforeUploadheadimgurl5(file) {
      this.onPreviewAvatar(file, 'headimgurl5')
      this.registerHHData.headimgurl = file
      return false
    },
    onBeforeUploadheadimgurl6(file) {
      if (file.size > 1000 * 200) {
        //logo 不能大于200k
        return false
      }
      this.onPreviewAvatar(file, 'headimgurl6')
      this.registerHHData.logo = file
      return false
    },
    onBeforeUploadheadimgurl7(file) {
      if (file.size > 1000 * 500) {
        //营业执照 不能大于500k
        return false
      }
      this.onPreviewAvatar(file, 'headimgurl7')
      this.registerHHData.q_pic = file
      return false
    },
    onBeforeUploadheadimgurl8(file) {
      this.onPreviewAvatar(file, 'headimgurl8')
      this.registerHHData.h_pic = file
      return false
    },
    onCertificationHH() {
      this.$refs.registerHHWrap.validate(valid => {
        if (valid) {
          this.registerHHData.member_id = this.getMemberId
          // 对所在地数据特殊处理
          const list = this.registerHHData.city
          this.registerHHData.city = list[list.length - 1]
          //对职业行业数据特殊处理
          this.registerHHData.zy_industry = this.registerHHData.zy_industry.join(
            ','
          )
          registerHHUser(this.registerHHData).then(res => {
            if (res.code === 200) {
              this.syncSetUsetType('3')
              this.$router.replace('/user/myaccount')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('请检查表单是否填写完成')
          return false
        }
      })
    },
    ...mapMutations(['syncSetToken', 'syncSetUsetType', 'syncSetMemberId'])
  }
}
</script>

<style lang="scss">
@import '../assets/css/verify.css';
.login-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('../assets/img/login-bg.png') no-repeat 0 0 fixed;
  background-size: cover;
  z-index: 0;
  display: flex;
}
.login-wrap {
  .window {
    height: 520px;
    width: 760px;
    margin: auto;
    background: #fff;
    border-radius: 15px;
    padding: 40px 60px;
    z-index: 100;
  }

  .window > p:first-child {
    font-size: 20px;
    line-height: 20px;
    color: #ff7272;
    margin-bottom: 30px;
    text-align: left;
  }

  .window > ul {
    width: 100%;
    height: 36px;
    line-height: 36px;
    border-bottom: 2px solid #d0d0d0;
    margin-bottom: 50px;
  }

  .window > ul li {
    float: left;
    margin-right: 59px;
    font-size: 18px;
    color: #999;
    position: relative;
    cursor: pointer;
  }

  .window > ul li.cur::before {
    position: absolute;
    bottom: 0;
    left: 8px;
    width: calc(100% - 16px);
    height: 3px;
    background: #ff7272;
    content: ' ';
  }

  .window > ul li.cur {
    color: #ff7272;
  }

  .window > .one > div {
    display: flex;
    width: 100%;
    height: 50px;
    border: 1px solid #999;
    border-radius: 4px;
    margin-bottom: 30px;
  }

  .window > .one > div > img {
    height: 22px;
    width: 20px;
    margin: 14px 20px;
  }

  .window > .one > div > input {
    flex: 1;
    height: 48px;
    border: none;
    line-height: 48px;
    text-decoration: none;
    outline: none;
    padding: 0;
    border-radius: 5px;
  }

  .window > .one > div:nth-child(2) {
    background: #e5e5e5;
    border: none;
    font-size: 16px;
    line-height: 48px;
    color: #aaa;
    text-align: center;
    position: relative;
  }
  .verify-wrap .verify-move-block > i {
    display: none;
  }
  .verify-wrap .drag-btn {
    height: 50px;
    background-size: 50px 40px;
  }
  .verify-wrap .drag-progress {
    height: 50px;
  }

  .verify-wrap .fix-tips,
  .verify-msg {
    line-height: 50px;
    height: 50px;
  }

  .verify-wrap .verify-msg {
    height: 50px;
  }

  .window > .one > div:nth-child(2) > div > img {
    height: 22px;
    width: 20px;
    display: block;
    margin: 14px auto;
  }

  .window > .one > div:nth-child(3) > div {
    float: right;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    color: #ff7272;
    width: 137px;
    border-left: 1px solid #999;
    margin-top: 15px;
    text-align: center;
  }

  .window > .one > div:nth-child(4) {
    display: block;
    background: #ff7272;
    height: 50px;
    color: #fff;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    border-radius: 4px;
    margin-bottom: 15px;
    border: none;
  }

  .window > .one > p:nth-child(5) {
    height: 16px;
    text-align: center;
    width: 100%;
  }

  .window > .one > p:nth-child(5) > input {
    height: 14px;
    width: 14px;
  }

  .window > .one > p:nth-child(5) > span {
    font-size: 16px;
    line-height: 16px;
    color: #666;
  }

  .window > .one > p:nth-child(5) > span > a {
    color: #677dda;
  }

  .two {
    height: auto;
    width: 100%;
    overflow: hidden;
  }

  .two > p {
    font-size: 18px;
    line-height: 18px;
    width: 100%;
    text-align: center;
    color: #424a5e;
  }

  .two > img {
    display: block;
    margin: 0 auto;
    height: 265px;
    width: 265px;
  }
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
              background: url(../assets/img/register_upload.png) no-repeat 0 0;
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
              display: block;
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
              text-decoration: none;
            }
            .upload-wrap {
              margin-top: 12px;
              .upload-img-wrap {
                width: 134px;
                height: 134px;
                background: url(../assets/img/register_upload.png) no-repeat 0 0;
                background-size: 134px 134px;
                & > img {
                  display: block;
                  width: 134px;
                  height: 134px;
                }
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
      .body {
        .upload-wrap {
          .upload-img-wrap {
            width: 134px;
            height: 134px;
            background: url(../assets/img/register_upload.png) no-repeat 0 0;
            & > img {
              display: block;
              width: 134px;
              height: 134px;
            }
          }
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
  .el-form-item__error {
    display: none;
  }
}
</style>