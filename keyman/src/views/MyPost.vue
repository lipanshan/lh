<template>
  <div class="my-post">
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
      <div class="post-item">
        <div class="content">
          <div class="info-avatar">
            <div class="avatar">
              <img src alt />
            </div>
            <div class="info">
              <div class="title">
                <span class="name">职位名称</span>
                <span class="wages">月薪5-6K 13薪</span>
                <span class="preview">预览职位</span>
              </div>
              <div class="subtitle">城市|工龄|学历</div>
              <div class="detail">公司名称|规模|融资、资质</div>
            </div>
          </div>
          <div class="info2">
            <div class="box">
              <p class="num">120</p>
              <p class="txt">新投递</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">正沟通</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">已上传</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">以后选</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">已转送</p>
            </div>
          </div>
          <div class="btns-group">
            <p class="txt">全部人选(10)</p>
            <div class="upload-resume">上传简历</div>
          </div>
        </div>
        <div class="time">
          <div class="times">
            <span class="time-item">创建时间：2017.11.18</span>
            <span class="time-item">发布时间：2017.11.18</span>
            <span class="time-item">暂停时间：2017.11.18</span>
          </div>
          <div class="btns">
            <span class="btn">刷新职位</span>
            <span class="btn">编辑职位</span>
            <span class="btn">暂停职位</span>
            <span class="btn delete">删除职位</span>
          </div>
        </div>
        <div class="disabed-tips">该职位已经被管理员下架，请注意您的操作，恢复请联系客服</div>
      </div>
      <div class="post-item">
        <div class="content">
          <div class="info-avatar">
            <div class="avatar">
              <img src alt />
            </div>
            <div class="info">
              <div class="title">
                <span class="name">职位名称</span>
                <span class="wages">月薪5-6K 13薪</span>
                <span class="preview">预览职位</span>
              </div>
              <div class="subtitle">城市|工龄|学历</div>
              <div class="detail">公司名称|规模|融资、资质</div>
            </div>
          </div>
          <div class="info2">
            <div class="box">
              <p class="num">120</p>
              <p class="txt">新投递</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">正沟通</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">已上传</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">以后选</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">已转送</p>
            </div>
          </div>
          <div class="btns-group">
            <p class="txt">全部人选(10)</p>
            <div class="upload-resume">上传简历</div>
          </div>
        </div>
        <div class="time">
          <div class="times">
            <span class="time-item">创建时间：2017.11.18</span>
            <span class="time-item">发布时间：2017.11.18</span>
            <span class="time-item">暂停时间：2017.11.18</span>
          </div>
          <div class="btns">
            <span class="btn">刷新职位</span>
            <span class="btn">编辑职位</span>
            <span class="btn">暂停职位</span>
            <span class="btn delete">删除职位</span>
          </div>
        </div>
        <div class="disabed-tips">该职位已经被管理员下架，请注意您的操作，恢复请联系客服</div>
      </div>
      <div class="post-item disabled">
        <div class="content">
          <div class="info-avatar">
            <div class="avatar">
              <img src alt />
            </div>
            <div class="info">
              <div class="title">
                <span class="name">职位名称</span>
                <span class="wages">月薪5-6K 13薪</span>
                <span class="preview">预览职位</span>
              </div>
              <div class="subtitle">城市|工龄|学历</div>
              <div class="detail">公司名称|规模|融资、资质</div>
            </div>
          </div>
          <div class="info2">
            <div class="box">
              <p class="num">120</p>
              <p class="txt">新投递</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">正沟通</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">已上传</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">以后选</p>
            </div>
            <div class="box">
              <p class="num">120</p>
              <p class="txt">已转送</p>
            </div>
          </div>
          <div class="btns-group">
            <p class="txt">全部人选(10)</p>
            <div class="upload-resume">上传简历</div>
          </div>
        </div>
        <div class="time">
          <div class="times">
            <span class="time-item">创建时间：2017.11.18</span>
            <span class="time-item">发布时间：2017.11.18</span>
            <span class="time-item">暂停时间：2017.11.18</span>
          </div>
          <div class="btns">
            <span class="btn-custom">刷新职位</span>
            <span class="btn-custom">编辑职位</span>
            <span class="btn-custom">暂停职位</span>
            <span class="btn-custom delete">删除职位</span>
          </div>
        </div>
        <div class="disabed-tips">该职位已经被管理员下架，请注意您的操作，恢复请联系客服</div>
      </div>
    </div>
    <el-pagination v-show="postList.length" layout="prev, pager, next" :total="100"></el-pagination>
    <div v-if="!postList.length" class="post-list-nothing">
      <img src="../assets/img/nothing_icon@2x.png" alt />
    </div>

    <!-- 创建职位 -->
    <el-dialog :visible.sync="model" :model-append-to-body="false" width="1240px">
      <el-form :model="position" :rules="positionRules" class="create-position">
        <div class="title-wrap">
          <h2>基本信息</h2>
          <p class="subtitle">加*内容，在确认发布成功后，将无法修改</p>
        </div>
        <div class="rows">
          <div class="left">
            <el-form-item prop="name" label="职位名称">
              <el-input v-model="position.name"></el-input>
            </el-form-item>
            <p class="input-tips">汉子、英文，最多8个字</p>
            <el-form-item label="职位类型">
              <el-select v-model="position.type">
                <el-option label="IT" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作城市">
              <el-select v-model="position.address">
                <el-option label="IT" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-select v-model="position.company">
                <el-option label="IT" value="1"></el-option>
              </el-select>
            </el-form-item>
            <p class="input-tips">汉子、英文，最多8个字</p>
          </div>
          <div class="right">
            <el-upload action="#">
              <div class="img-wrap">
                <img src="../assets/img/upload_bg.png" alt />
              </div>
            </el-upload>
            <div class="btns-group-upload">
              <span class="upload">上传</span>
              <span class="preview">预览</span>
            </div>
          </div>
        </div>
        <div class="title-wrap">
          <h2>职位协作</h2>
        </div>
        <div class="rows rows2">
          <div class="left">
            <el-radio v-model="position.draw" label="开放领取"></el-radio>
            <p class="radio-tips">公司内部猎头级兼职猎头可领取此职位</p>
          </div>
          <div class="right">
            <el-radio v-model="position.draw" label="关闭领取"></el-radio>
          </div>
        </div>
        <div class="title-wrap">
          <h2>职位要求</h2>
          <p class="subtitle">尽量详细填写</p>
        </div>
        <div class="rows rows3">
          <div class="left">
            <el-form-item label="经    验">
              <el-select v-model="position.experience">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
              <p class="tips">未选择显示-经验不限</p>
            </el-form-item>
            <el-form-item label="学    历">
              <el-select v-model="position.education">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
              <p class="tips">未选择显示-学历不限</p>
            </el-form-item>
            <el-form-item class="double" label="年    龄">
              <el-select v-model="position.education">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
              <span class="zhi">-</span>
              <el-select v-model="position.education">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
              <p class="tips">未选择显示-年龄不限</p>
            </el-form-item>
            <el-form-item class="double" label="月    薪">
              <el-select v-model="position.education">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
              <span class="zhi">-</span>
              <el-select v-model="position.education">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖    金">
              <el-select v-model="position.education">
                <el-option label="3-5年" value="1"></el-option>
              </el-select>
              <p class="tips">未选择-不显示奖金</p>
            </el-form-item>
            <el-form-item label="接收邮箱">
              <p class="email">936613142@qq.com</p>
              <p class="tips">请在账户信息中修改</p>
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="职位描述">
              <el-input type="textarea" maxlength="3000" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="职位点评">
              <el-input type="textarea" maxlength="3000" show-word-limit></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="btns-group-form">
          <span class="preview-post">预览职位</span>
          <span class="save-post">保存职位</span>
        </div>
      </div>
    </el-dialog>
    <!-- 职位详情 -->
    <el-dialog :visible.sync="detail" :model-append-to-body="false" width="1240px">
      <div class="detail-box">
        <div class="head">
          <p></p>
          <div>
            <img src="../assets/img/xcx.png" alt />
            <div>
              <div>
                <span>职位名称</span>
                <span>13K</span>
                <img src="../assets/img/zhuangtai.png" alt />
                <span>猎头名称</span>
                <img src="../assets/img/zhiwei.png" alt />
                <span>猎头名称</span>
                <span class="status publish">发布中</span>
                <span class="status pause">暂停中</span>
                <span class="status delete">已删除</span>
              </div>
              <div>北京 | 3-5年 | 本科</div>
              <div>公司名称 | 公司名称 | 公司名称</div>
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
                <el-form label-position="top">
                  <el-form-item label="薪资结构">
                    <el-select v-model="detailFormData.wagesStart">
                      <el-option label="5K" value="1"></el-option>
                    </el-select>
                    <span class="to">至</span>
                    <el-select v-model="detailFormData.wagesEnd">
                      <el-option label="5K" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="职位详情">
                    <el-input type="textarea" v-model="detailFormData.detail"></el-input>
                  </el-form-item>
                  <el-form-item label="职位点评">
                    <el-input type="textarea" v-model="detailFormData.evaluate"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-show="editorOrSee === 'see'" class="see-post">
                <div class="box">
                  <div class="title">薪资结构</div>
                  <p class="txt">月薪5-8k</p>
                </div>
                <div class="box">
                  <div class="title">职位详情</div>
                  <p
                    class="txt"
                  >负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、</p>
                </div>
                <div class="box">
                  <div class="title">职位点评</div>
                  <p
                    class="txt"
                  >负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、负责公司官方微博、</p>
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
                      <img src alt />
                    </div>
                    <div class="info-wrap">
                      <p class="name">公司名称</p>
                      <p class="info">规模|融资|资质</p>
                      <p class="url">www.baidu.com</p>
                    </div>
                  </div>
                  <p
                    class="intro"
                  >我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司我们是一家大公司</p>
                </div>
              </div>
              <div class="recruit-list">
                <p class="title">招聘职位</p>
                <ul class="list">
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-show="detailTag === 'info'" class="info">
              <div class="info-top">
                <div class="avatar">
                  <img src alt />
                </div>
                <div class="intro">
                  <p class="name">昵称</p>
                  <p class="txt">年龄</p>
                  <p class="txt">职业年数</p>
                  <p class="txt">行业</p>
                  <p class="txt">
                    <span class="icon"></span>
                  </p>
                </div>
              </div>
              <div class="recruit-list">
                <p class="title">招聘职位</p>
                <ul class="list">
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
                    </div>
                  </li>
                  <li class="recruit-item">
                    <div class="info">
                      <p class="name">
                        公司名称
                        <span class="wages">5k</span>
                      </p>
                      <p class="intro">规模|融资|资质</p>
                      <p class="intro">公司名称| 规模、资质</p>
                    </div>
                    <div class="avatar">
                      <img src alt />
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
</template>

