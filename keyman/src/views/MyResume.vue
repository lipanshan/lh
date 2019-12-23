<template>
  <div class="my-resume">
    <div class="head">
      <ul>
        <li :class="{'active': tag === 'full'}" @click="onSwitchTag('full')">全职简历</li>
        <li :class="{'active': tag === 'part'}" @click="onSwitchTag('part')">兼职简历</li>
      </ul>
    </div>
    <div class="body">
      <div class="left">
        <div class="rows">
          <div class="cer-status">实名认证</div>
          <div class="preview-resume">预览简历</div>
        </div>
        <div class="editor-see-wrap">
          <div v-show="infoSwitch" class="see">
            <div class="info">
              <p class="name">{{infoData.name}}</p>
              <div class="lis">
                <span class="li">{{infoData.jobs_tart | filterTime}}至今</span>
                <span class="li">{{eduExp[0] ? eduExp[0].edu_type : '' | filterEdu}}</span>
                <span class="li">{{infoData.qiuzzt | filterWorkStatus}}</span>
              </div>
              <div class="lis">
                <span class="li phone">{{infoData.wx_user}}</span>
              </div>
            </div>
            <div class="avatar-box">
              <div class="avatar-wrap">
                <img src alt />
              </div>
              <div class="editor-btns" @click="onSwitchEditorSee('infoSwitch')">编辑</div>
            </div>
          </div>
          <div v-show="!infoSwitch" class="editor">
            <h2 class="title">编辑个人信息</h2>
            <el-form :model="infoData" :rules="infoRules" ref="infoWrap">
              <div class="form-row">
                <div class="half">
                  <el-form-item prop="name" label="姓名">
                    <el-input v-model="infoData.name"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item prop="qiuzzt" label="当前求职状态">
                    <el-select v-model="infoData.qiuzzt">
                      <el-option label="不在职" :value="1"></el-option>
                      <el-option label="正在找工作、在职" :value="2"></el-option>
                      <el-option label="打算近期换工作" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item prop="sex" label="性别">
                    <el-radio-group v-model="infoData.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item prop="jobs_tart" label="开始工作时间">
                    <el-date-picker
                      v-model="infoData.jobs_tart"
                      value-format="timestamp"
                      format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item prop="birthday" label="生日">
                    <el-date-picker
                      v-model="infoData.birthday"
                      format="yyyy-MM-dd"
                      value-format="timestamp"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="微信号（选填）">
                    <el-input v-model="infoData.wx_user"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item prop="qq" label="电话">
                    <el-input v-model="infoData.qq"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="邮箱（选填）">
                    <el-input v-model="infoData.email"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form-action">
              <div class="cancel-btns" @click="onSwitchEditorSee('infoSwitch')">取消</div>
              <div class="save-btns" @click="onSaveInfoData">保存</div>
            </div>
          </div>
        </div>
        <div class="editor-see-wrap">
          <div v-show="advantageSwitch" class="see">
            <div class="content">
              <h3 class="subtitle">个人优势</h3>
              <p class="txt">{{advantageData.gerjs}}</p>
            </div>
            <div class="btns-group">
              <div class="editor-btns" @click="onSwitchEditorSee('advantageSwitch')">编辑</div>
            </div>
          </div>
          <div v-show="!advantageSwitch" class="editor">
            <h2 class="title">编辑个人优势</h2>
            <el-form :model="advantageData" :rules="advantageRules" ref="advantageWrap">
              <el-form-item prop="gerjs" lable>
                <el-input type="textarea" v-model="advantageData.gerjs"></el-input>
              </el-form-item>
            </el-form>
            <div class="form-action">
              <div class="cancel-btns" @click="onSwitchEditorSee('advantageSwitch')">取消</div>
              <div class="save-btns" @click="onSaveAdvantageData">保存</div>
            </div>
          </div>
        </div>
        <div class="editor-see-wrap">
          <div v-show="postSwitch" class="see">
            <div class="content">
              <h3 class="subtitle">期望职位</h3>
              <p class="txt">
                <span class="item">{{filterPost(postData.gangwei)}}</span>
                <span class="item2">{{postData.qiwxz | filterSalary}}</span>
                <span class="item3">{{filterIndustry(postData.trade)}}</span>
                <span class="item4">{{postData.city}}</span>
              </p>
            </div>
            <div class="btns-group">
              <div class="editor-btns" @click="onSwitchEditorSee('postSwitch')">编辑</div>
            </div>
          </div>
          <div v-show="!postSwitch" class="editor">
            <h2 class="title">编辑期望职位</h2>
            <el-form :model="postData" :rules="postRules" ref="postWrap">
              <div class="form-row">
                <div class="half">
                  <el-form-item prop="gangwei" label="期望职位">
                    <el-select v-model="postData.gangwei">
                      <el-option
                        v-for="item in postsList"
                        :key="item.c_id"
                        :label="item.class_name"
                        :value="item.c_id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item prop="qiwxz" label="薪资要求">
                    <el-select v-model="postData.qiwxz">
                      <el-option label="3K以下" value="1"></el-option>
                      <el-option label="3-5K" value="2"></el-option>
                      <el-option label="5-10K" value="3"></el-option>
                      <el-option label="10-15K" value="4"></el-option>
                      <el-option label="15-20K" value="5"></el-option>
                      <el-option label="20-30K" value="6"></el-option>
                      <el-option label="30-50K" value="7"></el-option>
                      <el-option label="50K以上" value="8"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item prop="trade" label="行业">
                    <el-select v-model="postData.trade">
                      <el-option
                        v-for="item in industryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item prop="city" label="城市">
                    <el-cascader
                      v-model="postData.city"
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
            </el-form>
            <div class="form-action">
              <div class="cancel-btns" @click="onSwitchEditorSee('postSwitch')">取消</div>
              <div class="save-btns" @click="onSavePostData">保存</div>
            </div>
          </div>
        </div>
        <div class="editor-see-wrap">
          <div class="see">
            <div class="content">
              <h3 class="subtitle">工作经历</h3>
            </div>
            <div class="btns-group">
              <div class="add-btns" @click="onAddWordExp()">添加</div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div v-for="item in workExp" :key="item.id" class="editor-see-wrap">
          <div v-show="item.switch" class="see">
            <div class="content">
              <div class="box-row">
                <span class="title">{{item.company}}</span>
                <span
                  class="title-info"
                >{{item.starttime | filterTime}}-{{item.endtime | filterTime}}</span>
              </div>
              <div class="box-row">
                <span class="title">担任职务</span>
                <span class="title-info">{{filterPost(item.post)}}</span>
              </div>
              <div class="box-row2">
                <span class="title">内容</span>
                <span class="title-info rows">{{item.content}}</span>
              </div>
            </div>
            <div class="btns-group">
              <div class="editor-btns" @click="onSwitchEditorSeeList(item, workExp)">编辑</div>
            </div>
          </div>
          <div v-show="!item.switch" class="editor">
            <h2 class="title">编辑工作经历</h2>
            <el-form :model="item" :rules="workRules" :ref="`work${item.id}Wrap`">
              <div class="form-row">
                <div class="half">
                  <el-form-item label="公司名称">
                    <el-input v-model="item.company"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="所属行业">
                    <el-select v-model="item.industry">
                      <el-option
                        v-for="iitem in industryList"
                        :key="iitem.id"
                        :label="iitem.name"
                        :value="iitem.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item label="所属部门（选填）">
                    <el-input v-model="item.section"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="职位名称（选填）">
                    <el-select v-model="item.post">
                      <el-option
                        v-for="iitem in postsList"
                        :key="iitem.c_id"
                        :label="iitem.class_name"
                        :value="iitem.c_id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item label="职位类型">
                    <el-input v-model="item.zwlb"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <div class="form-row">
                    <div class="half2">
                      <el-form-item label="入职时间">
                        <el-date-picker
                          v-model="item.starttime"
                          format="yyyy-MM-dd"
                          value-format="timestamp"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                    <div class="half2">
                      <el-form-item label="离职时间">
                        <el-date-picker
                          v-model="item.endtime"
                          format="yyyy-MM-dd"
                          value-format="timestamp"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="full-row">
                  <el-form-item label="职位技能">
                    <el-input v-model="item.skills"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="full-row">
                  <el-form-item label="工作内容">
                    <el-input type="textarea" v-model="item.content"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="full-row">
                  <el-form-item label="工作业绩（选填）">
                    <el-input type="textarea" v-model="item.work_yj"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <el-form-item>
                  <el-checkbox v-model="item.type" :true-label="1" :false-label="2">对该公司隐藏我的简历</el-checkbox>
                </el-form-item>
              </div>
            </el-form>
            <div class="form-action">
              <div class="cancel-btns" @click="onSwitchEditorSeeList(item, workExp)">取消</div>
              <div class="save-btns" @click="onSaveWorkExpData(item)">保存</div>
            </div>
          </div>
        </div>
        <div class="editor-see-wrap">
          <div class="see">
            <div class="content">
              <h3 class="subtitle">项目经历</h3>
            </div>
            <div class="btns-group">
              <div class="add-btns" @click="onAddProjectExp()">添加</div>
            </div>
          </div>
        </div>
        <div v-for="item in projectExp" :key="item.id" class="editor-see-wrap">
          <div v-show="item.switch" class="see">
            <div class="content">
              <div class="box-row">
                <span class="title">{{item.project_name}}</span>
                <span
                  class="title-info"
                >{{item.starttime | filterTime}}-{{item.endtime | filterTime}}</span>
              </div>
              <div class="box-row">
                <span class="title">担任职务</span>
                <span class="title-info">{{item.post}}</span>
              </div>
              <div class="box-row2">
                <span class="title">内容</span>
                <span class="title-info rows">{{item.content}}</span>
              </div>
            </div>
            <div class="btns-group">
              <div class="editor-btns" @click="onSwitchEditorSeeList(item, projectExp)">编辑</div>
            </div>
          </div>
          <div v-show="!item.switch" class="editor">
            <h2 class="title">编辑项目经历</h2>
            <el-form :model="item" :rules="projectRules" :ref="`project${item.id}Wrap`">
              <div class="form-row">
                <div class="half">
                  <el-form-item label="项目名称">
                    <el-input v-model="item.project_name"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="担任角色">
                    <el-input v-model="item.post"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <div class="form-row">
                    <div class="full-row">
                      <el-form-item label="项目开始时间">
                        <div class="project-box">
                          <div class="half2">
                            <el-date-picker
                              v-model="item.starttime"
                              format="yyyy-MM-dd"
                              value-format="timestamp"
                            ></el-date-picker>
                          </div>
                          <div class="half2">
                            <el-date-picker
                              v-model="item.endtime"
                              format="yyyy-MM-dd"
                              value-format="timestamp"
                            ></el-date-picker>
                          </div>
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <div class="half"></div>
              </div>
              <div class="form-row">
                <div class="full-row">
                  <el-form-item label="项目介绍">
                    <el-input type="textarea" v-model="item.content"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form-action">
              <div class="cancel-btns" @click="onSwitchEditorSeeList(item, projectExp)">取消</div>
              <div class="save-btns" @click="onSaveProjectExpData(item)">保存</div>
            </div>
          </div>
        </div>
        <div class="editor-see-wrap">
          <div class="see">
            <div class="content">
              <h3 class="subtitle">教育经历</h3>
            </div>
            <div class="btns-group">
              <div class="add-btns" @click="onAddEduExp()">添加</div>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div v-for="item in eduExp" :key="item.id" class="editor-see-wrap">
          <div v-show="item.switch" class="see">
            <div class="content">
              <div class="box-row">
                <span class="title">{{item.school}}</span>
                <span class="title-info">{{item.star_time}}-{{item.end_time}}</span>
              </div>
              <div class="box-row">
                <span class="title">专业</span>
                <span class="title-info">{{item.major}}</span>
              </div>
              <div class="box-row2">
                <span class="title">在校经历</span>
                <span class="title-info rows">{{item.content}}</span>
              </div>
            </div>
            <div class="btns-group">
              <div class="editor-btns" @click="onSwitchEditorSeeList(item, eduExp)">编辑</div>
            </div>
          </div>
          <div v-show="!item.switch" class="editor">
            <h2 class="title">编辑教育经历</h2>
            <el-form :model="item" :rules="eduRules" :ref="`edu${item.id}Wrap`">
              <div class="form-row">
                <div class="half">
                  <el-form-item label="学校名称">
                    <el-input v-model="item.school"></el-input>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="学校类型">
                    <el-radio-group v-model="item.type">
                      <el-radio :label="1">全日制</el-radio>
                      <el-radio :label="2">非全日制</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <el-form-item>
                  <el-checkbox v-model="item.abroad" :true-label="1" :false-label="2">留学经历</el-checkbox>
                </el-form-item>
              </div>

              <div class="form-row">
                <div class="half">
                  <el-form-item label="学历">
                    <el-select v-model="item.edu_type">
                      <el-option label="不限" :value="0"></el-option>
                      <el-option label="初中及以下" :value="1"></el-option>
                      <el-option label="中专/技校" :value="2"></el-option>
                      <el-option label="高中" :value="3"></el-option>
                      <el-option label="大专" :value="4"></el-option>
                      <el-option label="本科" :value="5"></el-option>
                      <el-option label="硕士" :value="6"></el-option>
                      <el-option label="博士" :value="7"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="专业">
                    <el-input v-model="item.major"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="half">
                  <el-form-item label="开始时间">
                    <el-date-picker
                      v-model="item.star_time"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </div>
                <div class="half">
                  <el-form-item label="毕业时间">
                    <el-date-picker
                      v-model="item.end_time"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div class="form-row">
                <div class="full-row">
                  <el-form-item label="在校经历（选填）">
                    <el-input v-model="item.content" type="textarea"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form-action">
              <div class="cancel-btns" @click="onSwitchEditorSeeList(item, eduExp)">取消</div>
              <div class="save-btns" @click="onSaveEduExpData(item)">保存</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="upload-resume">
          <h2>上传简历</h2>
          <div class="upload-wrap">
            <el-upload action="#" :before-upload="onBeforeUploadResume">
              <div class="upload-resume-btn">上传附件简历</div>
            </el-upload>
          </div>
        </div>
        <div class="set-resume">
          <el-form :model="setResumeData">
            <el-form-item label="隐私设置">
              <el-switch
                v-model="setResumeData.open"
                active-color="#FF7272"
                active-text="开放简历"
                inactive-color="#999999"
                inactive-text="隐藏简历"
              ></el-switch>
            </el-form-item>
            <el-form-item label="接受兼职职位邀请">
              <el-radio-group v-model="setResumeData.isInvite">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="tag-wrap" label="添加屏蔽公司(最多3个)">
              <div>
                <el-tag
                  :key="tag.id"
                  v-for="tag in setResumeData.shieldCompany"
                  closable
                  :disable-transitions="false"
                  @close="onTagClose(tag)"
                >{{tag.txt}}</el-tag>
                <el-input
                  class="tag-input"
                  v-model="dynamicTags"
                  size="small"
                  @blur="onHandleInputConfirm"
                ></el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="refresh-resume">
          <h2>更新简历</h2>
          <div class="upload-wrap">
            <!-- <el-upload action="#" :before-upload="onBeforeUploadResume"> -->
            <div class="upload-resume-btn">更新简历</div>
            <!-- </el-upload> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getCertStatus,
  getResumeInfo,
  getResumeAdvantage,
  getResumeWantPost,
  getResumeWorkExp,
  getResumeProjectExp,
  getResumeEduExp,
  saveResumeEditorInfo,
  saveResumeEditorAdvantage,
  saveResumeEditorWantPost,
  saveResumeEditorWorkExp,
  saveResumeEditorProjectExp,
  saveResumeEditorEduExp,
  getAllPost,
  getAllIndustry,
  getAllAddress
} from '@/api/api'
const LIMIT_SHIELD_COMPANY_SIZE = 3 // 屏蔽公司个数
export default {
  name: 'MyResume',
  data() {
    return {
      dynamicTags: '',
      tag: 'full',
      cerStatus: '',
      postsList: [],
      industryList: [],
      addressList: [],
      infoSwitch: true,
      infoData: {
        member_id: '',
        token: '',
        name: '',
        qiuzzt: 1,
        sex: 0,
        birthday: 0,
        wx_user: '',
        qq: '',
        email: '',
        jobs_tart: 0
      },
      infoRules: {
        name: [
          {
            required: true,
            message: ''
          }
        ],
        qiuzzt: [
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
        wx_user: [
          {
            required: true,
            message: ''
          }
        ],
        qq: [
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
        jobs_tart: [
          {
            required: true,
            message: ''
          }
        ]
      },
      advantageSwitch: true,
      advantageData: {
        member_id: '',
        token: '',
        gerjs: ''
      },
      advantageRules: {
        gerjs: [
          {
            required: true,
            message: ''
          }
        ]
      },
      postSwitch: true,
      postData: {
        member_id: '',
        token: '',
        gangwei: 0,
        trade: 0,
        qiwxz: '',
        city: ''
      },
      postRules: {
        gangwei: [
          {
            required: true,
            message: ''
          }
        ],
        trade: [
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
        city: [
          {
            required: true,
            message: ''
          }
        ]
      },
      workExp: [
        {
          switch: true,
          member_id: '',
          token: '',
          id: 1,
          company: '测试',
          industry: 1,
          section: '研发',
          post: '研发',
          zwlb: null,
          starttime: 0,
          endtime: 0,
          skills: null,
          content: '',
          work_yj: null,
          type: null
        }
      ],
      workRules: {
        company: [
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
        section: [
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
        zwlb: [
          {
            required: true,
            message: ''
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
        skills: [
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
        work_yj: [
          {
            required: true,
            message: ''
          }
        ],
        type: [
          {
            required: true,
            message: ''
          }
        ]
      },
      projectExp: [
        {
          switch: true,
          member_id: '',
          token: '',
          project_name: '',
          post: '',
          starttime: '',
          endtime: '',
          content: '',
          id: ''
        }
      ],
      projectRules: {
        project_name: [
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
        ]
      },
      eduExp: [],
      eduRules: {
        school: [
          {
            required: true,
            message: ''
          }
        ],
        type: [
          {
            required: true,
            message: ''
          }
        ],
        abroad: [
          {
            required: true,
            message: ''
          }
        ],
        edu_type: [
          {
            required: true,
            message: ''
          }
        ],
        major: [
          {
            required: true,
            message: ''
          }
        ],
        star_time: [
          {
            required: true,
            message: ''
          }
        ],
        end_time: [
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
        ]
      },
      setResumeData: {
        open: true,
        isInvite: true,
        shieldCompany: []
      }
    }
  },
  created() {
    this.initAddressSelect()
    this.initCerStatus()
    this.initIndustryList()
    this.initPostList()
    this.initResumeInfo()
    this.initResumeAdvantage()
    this.initResumeWantPost()
    this.initResumeWorkExp()
    this.initResumeProjectExp()
    this.initResumeEduExp()
  },
  computed: {
    ...mapGetters(['getToken', 'getMemberId'])
  },
  methods: {
    initCerStatus() {
      getCertStatus({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          this.cerStatus = res.data.status
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
    initPostList() {
      getAllPost().then(res => {
        if (res.code === 200) {
          this.postsList = res.data
        }
      })
    },
    initIndustryList() {
      getAllIndustry().then(res => {
        if (res.code === 200) {
          this.industryList = res.data
        }
      })
    },
    initResumeInfo() {
      getResumeInfo({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          this.infoData = res.data
          this.infoData.sex = +res.data.sex // 性别类型是number, 返回的是string 特别处理
        }
      })
    },
    initResumeAdvantage() {
      getResumeAdvantage({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          this.advantageData = res.data
        }
      })
    },
    initResumeWantPost() {
      getResumeWantPost({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          this.postData = res.data
        }
      })
    },
    initResumeWorkExp() {
      getResumeWorkExp({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        // 对工作经验列表特殊处理
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].switch = true
          res.data[i].industry = +res.data[i].industry
          res.data[i].post = +res.data[i].post
        }
        if (res.code === 200) {
          this.workExp = res.data
        }
      })
    },
    initResumeProjectExp() {
      getResumeProjectExp({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].switch = true
            res.data[i].starttime = +res.data[i].starttime
            res.data[i].endtime = +res.data[i].endtime
          }
          this.projectExp = res.data
        }
      })
    },
    initResumeEduExp() {
      getResumeEduExp({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].switch = true
          }
          this.eduExp = res.data
        }
      })
    },
    onSwitchTag(tag) {
      this.tag = tag
    },
    onSwitchEditorSee(key) {
      this[key] = !this[key]
    },
    onSwitchEditorSeeList(data, list) {
      if (typeof data.id === 'string') {
        const index = list.findIndex(item => {
          return item.id === data.id
        })
        if (~index) {
          list.splice(index, 1)
        }
        return
      }
      data.switch = !data.switch
    },
    onSaveInfoData() {
      this.infoData.member_id = this.getMemberId
      this.infoData.token = this.getToken
      this.$refs.infoWrap.validate(valid => {
        if (valid) {
          saveResumeEditorInfo(this.infoData).then(res => {
            if (res.code === 200) {
              this.infoSwitch = true
              this.$message(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onSaveAdvantageData() {
      this.advantageData.member_id = this.getMemberId
      this.advantageData.token = this.getToken
      this.$refs.infoWrap.validate(valid => {
        console.log(this.advantageData)
        if (valid) {
          saveResumeEditorAdvantage(this.advantageData).then(res => {
            if (res.code === 200) {
              this.advantageSwitch = true
              this.$message(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onSavePostData() {
      this.postData.member_id = this.getMemberId
      this.postData.token = this.getToken
      this.$refs.postWrap.validate(valid => {
        if (valid) {
          saveResumeEditorWantPost(this.postData).then(res => {
            if (res.code === 200) {
              this.postSwitch = true
              this.$message(res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onSaveWorkExpData(data) {
      const nData = {}
      data.token = this.getToken
      data.member_id = this.getMemberId

      for (let i = 0, keys = Object.keys(data); i < keys.length; i++) {
        if (keys[i] === 'switch' || keys[i] === 'id') {
          continue
        }
        nData[keys[i]] = data[keys[i]]
      }

      // 添加-保存 无id
      if (typeof data.id === 'number') {
        // 编辑-保存
        nData.id = data.id
      }
      nData.post = `${nData.post}`
      nData.starttime = `${nData.starttime}`
      nData.endtime = `${nData.endtime}`
      this.$refs[`work${data.id}Wrap`][0].validate(valid => {
        if (valid) {
          saveResumeEditorWorkExp(nData).then(res => {
            if (res.code === 200) {
              data.switch = true
              this.$message(res.message)
              // 添加 成功 更新列表获取添加的id
              nData.id === undefined ? this.initResumeWorkExp() : ''
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onAddWordExp() {
      const id = `${+new Date()}`
      this.workExp.push({
        switch: false,
        member_id: '',
        token: '',
        id: id,
        company: '',
        industry: 0,
        section: '',
        post: '',
        zwlb: '',
        starttime: 0,
        endtime: 0,
        skills: '',
        content: '',
        work_yj: '',
        type: 2
      })
    },
    onAddProjectExp() {
      const id = `${+new Date()}`
      this.projectExp.push({
        switch: false,
        member_id: '',
        token: '',
        project_name: '',
        post: '',
        starttime: '',
        endtime: '',
        content: '',
        id: id
      })
    },
    onSaveProjectExpData(data) {
      const nData = {}
      data.token = this.getToken
      data.member_id = this.getMemberId

      for (let i = 0, keys = Object.keys(data); i < keys.length; i++) {
        if (keys[i] === 'switch' || keys[i] === 'id') {
          continue
        }
        nData[keys[i]] = data[keys[i]]
      }

      // 添加-保存 无id
      if (typeof data.id === 'number') {
        // 编辑-保存
        nData.id = data.id
      }
      nData.post = `${nData.post}`
      nData.starttime = `${nData.starttime}`
      nData.endtime = `${nData.endtime}`
      this.$refs[`project${data.id}Wrap`][0].validate(valid => {
        if (valid) {
          saveResumeEditorProjectExp(nData).then(res => {
            if (res.code === 200) {
              data.switch = true
              this.$message(res.message)
              // 添加 成功 更新列表获取添加的id
              nData.id === undefined ? this.initResumeProjectExp() : ''
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onAddEduExp() {
      const id = `${+new Date()}`
      this.eduExp.push({
        switch: false,
        id: id,
        school: '',
        type: '',
        abroad: '',
        edu_type: '',
        major: '',
        star_time: '',
        end_time: '',
        content: ''
      })
    },
    onSaveEduExpData(data) {
      const nData = {}
      data.token = this.getToken
      data.member_id = this.getMemberId

      for (let i = 0, keys = Object.keys(data); i < keys.length; i++) {
        if (keys[i] === 'switch' || keys[i] === 'id') {
          continue
        }
        nData[keys[i]] = data[keys[i]]
      }

      // 添加-保存 无id
      if (typeof data.id === 'number') {
        // 编辑-保存
        nData.id = data.id
      }
      nData.major = `${nData.major}`
      nData.star_time = `${nData.star_time}`
      nData.end_time = `${nData.end_time}`
      this.$refs[`edu${data.id}Wrap`][0].validate(valid => {
        if (valid) {
          saveResumeEditorEduExp(nData).then(res => {
            if (res.code === 200) {
              data.switch = true
              this.$message(res.message)
              // 添加 成功 更新列表获取添加的id
              nData.id === undefined ? this.initResumeEduExp() : ''
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    filterPost(id) {
      const item = this.postsList.find(item => {
        return id === item.c_id
      })
      return item ? item.class_name : ''
    },
    filterIndustry(id) {
      const item = this.industryList.find(item => {
        return item.id === id
      })
      return item ? item.name : ''
    },
    onBeforeUploadResume(file) {
      this.$message.error('暂未实现')
      return false
    },
    onTagClose(tag) {
      const index = this.setResumeData.shieldCompany.findIndex(
        item => item.id === tag.id
      )
      if (!index) {
        this.setResumeData.shieldCompany.splice(index, 1)
      }
    },
    onHandleInputConfirm() {
      if (
        this.setResumeData.shieldCompany.length >= LIMIT_SHIELD_COMPANY_SIZE
      ) {
        return
      }
      const id = +new Date()
      const tag = { id: id, txt: this.dynamicTags }
      this.setResumeData.shieldCompany.push(tag)
      this.dynamicTags = ''
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
      return `${year}-${formatTime(month)}-${formatTime(day)}`
    },
    filterCerStatus(num) {
      const map = {
        0: '未审核',
        1: '审核通过',
        2: '不通过'
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
    filterWorkStatus(num) {
      const map = {
        1: '不在职',
        2: '正在找工作、在职',
        3: '打算近期换工作'
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
    }
  }
}
</script>

<style lang="scss">
.my-resume {
  width: 1100px;
  margin-left: auto;
  margin-right: auto;
  .head {
    margin: 0 auto;
    padding-top: 40px;
    text-align: left;
    & > ul {
      display: flex;
      & > li {
        width: 200px;
        font-size: 20px;
        line-height: 76px;
        text-align: center;
        color: #b2afbc;
        cursor: pointer;
        &.active {
          background: #fff;
          color: #ff7272;
        }
      }
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    & > .left {
      width: 770px;
      padding-bottom: 34px;
      background: #fff;
      .rows {
        padding-top: 10px;
        padding-bottom: 15px;
        display: flex;
        justify-content: space-between;
        .cer-status {
          position: relative;
          padding-left: 73px;
          font-size: 12px;
          line-height: 32px;
          color: #4adcc2;
          &::before {
            content: '';
            position: absolute;
            top: 11px;
            left: 58px;
            width: 12px;
            height: 10px;
            background: url(../assets/img/renzheng.png) no-repeat 0 0;
            background-size: 12px 10px;
          }
        }
        .preview-resume {
          padding-right: 30px;
          font-size: 14px;
          line-height: 32px;
          color: #414a60;
          cursor: pointer;
        }
      }
      .editor-see-wrap {
        .see {
          display: flex;
          justify-content: space-between;
          .info {
            flex: 1;
            text-align: left;
            padding-left: 58px;
            .name {
              font-size: 24px;
              line-height: 40px;
              color: #414a60;
              font-weight: bold;
            }
            .lis {
              display: flex;
              text-align: left;
              .li {
                position: relative;
                padding-left: 20px;
                padding-right: 20px;
                display: block;
                font-size: 14px;
                line-height: 46px;
                white-space: pre-wrap;
                word-break: break-all;
                color: #414a60;
                &:nth-child(1) {
                  &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 17px;
                    width: 14px;
                    height: 12px;
                    background: url(../assets/img/jingyan.png) no-repeat 0 0;
                    background-size: 14px 12px;
                  }
                }
                &:nth-child(2) {
                  &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 17px;
                    width: 14px;
                    height: 12px;
                    background: url(../assets/img/xueli.png) no-repeat 0 0;
                    background-size: 14px 12px;
                  }
                }
                &:nth-child(3) {
                  &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 17px;
                    width: 14px;
                    height: 12px;
                    background: url(../assets/img/zhuangtai.png) no-repeat 0 0;
                    background-size: 14px 12px;
                  }
                }
                &.phone {
                  &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 17px;
                    width: 14px;
                    height: 12px;
                    background: url(../assets/img/dianhua.png) no-repeat 0 0;
                    background-size: 14px 12px;
                  }
                }
              }
            }
          }
          .avatar-box {
            padding-right: 30px;
            text-align: right;
            .avatar-wrap {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background: #3c4658;
              & > img {
                display: block;
                width: 80px;
                height: 80px;
                border-radius: 50%;
              }
            }
            .editor-btns {
              margin-right: 8px;
              display: inline-block;
              position: relative;
              padding-top: 10px;
              padding-left: 20px;
              font-size: 14px;
              line-height: 34px;
              color: #ff7272;
              text-align: left;
              cursor: pointer;
              &::before {
                content: '';
                position: absolute;
                top: 21px;
                left: 0;
                width: 12px;
                height: 12px;
                background: url(../assets/img/bianji.png) no-repeat 0 0;
                background-size: 12px 12px;
              }
            }
          }
          .content {
            flex: 1;
            .subtitle {
              position: relative;
              padding-left: 52px;
              padding-right: 40px;
              text-align: left;
              font-size: 18px;
              line-height: 46px;
              color: #414a60;
              &::before {
                content: '';
                position: absolute;
                top: 16px;
                left: 40px;
                width: 1px;
                height: 14px;
                background: #ff7272;
              }
            }
            .txt {
              padding: 22px 20px 22px 54px;
              font-size: 14px;
              line-height: 24px;
              color: #414a60;
              text-align: left;
              word-break: break-all;
              & > span {
                margin-right: 20px;
                position: relative;
                display: inline-block;
                vertical-align: top;
                padding-left: 24px;
                max-width: 25%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .item {
                &::before {
                  content: '';
                  position: absolute;
                  top: 5px;
                  left: 0;
                  width: 14px;
                  height: 14px;
                  background: url(../assets/img/zhiwei.png) no-repeat 0 0;
                  background-size: 14px 14px;
                }
              }
              .item2 {
                &::before {
                  content: '';
                  position: absolute;
                  top: 5px;
                  left: 0;
                  width: 14px;
                  height: 14px;
                  background: url(../assets/img/xinzi.png) no-repeat 0 0;
                  background-size: 14px 14px;
                }
              }
              .item3 {
                &::before {
                  content: '';
                  position: absolute;
                  top: 5px;
                  left: 0;
                  width: 14px;
                  height: 14px;
                  background: url(../assets/img/hangye.png) no-repeat 0 0;
                  background-size: 12px 14px;
                }
              }
              .item4 {
                &::before {
                  content: '';
                  position: absolute;
                  top: 5px;
                  left: 0;
                  width: 14px;
                  height: 14px;
                  background: url(../assets/img/weizhi.png) no-repeat 0 0;
                  background-size: 12px 14px;
                }
              }
            }
            .box-row {
              padding-left: 56px;
              text-align: left;
              display: flex;
              .title {
                padding-right: 15px;
                flex: 1;
                font-size: 16px;
                line-height: 32px;
                color: #414a60;
                white-space: pre-wrap;
                word-break: break-all;
              }
              .title-info {
                padding-right: 15px;
                padding-top: 4px;
                flex: 2;
                white-space: pre-wrap;
                word-break: break-all;
                font-size: 12px;
                line-height: 24px;
                color: #9a9a9a;
              }
            }
            .box-row2 {
              padding-left: 56px;
              text-align: left;
              .title {
                padding-right: 15px;
                flex: 1;
                font-size: 16px;
                line-height: 32px;
                color: #414a60;
                white-space: pre-wrap;
                word-break: break-all;
              }
              .title-info {
                display: block;
                padding-right: 15px;
                padding-top: 4px;
                flex: 1;
                white-space: pre-wrap;
                word-break: break-all;
                font-size: 12px;
                line-height: 24px;
                color: #9a9a9a;
              }
            }
          }
          .btns-group {
            padding-right: 38px;
            .editor-btns {
              display: block;
              position: relative;
              padding-top: 10px;
              padding-left: 20px;
              font-size: 14px;
              line-height: 34px;
              color: #ff7272;
              text-align: left;
              cursor: pointer;
              &::before {
                content: '';
                position: absolute;
                top: 21px;
                left: 0;
                width: 12px;
                height: 12px;
                background: url(../assets/img/bianji.png) no-repeat 0 0;
                background-size: 12px 12px;
              }
            }
            .add-btns {
              @extend .editor-btns;
              &::before {
                content: '';
                background: url(../assets/img/add.png) no-repeat 0 0;
                background-size: 12px 12px;
              }
            }
          }
        }
        .editor {
          padding-left: 54px;
          padding-right: 54px;
          .title {
            padding-top: 20px;
            font-size: 16px;
            line-height: 36px;
            color: #24272e;
            text-align: left;
            font-weight: bold;
          }
          .form-row {
            display: flex;
            text-align: left;
            justify-content: space-between;
            .half {
              flex: 0 0 300px;
              width: 300px;
            }
            .half2 {
              flex: 0 0 132px;
              width: 132px;
            }
            .full-row {
              flex: 1;
            }
            .project-box {
              width: 100%;
              display: flex;
              justify-content: space-between;
            }
          }
          .form-action {
            padding-bottom: 24px;
            display: flex;
            justify-content: flex-end;
            .cancel-btns {
              margin-right: 20px;
              width: 90px;
              height: 34px;
              font-size: 14px;
              line-height: 34px;
              border: 1px solid #e3e7ed;
              color: #495060;
              text-align: center;
              cursor: pointer;
            }
            .save-btns {
              width: 90px;
              height: 34px;
              font-size: 14px;
              line-height: 34px;
              border: 1px solid #ff7272;
              color: #fff;
              text-align: center;
              background-color: #ff7272;
              cursor: pointer;
            }
          }
        }
        .line {
          padding-top: 20px;
          margin-bottom: 20px;
          margin-left: 40px;
          margin-right: 40px;
          border-bottom: 1px solid #797979;
        }
      }
      .el-radio-group {
        display: flex;
        .el-radio__input {
          display: none;
          overflow: hidden;
        }
        .el-radio__label {
          display: block;
          margin: 0;
          padding: 0;
          width: 140px;
          height: 38px;
          border: 1px solid #c0c4cc;
          font-size: 14px;
          line-height: 38px;
          color: #9fa3b0;
          text-align: center;
        }
        .is-checked {
          .el-radio__label {
            color: #ff7272;
            border-color: #ff7272;
            background-color: #ffecec;
          }
        }
      }
    }
    & > .right {
      margin-left: 30px;
      width: 360px;
      .upload-resume {
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 54px;
        background: #fff;
        & > h2 {
          font-size: 14px;
          line-height: 54px;
          color: #414a60;
          text-align: left;
        }
        .upload-resume-btn {
          margin: 26px auto;
          width: 168px;
          height: 42px;
          font-size: 16px;
          line-height: 42px;
          color: #fff;
          background: #ff7272;
        }
      }
      .set-resume {
        margin-top: 20px;
        padding: 20px;
        background: #fff;
        .el-radio-group {
          width: 50%;
        }
        .el-radio.is-checked {
          .el-radio__label {
            color: #ff7272;
          }
          .el-radio__inner {
            background: #ff7272;
            border-color: #ff7272;
          }
        }
        .el-radio {
          .el-radio__inner {
            &:hover {
              border-color: #ff7272;
            }
          }
        }
        .el-switch__label.is-active {
          color: #ff7272;
        }
        .tag-wrap {
          .el-tag {
            margin-right: 10px;
          }
          .el-form-item__content {
            margin-top: 40px;
            text-align: left;
          }
          .tag-input {
            width: 100px;
          }
        }
      }
      .refresh-resume {
        @extend .upload-resume;
        margin-top: 20px;
      }
    }
  }
  .el-form-item__label {
    &::before {
      content: '';
      display: none;
    }
  }
  .el-input__inner {
    border-radius: 0;
  }
  .el-radio-group,
  .el-date-editor,
  .el-select {
    width: 100%;
  }
  .el-form-item__error {
    display: none;
  }
  .el-textarea {
    .el-textarea__inner {
      height: 124px;
      resize: none;
      border-radius: 0;
    }
  }
  .el-cascader {
    width: 100%;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f06358ff;
    border-color: #f06358ff;
  }
  .el-checkbox__inner:hover {
    border-color: #f06358ff;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #f06358ff;
    border-color: #f06358ff;
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #f06358ff;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #f06358ff;
  }
  .el-upload__input {
    display: none;
  }
}
</style>