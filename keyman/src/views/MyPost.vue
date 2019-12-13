<template>
  <div class="my-post">
    <!-- 用户类型--内部猎头 -->
    <div v-if="getUserType === '3' || getUserType === '2'">
      <div class="operation">
        <span class="create-resume" @click="onCreatePost">创建职位</span>
        <div class="checkbox-group">
          <el-checkbox v-model="createdPost" label="我创建的职位"></el-checkbox>
          <span class="num">(0)</span>
        </div>
        <div class="checkbox-group">
          <el-checkbox v-model="receivedPost" label="我领取的职位"></el-checkbox>
          <span class="num">(0)</span>
        </div>
        <div class="checkbox-group">
          <el-checkbox v-model="deletedPost" label="已删除职位"></el-checkbox>
          <span class="num">(0)</span>
        </div>
        <div class="checkbox-group">
          <el-checkbox v-model="publishingPost" label="发布中职位"></el-checkbox>
          <span class="num">(0)</span>
        </div>
        <div class="checkbox-group">
          <el-checkbox v-model="pausePost" label="暂停"></el-checkbox>
          <span class="num">(0)</span>
        </div>
        <span class="all-num">共计： 0</span>
        <span class="refresh">刷新职位</span>
        <el-select class="order-btn" v-model="order">
          <el-option label="智能排序" value="1"></el-option>
          <el-option label="按刷新排序" value="2"></el-option>
        </el-select>
      </div>
      <div v-show="postList.length" class="post-list">
        <div
          class="post-item"
          v-for="item in postList"
          :key="item.id"
          :class="{'disabled': item.status === 0}"
        >
          <div class="content">
            <div class="info-avatar">
              <div class="avatar">
                <img :src="item.avatar" alt />
              </div>
              <div class="info">
                <div class="title">
                  <span class="name">{{item.job_title}}</span>
                  <span
                    class="wages"
                  >月薪{{item.salary_above | filterSalary}}-{{item.salary_below | filterSalary}} {{item.month_money | filterMonthMoney}}</span>
                  <span class="preview" @click="onDetail(item)">预览职位</span>
                </div>
                <div
                  class="subtitle"
                >{{item.province}}|{{item.work_year |filterWorkYear}}|{{item.education | filterEdu}}</div>
                <div
                  class="detail"
                >{{item.company_name}}|{{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</div>
              </div>
            </div>
            <div class="info2">
              <div class="box">
                <p class="num">{{item.new_resume}}</p>
                <p class="txt">新投递</p>
              </div>
              <div class="box">
                <p class="num">{{item.talk_num}}</p>
                <p class="txt">正沟通</p>
              </div>
              <div class="box">
                <p class="num">{{item.sc_num}}</p>
                <p class="txt">已上传</p>
              </div>
              <div class="box">
                <p class="num">{{item.hx_num}}</p>
                <p class="txt">以后选</p>
              </div>
              <div class="box">
                <p class="num">{{item.cs_num}}</p>
                <p class="txt">已转送</p>
              </div>
            </div>
            <div class="btns-group">
              <p class="txt">全部人选({{item.sc_num}})</p>
              <div class="upload-resume">上传简历</div>
            </div>
          </div>
          <div class="time">
            <div class="times">
              <span class="time-item">创建时间：</span>
              <span class="time-item">发布时间：</span>
              <span class="time-item">暂停时间：</span>
            </div>
            <div class="btns">
              <span class="btn" @click.stop="onReFreshPost(item, 4)">刷新职位</span>
              <span class="btn" @click.stop="onEditorPost(item)">编辑职位</span>
              <span class="btn" @click.stop="onRePausePost(item, 2)">暂停职位</span>
              <span class="btn delete" @click.stop="onDeletePost(item, 3)">删除职位</span>
            </div>
          </div>
          <div class="disabed-tips">该职位已经被管理员下架，请注意您的操作，恢复请联系客服</div>
        </div>
      </div>
      <el-pagination
        v-show="postList.length"
        layout="prev, pager, next"
        @current-change="onPageChange"
        :total="allPostCount"
      ></el-pagination>
      <div v-if="!postList.length" class="post-list-nothing">
        <img src="../assets/img/nothing_icon@2x.png" alt />
      </div>
      <!-- 创建职位 -->
      <el-dialog
        :visible.sync="model"
        @open="onModelOpen"
        :model-append-to-body="false"
        width="1240px"
      >
        <el-form
          :model="position"
          :rules="positionRules"
          class="create-position"
          ref="positionWrap"
        >
          <div class="title-wrap">
            <h2>基本信息</h2>
            <p class="subtitle">加*内容，在确认发布成功后，将无法修改</p>
          </div>
          <div class="rows">
            <div class="left">
              <el-form-item prop="job_name" label="职位名称">
                <el-input v-model="position.job_name"></el-input>
              </el-form-item>
              <p class="input-tips">汉子、英文，最多8个字</p>
              <el-form-item prop="job_category" label="职位类型">
                <el-select v-model="position.job_category">
                  <el-option
                    v-for="item in postSelect"
                    :key="item.c_id"
                    :label="item.class_name"
                    :value="item.c_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="province" label="工作城市">
                <!-- 工作城市特殊处理 -->
                <el-cascader
                  v-model="position.province"
                  :options="addressSelect"
                  :props="{
                      value: 'name',
                      label: 'name',
                      children: 'data_list'
                    }"
                ></el-cascader>
              </el-form-item>
              <el-form-item prop="company_name" label="公司名称">
                <el-input v-model="position.company_name" maxlength="8" placeholder="*公司名称"></el-input>
              </el-form-item>
              <p class="input-tips">汉子、英文，最多8个字</p>
            </div>
            <div class="right">
              <el-form-item prop="logo">
                <el-upload action="#" :before-upload="onBeforeUploadLogo">
                  <div class="img-wrap">
                    <img :src="companyLogo" alt />
                  </div>
                  <div class="btns-group-upload">
                    <span class="upload">上传</span>
                    <!-- <span class="preview">预览</span> -->
                  </div>
                </el-upload>
              </el-form-item>
            </div>
          </div>
          <div class="title-wrap">
            <h2>职位协作</h2>
          </div>
          <el-form-item prop="cooperation_type" class="rows rows2">
            <el-radio-group v-model="position.cooperation_type">
              <div class="left">
                <el-radio :label="1">开放领取</el-radio>
                <p class="radio-tips">公司内部猎头级兼职猎头可领取此职位</p>
              </div>
              <div class="right">
                <el-radio :label="2">关闭领取</el-radio>
              </div>
            </el-radio-group>
          </el-form-item>

          <div class="title-wrap">
            <h2>职位要求</h2>
            <p class="subtitle">尽量详细填写</p>
          </div>
          <div class="rows rows3">
            <div class="left">
              <el-form-item prop="work_year" label="经    验">
                <el-select v-model="position.work_year">
                  <el-option label="不限" :value="0"></el-option>
                  <el-option label="在校生" :value="1"></el-option>
                  <el-option label="应届生" :value="2"></el-option>
                  <el-option label="一年以下" :value="3"></el-option>
                  <el-option label="1-3年" :value="4"></el-option>
                  <el-option label="3-5年" :value="5"></el-option>
                  <el-option label="5-10年" :value="6"></el-option>
                  <el-option label="10年以上" :value="7"></el-option>
                </el-select>
                <p class="tips">未选择显示-经验不限</p>
              </el-form-item>
              <el-form-item prop="education" label="学    历">
                <el-select v-model="position.education">
                  <el-option label="不限" :value="0"></el-option>
                  <el-option label="初中及以下" :value="1"></el-option>
                  <el-option label="中专/技校" :value="2"></el-option>
                  <el-option label="高中" :value="3"></el-option>
                  <el-option label="大专" :value="4"></el-option>
                  <el-option label="本科" :value="5"></el-option>
                  <el-option label="硕士" :value="6"></el-option>
                  <el-option label="博士" :value="7"></el-option>
                </el-select>
                <p class="tips">未选择显示-学历不限</p>
              </el-form-item>
              <el-form-item prop="age_above" class="double" label="年    龄">
                <el-input v-model.number="position.age_above" placeholder="最小年龄"></el-input>
                <span class="zhi">-</span>
                <el-input v-model.number="position.age_below" placeholder="最大年龄"></el-input>
                <p class="tips">未选择显示-年龄不限</p>
              </el-form-item>
              <el-form-item prop="salary_above" class="double" label="月    薪">
                <el-input v-model.number="position.salary_above" maxlength="9"></el-input>
                <span class="zhi">-</span>
                <el-input v-model.number="position.salary_below" maxlength="9"></el-input>
              </el-form-item>
              <el-form-item prop="month_money" label="奖    金">
                <el-input v-model.number="position.month_money" placeholder="多少薪"></el-input>
                <p class="tips">未选择-不显示奖金</p>
              </el-form-item>
              <el-form-item label="接收邮箱">
                <p class="email">{{userEmail}}</p>
                <p class="tips">请在账户信息中修改</p>
              </el-form-item>
            </div>
            <div class="right textarea-wrap">
              <el-form-item prop="description" label="职位描述">
                <el-input
                  v-model="position.description"
                  type="textarea"
                  maxlength="3000"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item label="职位点评">
                <el-input v-model="position.zwxq" type="textarea" maxlength="3000" show-word-limit></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="btns-group-form">
            <span class="preview-post" @click="onPreviewPost">预览职位</span>
            <span v-if="postFormStatus === 0" class="save-post" @click="onAddPost">保存职位</span>
            <span v-if="postFormStatus === 1" class="save-post" @click="onSaveEditorPost">保存职位</span>
          </div>
        </div>
      </el-dialog>
      <!-- 职位详情 -->
      <el-dialog :visible.sync="detail" :model-append-to-body="false" width="1240px">
        <div class="detail-box">
          <div class="head">
            <p></p>
            <div>
              <img :src="detailData.url" alt />
              <div>
                <div>
                  <span>{{detailData.job_name}}</span>
                  <span>月薪{{detailData.salary_above | filterSalary}}-{{detailData.salary_below | filterSalary}}</span>
                  <img src="../assets/img/zhuangtai.png" alt />
                  <span>{{detailData.nickname}}</span>
                  <img src="../assets/img/zhiwei.png" alt />
                  <span>{{detailData.rank}}</span>
                  <span v-if="detailData.type === 1" class="status publish">发布中</span>
                  <span v-else-if="detailData.type === 2" class="status pause">暂停中</span>
                  <span v-else-if="detailData.type === 3" class="status delete">已删除</span>
                </div>
                <div>{{detailData.city}} | {{ detailData.work_year | filterWorkYear}}| {{detailData.education | filterEdu}}</div>
                <div>{{detailData.company_name}} | {{detailData.employee_num | filterCompanySize}} | {{detailData.comkind | filterComkind}}</div>
              </div>
              <div>
                <div>
                  <img src="../assets/img/wx2.png" alt />
                  <div>分享至微信</div>
                  <div v-show="detailTag === 'post'" class="post-switch">
                    <span
                      v-show="editorOrSee === 'editor'"
                      @click="onEditorSee('see')"
                      class="save"
                    >保存</span>
                    <span
                      v-show="editorOrSee === 'see'"
                      @click="onEditorSee('editor')"
                      class="editor"
                    >编辑职位</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-info">
            <ul>
              <li :class="{'cur': detailTag === 'post'}" @click="onSwitchTag('post')">职位</li>
              <li :class="{'cur': detailTag === 'company'}" @click="onSwitchTag('company')">公司</li>
              <li :class="{'cur': detailTag === 'info'}" @click="onSwitchTag('info')">猎头信息</li>
            </ul>
            <div class="detail-content">
              <div v-show="detailTag === 'post'" class="post">
                <div v-show="editorOrSee === 'editor'" class="editor-post">
                  <el-form :model="detailData" :rules="detailRules" label-position="top">
                    <el-form-item label="薪资结构">
                      <el-input
                        v-model.number="detailData.salary_above"
                        maxlength="9"
                        placeholder="薪资最小值"
                      ></el-input>
                      <span class="to">至</span>
                      <el-input
                        v-model.number="detailData.salary_below"
                        maxlength="9"
                        placeholder="薪资最大值"
                      ></el-input>
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
                    >{{detailData.salary_above | filterSalary}}-{{detailData.salary_below | filterSalary}}</p>
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
                        >{{detailCompanyData.employee_num | filterCompanySize}}|{{detailCompanyData.comkind | filterComkind}}</p>
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
                        >{{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</p>
                        <p
                          class="intro"
                        >{{item.company_name}}| {{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</p>
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
                        >{{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</p>
                        <p
                          class="intro"
                        >{{item.company_name}}| {{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</p>
                      </div>
                      <div class="avatar">
                        <img :src="item.logo" alt />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 用户类型--外部猎头 -->
    <div v-if="getUserType === '4'">
      <div class="operation">
        <div class="box">
          <router-link :to="'/user/getpost'" class="create-resume" tag="span">领取职位</router-link>
          <div class="checkbox-group">
            <el-checkbox v-model="createdPost" label="以放弃职位"></el-checkbox>
            <span class="num">(0)</span>
          </div>
        </div>
        <div class="box">
          <el-select class="order-btn" v-model="order">
            <el-option label="全部状态" value="1"></el-option>
            <el-option label="已暂停" value="2"></el-option>
            <el-option label="发布中" value="3"></el-option>
          </el-select>
          <el-select class="order-btn" v-model="order">
            <el-option label="智能排序" value="1"></el-option>
            <el-option label="按刷新排序" value="2"></el-option>
          </el-select>
        </div>
      </div>
      <div v-show="postList.length" class="post-list">
        <div
          class="post-item"
          v-for="item in postList"
          :key="item.id"
          :class="{'disabled': item.status === 0}"
        >
          <div class="content">
            <div class="info-avatar">
              <div class="avatar">
                <img :src="item.avatar" alt />
              </div>
              <div class="info">
                <div class="title">
                  <span class="name">{{item.job_title}}</span>
                  <span
                    class="wages"
                  >月薪{{item.salary_above | filterSalary}}-{{item.salary_below | filterSalary}} {{item.month_money | filterMonthMoney}}</span>
                  <span class="preview" @click="onDetail(item)">预览职位</span>
                </div>
                <div
                  class="subtitle"
                >{{item.province}}|{{item.work_year |filterWorkYear}}|{{item.education | filterEdu}}</div>
                <div
                  class="detail"
                >{{item.company_name}}|{{item.employee_num | filterCompanySize}}|{{item.comkind | filterComkind}}</div>
              </div>
            </div>
            <div class="info2">
              <div class="box">
                <p class="num">{{item.new_resume}}</p>
                <p class="txt">新投递</p>
              </div>
              <div class="box">
                <p class="num">{{item.talk_num}}</p>
                <p class="txt">正沟通</p>
              </div>
              <div class="box">
                <p class="num">{{item.sc_num}}</p>
                <p class="txt">已上传</p>
              </div>
              <div class="box">
                <p class="num">{{item.hx_num}}</p>
                <p class="txt">以后选</p>
              </div>
              <div class="box">
                <p class="num">{{item.cs_num}}</p>
                <p class="txt">已转送</p>
              </div>
            </div>
            <div class="btns-group">
              <p class="txt">全部人选({{item.sc_num}})</p>
              <div class="upload-resume">上传简历</div>
            </div>
          </div>
          <div class="time">
            <div class="times">
              <span class="time-item">创建时间：</span>
              <span class="time-item">发布时间：</span>
              <span class="time-item">暂停时间：</span>
            </div>
            <div class="btns">
              <span class="btn" @click.stop="onRePausePost(item, 2)">放弃职位</span>
              <span class="btn delete" @click.stop="onDeletePost(item, 3)">删除职位</span>
            </div>
          </div>
          <div class="disabed-tips">该职位已经被管理员下架，请注意您的操作，恢复请联系客服</div>
        </div>
      </div>
    </div>
    <!-- 操作职位-model -->
    <el-dialog
      :visible.sync="tipsModel.show"
      :title="tipsModel.title"
      :model-append-to-body="false"
      width="360px"
    >
      <div class="title-w">
        <div class="title">
          <span>{{tipsModel.message}}</span>
        </div>
        <p class="message">{{tipsModel.message2}}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getMyPost,
  getDetailPost,
  getDetailCompany,
  getDetailHH,
  createPost,
  editorPost,
  ediotrPostStatus,
  getAllPost,
  getAllAddress,
  getUserEmail,
  getPostEditorInfo
} from '@/api/api'
export default {
  name: 'MyPost',
  data() {
    return {
      createdPost: false,
      receivedPost: false,
      deletedPost: false,
      publishingPost: false,
      pausePost: false,
      order: '',
      model: false,
      detail: false,
      currentDetailId: '',
      detailData: {
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
      },
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
      detailCompanyData: {
        job_name: null,
        salary_above: 5,
        salary_below: 20,
        nickname: '张三',
        rank: null,
        type: null,
        city: '北京市',
        work_year: 1,
        education: 3,
        company_name: '北京智慧小喇叭',
        employee_num: '4',
        comkind: 4,
        logo: '',
        website: 'http://www.baidu.com',
        profile: '',
        id: 1,
        data_list: [
          {
            company_name: '北京智慧小喇叭',
            employee_num: '4',
            comkind: 4,
            salary_above: 5,
            salary_below: 20,
            logo: ''
          }
        ]
      },
      detailInfoData: {
        job_name: null,
        salary_above: 5,
        salary_below: 20,
        nickname: '张三',
        rank: null,
        type: null,
        city: '北京市',
        work_year: 1,
        education: 3,
        company_name: '北京智慧小喇叭',
        employee_num: '4',
        comkind: 4,
        logo: '',
        website: '',
        profile: '',
        id: 1,
        headimgurl: '/uploads/admin/1563244624666.jpg',
        age: 18,
        data_list: [
          {
            company_name: '北京智慧小喇叭',
            employee_num: '4',
            comkind: 4,
            salary_above: 5,
            salary_below: 20,
            logo: ''
          }
        ]
      },
      position: {
        member_id: '',
        token: '',
        job_name: '',
        job_category: '',
        province: [],
        district: '',
        city: '',
        company_name: '',
        cooperation_type: '',
        work_year: 0,
        education: 0,
        age_above: 18,
        age_below: 0,
        salary_above: '',
        salary_below: '',
        month_money: 0,
        zwxq: '',
        description: '',
        logo: '',
        uploadFileSign: ['logo']
      },
      postList: [
        // {
        //   id: 1,
        //   com_id: 1,
        //   job_title: 'PHP开发',
        //   salary_above: 5,
        //   salary_below: 20,
        //   province: '北京市',
        //   city: '北京市',
        //   district: '朝阳区',
        //   work_year: 1,
        //   month_money: 12,
        //   education: 3,
        //   company_name: '北京智慧小喇叭',
        //   employee_num: '4',
        //   comkind: 4,
        //   new_resume: 0,
        //   talk_num: 5,
        //   sc_num: 0,
        //   hx_num: 0,
        //   cs_num: 0
        // }
      ],
      positionRules: {
        job_name: [{ required: true, message: '' }],
        job_category: [{ required: true, message: '' }],
        province: [{ required: true, message: '' }],
        city: [{ required: true, message: '' }],
        company_name: [{ required: true, message: '' }],
        cooperation_type: [{ required: true, message: '' }],
        salary_above: [{ required: true, message: '', type: 'number' }],
        salary_below: [{ required: true, message: '', type: 'number' }],
        age_above: [{ required: false, message: '', type: 'number' }],
        age_below: [{ required: false, message: '', type: 'number' }],
        month_money: [{ required: false, message: '', type: 'number' }],
        description: [{ required: true, message: '' }],
        logo: [{ required: true, message: '' }]
      },
      detailTag: 'post',
      editorOrSee: 'see',
      getPostListOption: {
        member_id: '',
        token: '',
        page: 1, // 我的职位 当前页数
        number: 10 // 我的职位 每页条数
      },
      allPostCount: 0,
      addressSelect: [],
      postSelect: [],
      companyLogo: '',
      userEmail: '',
      currentPageNum: 1,
      postFormStatus: 0, // 0 添加 1 编辑
      tipsModel: {
        show: false,
        title: '操作提示',
        message: '成功',
        message2: '祝您工作愉快'
      }
    }
  },
  computed: {
    ...mapGetters(['getUserType', 'getMemberId', 'getToken'])
  },
  created() {
    this.initPostList()
    this.initSelectData()
    this.onGetUserEmail()
  },
  methods: {
    onCreatePost() {
      this.postFormStatus = 0
      this.companyLogo = ''
      this.model = true
    },
    onSwitchTag(val) {
      this.detailTag = val
      if (val === 'company') {
        this.getDetailCompanyData()
      }
      if (val === 'info') {
        this.getDetailInfoData()
      }
    },
    onEditorSee(val) {
      // 职位详情-职位-保存
      this.editorOrSee = val
      // 暂时缺少保存接口
    },
    onModelOpen() {
      // 创建职位-初始化form
      if (this.postFormStatus === 0) {
        const initData = {
          member_id: '',
          token: '',
          job_name: '',
          job_category: '',
          province: [],
          district: '',
          city: '',
          company_name: '',
          cooperation_type: '',
          work_year: 0,
          education: 0,
          age_above: 18,
          age_below: 0,
          salary_above: 0,
          salary_below: 0,
          month_money: 0,
          zwxq: '',
          description: '',
          logo: '',
          uploadFileSign: ['logo']
        }
        this.$nextTick(() => {
          this.position = initData
          this.$refs.positionWrap.resetFields()
        })
      }
    },
    initPostList(currentPage = 1) {
      this.getPostListOption = Object.assign({}, this.getPostListOption, {
        token: this.getToken,
        member_id: this.getMemberId,
        page: currentPage
      })
      getMyPost(this.getPostListOption).then(res => {
        if (res.code === 200) {
          this.postList = res.data.reverse()
          this.allPostCount = res.pagelist.count_num
        } else if (res.code === 40001) {
          this.postList = []
        }
      })
    },
    onPageChange(pageNum) {
      this.initPostList(pageNum)
      this.currentPageNum = pageNum
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
    onEditorPost(data) {
      this.postFormStatus = 1
      let address = []
      if (data.province) {
        address.push(data.province)
      }
      if (data.city) {
        data.city !== data.province && address.push(data.city)
      }
      if (data.district) {
        data.district !== data.city && address.push(data.district)
      }
      getPostEditorInfo({
        member_id: this.getMemberId,
        token: this.getToken,
        id: data.id
      }).then(res => {
        if (res.code === 200) {
          const editorInfo = Object.assign({}, data, res.data, {
            token: this.getToken,
            member_id: this.getMemberId,
            province: address,
            com_id: data.com_id
          })

          this.companyLogo = res.data.logo // 预览logo
          this.model = true
          this.$nextTick(() => {
            this.position = editorInfo
            this.$refs.positionWrap.resetFields()
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    onSaveEditorPost() {
      let data = {
        district: '',
        city: '',
        province: ''
      }
      if (this.position.province && this.position.province.length >= 3) {
        data = Object.assign({}, this.position, {
          district: this.position.province[this.position.province.length - 1],
          city: this.position.province[1],
          province: this.position.province[0]
        })
      } else if (
        this.position.province &&
        this.position.province.length === 2
      ) {
        data = Object.assign({}, this.position, {
          district: this.position.province[1],
          city: this.position.province[0],
          province: this.position.province[0]
        })
      } else if (this.position.province && this.position.province.length <= 1) {
        data = Object.assign({}, this.position, {
          district: this.position.province[0],
          city: this.position.province[0],
          province: this.position.province[0]
        })
      }
      this.$refs.positionWrap.validate(valid => {
        if (valid) {
          editorPost(data).then(res => {
            if (res.code === 200) {
              this.model = false
              this.initPostList(this.currentPageNum)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
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
    initSelectData() {
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
      Promise.all([getAllAddress(), getAllPost()]).then(res => {
        if (res) {
          if (res[0].code === 200) {
            loop(res[0].data)
            this.addressSelect = res[0].data
          }
          if (res[1].code === 200) {
            this.postSelect = res[1].data
          }
        }
      })
    },
    onPreviewAvatar(file, key) {
      //预览头像
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.addEventListener('load', e => {
        this[`${key}`] = e.target.result
      })
    },
    onBeforeUploadLogo(file) {
      this.onPreviewAvatar(file, 'companyLogo')
      this.position.logo = file
      return false
    },
    onGetUserEmail() {
      getUserEmail({
        token: this.getToken,
        member_id: this.getMemberId
      }).then(res => {
        if (res.code === 200) {
          this.userEmail = res.data.email
        }
      })
    },
    onAddPost() {
      // 对地区特殊处理
      this.position.token = this.getToken
      this.position.member_id = this.getMemberId
      let data = {
        district: '',
        city: '',
        province: ''
      }
      if (this.position.province && this.position.province.length >= 3) {
        data = Object.assign({}, this.position, {
          district: this.position.province[this.position.province.length - 1],
          city: this.position.province[1],
          province: this.position.province[0]
        })
      } else if (
        this.position.province &&
        this.position.province.length === 2
      ) {
        data = Object.assign({}, this.position, {
          district: this.position.province[1],
          city: this.position.province[0],
          province: this.position.province[0]
        })
      } else if (this.position.province && this.position.province.length <= 1) {
        data = Object.assign({}, this.position, {
          district: this.position.province[0],
          city: this.position.province[0],
          province: this.position.province[0]
        })
      }
      this.$refs.positionWrap.validate(valid => {
        if (valid) {
          createPost(data).then(res => {
            if (res.code === 200) {
              this.model = false
              this.initPostList()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onPreviewPost() {
      console.log(this.position)
    },
    onReFreshPost(data, type) {
      ediotrPostStatus({
        member_id: this.getMemberId,
        token: this.getToken,
        id: data.id,
        type: type
      }).then(res => {
        this.tipsModel.show = true
        this.tipsModel.message = res.message
      })
    },
    onRePausePost(data, type) {
      ediotrPostStatus({
        member_id: this.getMemberId,
        token: this.getToken,
        id: data.id,
        type: type
      }).then(res => {
        this.tipsModel.show = true
        this.tipsModel.message = res.message
      })
    },
    onDeletePost(data, type) {
      ediotrPostStatus({
        member_id: this.getMemberId,
        token: this.getToken,
        id: data.id,
        type: type
      }).then(res => {
        this.tipsModel.show = true
        this.tipsModel.message = res.message
        if (res.code === 200) {
          this.initPostList(this.currentPageNum)
        }
      })
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
      const str = `${num}`
      return str.length > 3 ? `${str.slice(0, -3)}K` : '1K'
    },
    filterMonthMoney(num) {
      return num > 0 ? `${num}薪` : ''
    }
  }
}
</script>

<style lang="scss">
body {
  background: #eff1f5ff;
}
.my-post {
  width: 1240px;
  margin: 0 auto;
  .operation {
    margin-top: 36px;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    .box {
      display: flex;
    }
    .create-resume {
      margin-right: 24px;
      display: block;
      padding: 0 20px;
      font-size: 16px;
      line-height: 30px;
      border: 1px solid #fe7177ff;
      border-radius: 4px;
      color: #fe7177ff;
      cursor: pointer;
      &:hover {
        background-color: #ff7272ff;
        color: #fff;
      }
    }
    .checkbox-group {
      white-space: nowrap;
    }
    .el-checkbox__label {
      font-size: 18px;
      line-height: 30px;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #424a5eff;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #caeaf9ff;
      color: #2d476eff;
      border-color: #7d92afff;
    }
    .el-checkbox__inner::after {
      border-color: #253e67;
    }
    .all-num {
      margin-left: 16px;
      padding-left: 16px;
      border-left: 1px solid #999999ff;
      line-height: 18px;
      color: #424a5eff;
      white-space: nowrap;
      cursor: pointer;
    }
    .refresh {
      position: relative;
      padding-left: 32px;
      padding-right: 12px;
      font-size: 14px;
      line-height: 26px;
      background-color: #fa776fff;
      color: #fff;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 4px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 10px;
        margin-top: -10px;
        width: 20px;
        height: 20px;
        background: url(../assets/img/refresh@2x.png) no-repeat 0 0;
        background-size: 20px 20px;
      }
    }
    .order-btn .el-input .el-input__inner {
      position: relative;
      padding-left: 15px;
      padding-right: 12px;
      width: 100px;
      font-size: 14px;
      line-height: 26px;
      background-color: #fa776fff;
      color: #fff;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 4px;
      height: 26px;
      border: none;
    }
    .order-btn {
      margin-left: 20px;
      .el-input__icon {
        line-height: 26px;
        color: #fff;
      }
      .el-select .el-input .el-select__caret {
        color: #fff;
      }
    }
  }
  .post-list {
    margin-top: 20px;
    .post-item {
      position: relative;
      & > .content {
        display: flex;
        padding: 20px 40px;
        background-color: #fff;
        justify-content: space-between;
        .info-avatar {
          display: flex;
        }
        .avatar {
          width: 80px;
          height: 80px;
          background-color: #e3e7edff;
          & > img {
            display: block;
            width: 80px;
            height: 80px;
          }
        }
        .info {
          margin-left: 18px;
          text-align: left;
          width: 345px;
          & > .title {
            display: flex;
            & > .name {
              font-size: 20px;
              line-height: 26px;
              font-weight: 600;
              color: #333333ff;
            }
            & > .wages {
              @extend .name;
              margin-left: 10px;
              color: #fd877dff;
              font-weight: normal;
            }
            & > .preview {
              @extend .wages;
              margin-left: 10px;
              color: #4799cc;
              cursor: pointer;
            }
          }
          & > .subtitle {
            font-size: 14px;
            line-height: 20px;
            color: #afb4b6ff;
          }
          & > .detail {
            font-size: 16px;
            line-height: 22px;
            color: #424a5eff;
          }
        }
        .info2 {
          display: flex;
          justify-content: space-between;
          & > .box {
            padding: 20px 12px;
            .num {
              position: relative;
              font-size: 16px;
              line-height: 20px;
              color: #414a60ff;
              &::after {
                content: '';
                position: absolute;
                top: -4px;
                right: -4px;
                width: 4px;
                height: 4px;
                border-radius: 4px;
                background-color: #fa776fff;
              }
            }
            .txt {
              font-size: 14px;
              line-height: 18px;
              color: #414a60ff;
            }
          }
        }
        .btns-group {
          width: 100px;
          & > .txt {
            font-size: 18px;
            line-height: 28px;
            color: #424a5eff;
            white-space: nowrap;
          }
          & > .upload-resume {
            margin-top: 10px;
            width: 100px;
            height: 28px;
            font-size: 14px;
            line-height: 28px;
            border: 1px solid #ff7272ff;
            border-radius: 4px;
            text-align: center;
            color: #ff7272ff;
            cursor: pointer;
          }
        }
      }
      & > .time {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        & > .times {
          display: flex;
          .time-item {
            display: block;
            margin-right: 16px;
            font-size: 14px;
            color: #848484;
            line-height: 40px;
          }
        }
        .btns {
          display: flex;
          .btn-custom {
            margin-left: 20px;
            font-size: 16px;
            line-height: 40px;
            color: #848484;
            &.delete {
              color: #cccccc;
              &:hover {
                color: #ff7272;
              }
            }
            &:hover {
              color: #ff7272;
            }
          }
        }
      }
      & > .disabed-tips {
        display: none;
        position: absolute;
        top: 50%;
        left: 120px;
        right: 120px;
        transform: translateY(-50%);
        font-size: 16px;
        line-height: 40px;
        color: #fff;
        background: #acb0bc;
        text-align: center;
      }
      &.disabled {
        position: relative;
        background: #e2e3e7;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1000;
        }
        & > .content {
          background: #e2e3e7;
          .avatar {
          }
          .info {
            .name {
              color: #a8aaae;
              font-weight: normal;
            }
            .detail {
              color: #a8aaae;
            }
          }
          .info2 {
            .box {
              .num {
                color: #a8aaae;
                &::after {
                  content: '';
                  background-color: #a8aaae;
                }
              }
              .txt {
                @extend .num;
              }
            }
          }
        }
        .btns-group {
          .txt {
            color: #a8aaae;
          }
          .upload-resume {
            color: #a8aaae;
            border-color: #a8aaae;
          }
        }
        .time {
          .times {
            .time-item {
              color: #a8aaae;
            }
          }
          .btns {
            .btn-custom {
              color: #a8aaae;
            }
          }
        }
        & > .disabed-tips {
          display: block;
        }
      }
    }
  }
  .el-pagination {
    margin-top: 8px;
    margin-bottom: 48px;
    padding-top: 24px;
    padding-bottom: 24px;
    width: 100%;
    background: #fff;
    .el-pager li {
      width: 38px;
      height: 32px;
      line-height: 32px;
      color: #414a60ff;
      &.active {
        background: #f06358ff;
        color: #fff;
      }
    }
    .btn-next {
      margin-left: 20px;
      width: 39px;
      height: 34px;
      background: url(../assets/img/page-right@2x.png) no-repeat 0 0;
      background-size: 39px 34px;
      & > i {
        display: none;
      }
    }
    .btn-prev {
      margin-right: 20px;
      width: 39px;
      height: 34px;
      background: url(../assets/img/page-left@2x.png) no-repeat 0 0;
      background-size: 39px 34px;
      & > i {
        display: none;
      }
    }
  }
  .post-list-nothing {
    margin-top: 20px;
    height: 738px;
    position: relative;
    background: #fff;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 360px;
      height: 256px;
    }
  }
  .title-w {
    height: 200px;
    & > .title {
      padding-top: 52px;
      font-size: 14px;
      line-height: 36px;
      color: #333;
      text-align: center;
      & > span {
        color: #ff7272;
      }
    }
    & > p {
      font-size: 14px;
      line-height: 36px;
      text-align: center;
    }
  }
  // 创建职位--开始
  .create-position {
    padding-left: 36px;
    padding-right: 36px;
    & > .title-wrap {
      padding-bottom: 8px;
      width: 1170px;
      text-align: left;
      border-bottom: 1px solid #dcdcdc;
      & > h2 {
        padding-left: 36px;
        padding-top: 26px;
        font-size: 24px;
        line-height: 32px;
        color: #414a60;
      }
      & > .subtitle {
        padding-left: 36px;
        font-size: 14px;
        line-height: 22px;
        color: #9fa3b0;
      }
    }
    & > .rows {
      display: flex;
      text-align: left;
      & > .left {
        padding-left: 34px;
        padding-top: 20px;
        flex: 1;
        .el-form-item {
          margin-bottom: 14px;
          white-space: nowrap;
          text-align: left;
          .el-form-item__label {
            font-size: 16px;
            font-weight: bold;
            color: #495060;
          }
          .el-input__inner {
            border-radius: 0;
            width: 340px;
          }
        }
        .input-tips {
          margin-top: -14px;
          padding-bottom: 12px;
          font-size: 14px;
          line-height: 20px;
          color: #9fa3b0;
          text-align: left;
          padding-left: 82px;
        }
      }
      & > .right {
        padding-left: 40px;
        flex: 1;
        text-align: left;
        .img-wrap {
          margin-top: 28px;
          width: 160px;
          height: 160px;
          background: url(../assets/img/upload_bg.png) no-repeat center center;
          background-size: 160px 160px;
          & > img {
            display: block;
            width: 160px;
            height: 160px;
          }
        }
        .el-upload__input {
          display: none;
        }
        .btns-group-upload {
          padding-top: 14px;
          display: flex;
          & > .upload {
            display: block;
            width: 72px;
            font-size: 14px;
            line-height: 40px;
            color: #fff;
            background-color: #4799cc;
            text-align: center;
            cursor: pointer;
          }
          & > .preview {
            @extend .upload;
            margin-left: 16px;
            background-color: #cccccc;
            text-align: center;
            cursor: pointer;
            &:hover {
              background: #ff7272;
            }
          }
        }
      }
      &.rows2 {
        .el-form-item__content {
          flex: 1;
          .el-radio-group {
            display: flex;
          }
        }
        .left {
          flex: 1;
          padding-top: 0;
          padding-left: 46px;
          display: flex;
          text-align: left;
        }
        .right {
          flex: 1;
          padding-left: 0;
        }
        .el-radio__label {
          font-size: 16px;
          line-height: 38px;
          color: #495060;
        }
        .radio-tips {
          margin-left: -10px;
          font-size: 14px;
          line-height: 38px;
          color: #9fa3b0;
        }
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #ff7272;
          background: #ff7272;
        }
      }
      &.rows3 {
        .left {
          .el-form-item {
            .el-input__inner {
              width: 230px;
            }
            &.double {
              .el-input,
              .el-input__inner {
                width: 100px;
              }
              .zhi {
                display: inline-block;
                vertical-align: top;
                margin-top: 20px;
                width: 10px;
                height: 1px;
                margin-left: 10px;
                margin-right: 10px;
                background-color: #d6d7de;
                font-size: 0;
              }
            }
            .el-form-item__content {
              display: flex;
              text-align: left;
              .tips {
                margin-left: 10px;
                display: block;
                font-size: 14px;
                line-height: 40px;
                color: #9fa3b0;
              }
              .email {
                width: 230px;
              }
            }
          }
        }
        .right {
          flex: 1;
          padding-top: 20px;
          .el-form-item {
            display: flex;
            text-align: left;
            .el-form-item__label {
              font-size: 16px;
              line-height: 40px;
              color: #495060;
              font-weight: bold;
            }
            textarea {
              resize: none;
              width: 450px;
              height: 144px;
            }
          }
        }
        .textarea-wrap {
          .el-form-item {
            position: relative;
            &::after {
              content: '';
              position: absolute;
              right: 95px;
              bottom: 14px;
            }
          }
        }
      }
    }
  }
  .btns-group-form {
    display: flex;
    justify-content: flex-end;
    .preview-post {
      width: 100px;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      background-color: #cccccc;
      text-align: center;
      cursor: pointer;
    }
    .save-post {
      @extend .preview-post;
      margin-left: 36px;
      margin-right: 36px;
      background-color: #ff7272;
    }
  }
  .el-form-item__label {
    &::before {
      content: '';
      display: none;
    }
  }
  .el-form-item__error {
    display: none;
  }
  .el-form-item {
    position: relative;
    display: flex;
    align-items: center;
    &.is-error {
      &::after {
        content: '';
        margin-left: 20px;
        width: 20px;
        height: 20px;
        background: url(../assets/img/input_error_icon@2x.png) no-repeat 0 0;
        background-size: 20px 20px;
      }
    }
    &.is-success {
      &::after {
        content: '';
        margin-left: 20px;
        width: 20px;
        height: 20px;
        background: url(../assets/img/input_success_icon@2x.png) no-repeat 0 0;
        background-size: 20px 20px;
        margin-top: 0;
      }
    }
  }

  .el-dialog__header {
    height: 0px;
    padding: 0;
    // display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
  // 创建职位--结束
  // 职位详情--开始
  .detail-box {
    width: 1240px;
    margin: 0 auto 0;
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
  .detail-box > .head > div:nth-child(2) > div:nth-child(3) {
    // height: 115px;
  }
  .detail-box > .head > div:nth-child(2) > div:nth-child(3) > div:first-child {
    position: relative;
    margin-top: 52px;
    margin-right: 18px;
    display: flex;
    padding-top: 64px;
    justify-content: center;
    width: 180px;
    cursor: pointer;
  }
  .detail-box
    > .head
    > div:nth-child(2)
    > div:nth-child(3)
    > div:first-child
    > img:first-child {
    display: inline-block;
    height: 16px;
    width: 16px;
    margin-right: 6px;
    margin-top: 15px;
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
    background: #fff;
    overflow: hidden;
  }
  .detail-info > ul {
    height: 46px;
    width: 100%;
    border-bottom: 1px solid #a5a5a5;
    overflow: hidden;
    padding-left: 6px;
  }
  .detail-info > ul li {
    line-height: 45px;
    height: 45px;
    font-size: 15px;
    margin: 0 24px;
    float: left;
    cursor: pointer;
  }
  .detail-info > ul li.cur {
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
      .post-switch {
        position: absolute;
        left: 0;
        top: 0;
        width: 180px;
        height: 46px;
        background: #ff7272;
        text-align: center;
        font-size: 18px;
        line-height: 46px;
        color: #fff;
        & > span {
          display: block;
        }
      }
    }
    .detail-content {
      min-height: 500px;
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
              width: 526px;
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
  }
  // 职位详情--结束
}
</style>