<script>
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
      position: {
        name: '',
        type: '',
        address: '',
        company: '',
        photo: '',
        draw: '',
        education: '',
        experience: ''
      },
      postList: [],
      positionRules: {
        name: [{ required: true, message: 'dddd', trigger: 'blur' }],
        education: [{ required: true, message: 'dddd', trigger: 'change' }]
      },
      detailTag: 'post',
      editorOrSee: 'see',
      detailFormData: {
        wagesStart: '',
        wagesEnd: '',
        detail: '',
        evaluate: ''
      }
    }
  },
  methods: {
    onCreatePost() {
      this.model = true
    },
    onSwitchTag(val) {
      this.detailTag = val
    },
    onEditorSee(val) {
      this.editorOrSee = val
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
        background: #e2e3e7;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
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
          background: #f0f0f0;
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
        .left {
          padding-top: 0;
          padding-left: 46px;
          display: flex;
          text-align: left;
        }
        .right {
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
              .el-input__inner {
                width: 100px;
              }
              .zhi {
                display: inline-block;
                width: 10px;
                height: 1px;
                margin-left: 10px;
                margin-right: 10px;
                background-color: #d6d7de;
                font-size: 0;
                vertical-align: middle;
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
    height: 213px;
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
    height: 115px;
    width: 100%;
  }

  .detail-box > .head > div:nth-child(2) > img:first-child {
    float: left;
    height: 115px;
    width: 115px;
    border-radius: 50%;
    margin-right: 22px;
  }

  .detail-box > .head > div:nth-child(2) > div:nth-child(2) {
    width: 750px;
    height: 115px;
    float: left;
  }
  .detail-box > .head > div:nth-child(2) > div:nth-child(2) > div:first-child {
    overflow: hidden;
  }
  .detail-box
    > .head
    > div:nth-child(2)
    > div:nth-child(2)
    > div:first-child
    > span {
    color: #fff;
    float: left;
    margin-right: 20px;
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
    width: 300px;
    height: 115px;
    float: right;
  }
  .detail-box > .head > div:nth-child(2) > div:nth-child(3) > div:first-child {
    position: relative;
    height: 46px;
    width: 100%;
    margin-top: 93px;
    margin-left: 138px;
    cursor: pointer;
  }
  .detail-box
    > .head
    > div:nth-child(2)
    > div:nth-child(3)
    > div:first-child
    > img:first-child {
    height: 16px;
    width: 16px;
    float: left;
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
    float: left;
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
        bottom: 48px;
        right: 145px;
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
              .el-input__inner {
                width: 132px;
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