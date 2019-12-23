<template>
  <div class="my-account">
    <div class="detail">
      <ul class="navs">
        <li :class="{'active': tag === 'info'}" @click="onTagChange('info')">个人信息</li>
        <li :class="{'active': tag === 'tel'}" @click="onTagChange('tel')">联系方式</li>
      </ul>
      <div class="form-list">
        <el-form :model="infoData" :rules="infoRules" v-show="tag === 'info'" class="info-form">
          <div class="form">
            <div class="left">
              <el-form-item prop="nickname" label="姓名">
                <el-input v-model="infoData.nickname"></el-input>
                <span class="authentication">{{certificationStatus | filterCerStatus}}</span>
              </el-form-item>
              <el-form-item prop="sex" label="性别" class="gender">
                <el-radio-group v-model="infoData.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="title">
                常用语:
                <span class="note">最多3条</span>
              </div>
              <div class="words-list">
                <div v-for="word in words" :key="word.id" class="words-item">
                  <div class="static" v-show="!word.isEdit">
                    <span class="point"></span>
                    <div class="el-textarea">{{word.content}}</div>
                    <span class="btns-group">
                      <span class="edit" @click="onEditorWord(word)">编辑</span>
                      <span class="delete" @click="onDeleteWord(word)">删除</span>
                    </span>
                  </div>
                  <div v-show="word.isEdit" class="ediotr-static">
                    <span class="point"></span>
                    <el-input type="textarea" v-model="word.content"></el-input>
                    <span class="btns-group">
                      <!-- 编辑-保存 -->
                      <span class="save" v-if="!word.create" @click="onSaveEditorWord(word)">保存</span>
                      <!-- 新建-保存 -->
                      <span class="save" v-if="word.create" @click="onSaveWord(word)">保存</span>
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="create-btn"
                :class="{'disabled': isDisabledCreateWord}"
                @click="onCreateWords"
              >创建常用语</div>
            </div>
            <div class="right">
              <el-upload :show-file-list="false" action="#" :before-upload="onBeforeUploadAvatar">
                <div class="img-wrap">
                  <img :src="avatarUrl" alt />
                </div>
                <p class="subtitle">200k以内，正方形个人照片</p>
              </el-upload>
            </div>
          </div>
          <div class="action">
            <span class="save-btn" @click="onSaveUserInfo">保存修改</span>
          </div>
        </el-form>
        <el-form
          :model="telData"
          :rules="telRules"
          v-show="tag === 'tel'"
          class="tel-form"
          label-width="148px"
          ref="telWrap"
        >
          <el-form-item label="当前绑定手机号">
            <div class="tel">{{curMobile}}</div>
          </el-form-item>
          <el-form-item prop="mobil" label="更改绑定手机号">
            <el-input v-model="telData.mobil"></el-input>
          </el-form-item>
          <el-form-item label="图片验证码">
            <div class="verify-wrap" id="verifyWrap"></div>
          </el-form-item>
          <el-form-item prop="code" label="短信验证码">
            <el-input v-model="telData.code">
              <span slot="append" class="get-vcode" @click="sendMsg">获取验证码</span>
            </el-input>
          </el-form-item>
          <div class="split-line"></div>
          <el-form-item label="当前绑定微信号">
            <div class="wrap">
              <img src class="avatar" alt />
              <div class="name">{{telData.wx_user}}</div>
              <span class="untying">解绑</span>
            </div>
          </el-form-item>
          <el-form-item label="请扫描二维码绑定">
            <div class="vcode">
              <img src alt />
            </div>
          </el-form-item>
          <el-form-item label="职聊发送微信号">
            <el-input v-model="telData.wx_user"></el-input>
          </el-form-item>
          <div class="split-line"></div>
          <el-form-item label="邮箱">
            <el-input v-model="telData.email"></el-input>
          </el-form-item>
          <div class="action">
            <span class="save-btn" @click="onSaveUserTel">保存修改</span>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 未实名认证提示 -->
    <el-dialog
      title="操作提示"
      width="360px"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
    >
      <div class="tips-wrap">
        <h2>尚未实名认证</h2>
        <p class="txt">根据工信部及公安相关法规、发布、传递信息需要实名认证，请您谅解</p>
      </div>
      <div slot="footer" class="footer-btns">
        <span class="cancel-btn" @click="dialogVisible = false">取消</span>
        <span class="save-btn" @click="onShowCertifiction">开始认证</span>
      </div>
    </el-dialog>
    <!-- 实名认证 -->
    <el-dialog
      title
      width="460px"
      :modal-append-to-body="false"
      class="cettification-wrap"
      :visible.sync="certificationVisible"
    >
      <Certificate @onhide="onHideCerModel"></Certificate>
    </el-dialog>
  </div>
</template>

<script>
import Certificate from '@/components/Certificate'
import '../assets/js/verify.js'
import { mapGetters } from 'vuex'
import {
  modifyAccountInfo,
  modifyAccountTel,
  certificationUser,
  getAccountInfo,
  getCertStatus,
  addWord,
  editorWord,
  deleteWord,
  sendTelVcode
} from '@/api/api'
const WORDS_LEN = 3 //创建常用语条数
const AVATAR_SIZE = 1000 * 200 // 头像大小200k
const MESSAGE_TEMPETE = 'SMS_166995245'
export default {
  name: 'MyAccount',
  data() {
    return {
      tag: 'info',
      curMobile: '',
      avatarUrl: '',
      words: [
        // {
        //   isEdit: false,
        //   word: '',
        //   id: new Data().getTime()
        // }
      ],
      dialogVisible: false,
      infoData: {
        member_id: '',
        token: '',
        nickname: '',
        sex: '',
        q_pic: '',
        uploadFileSign: ['q_pic']
      },
      infoRules: {
        nickname: [
          {
            required: false,
            message: ''
          }
        ],
        sex: [
          {
            required: false,
            message: ''
          }
        ],
        // words: [
        //   {
        //     required: false,
        //     message: ''
        //   }
        // ],
        q_pic: [
          {
            required: false,
            message: ''
          }
        ]
      },
      telData: {
        member_id: '',
        token: '',
        mobil: '',
        vcode: false,
        code: '',
        wx_user: '',
        email: ''
      },
      telRules: {
        mobil: [
          {
            required: true,
            message: ''
          }
        ],
        vcode: [
          {
            required: false,
            message: ''
          }
        ],
        code: [
          {
            required: true,
            message: ''
          }
        ],
        wx_user: [
          {
            required: false,
            message: ''
          }
        ],
        email: [
          {
            required: false,
            message: ''
          }
        ]
      },
      imgVcode: false,
      msgVcode: false,
      certificationVisible: false,
      certificationStatus: 0
    }
  },
  computed: {
    isDisabledCreateWord() {
      return this.words.length >= WORDS_LEN
    },
    ...mapGetters(['getToken', 'getMemberId', 'getUserType'])
  },
  created() {
    this.initAccountInfo()
    this.initCertiStatus()
  },
  mounted() {
    this.initImageVcode()
  },
  methods: {
    initAccountInfo() {
      getAccountInfo({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          const keys = Object.keys(this.infoData)
          for (let i = 0; i < keys.length; i++) {
            this.infoData[keys[i]] = res.data.user_list[keys[i]]
          }
          const keys2 = Object.keys(this.telData)
          for (let i = 0; i < keys2.length; i++) {
            this.telData[keys2[i]] = res.data.user_list[keys2[i]]
          }

          // 初始化当前绑定手机号
          this.curMobile = res.data.user_list.mobil
          this.avatarUrl = res.data.user_list.headimgurl // 用户头像
          this.words = res.data.cy_sentences.map(item => {
            item.isEdit = false
            return item
          }) // 常用语句列表
        }
      })
    },
    initImageVcode() {
      var that = this
      $('#verifyWrap').slideVerify({
        type: 1, //类型
        vOffset: 5, //误差量，根据需求自行调整
        barSize: {
          width: '350px',
          height: '48px'
        },
        ready: function() {},
        success: function() {
          that.imgVcode = true
        }
      })
    },
    initCertiStatus() {
      getCertStatus({
        member_id: this.getMemberId,
        token: this.getToken
      }).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.certificationStatus = res.data.status
          if (res.data.status !== 1) {
            this.dialogVisible = true
          }
        } else if (res.code === 40001) {
          // 没有数据也需要认证
          this.dialogVisible = true
        } else {
          // this.$message.error(res.message)
        }
      })
    },
    onTagChange(val) {
      this.tag = val
    },
    sendMsg: function() {
      if (this.imgVcode) {
        sendTelVcode({
          phone_number: this.telData.mobil,
          templateCode: MESSAGE_TEMPETE
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.msgVcode = true
          } else {
            this.msgVcode = false
            this.$message.error(res.message)
          }
        })
      }
    },
    onPreviewImg(file, key) {
      const fs = new FileReader()
      fs.readAsDataURL(file)
      fs.addEventListener('load', e => {
        this[`${key}`] = e.target.result
      })
    },
    onBeforeUploadAvatar(file, key) {
      if (file.size > AVATAR_SIZE) {
        this.$message.error('上传图片失败')
        return
      }
      this.onPreviewImg(file, 'avatarUrl')
      this.infoData.q_pic = file
      return false
    },
    onEditorWord(word) {
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].id === word.id) {
          this.words[i].isEdit = true
          return
        }
      }
    },
    onDeleteWord(word) {
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].id === word.id) {
          this.words.splice(i, 1)
          deleteWord({
            member_id: this.getMemberId,
            token: this.getToken,
            id: word.id
          }).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.message)
            }
          })
          return
        }
      }
    },
    onSaveEditorWord(word) {
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].id === word.id) {
          editorWord({
            member_id: this.getMemberId,
            token: this.getToken,
            id: word.id,
            content: word.content
          }).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.message)
            } else {
              this.words[i].isEdit = false
            }
          })
          return
        }
      }
    },
    onSaveWord(word) {
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].id === word.id) {
          if (!this.words[i].content) {
            this.$message.error('输入内容后保存')
            return
          }
          this.words[i].isEdit = false
          addWord({
            member_id: this.getMemberId,
            token: this.getToken,
            content: word.content
          }).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.message)
            } else {
              this.words[i].create = false
            }
          })
          return
        }
      }
    },
    onCreateWords() {
      if (this.words.length >= WORDS_LEN) {
        return
      }
      this.words.push({
        create: true,
        isEdit: true,
        content: '',
        id: `${new Date().getTime()}`
      })
    },
    onSaveUserInfo() {
      this.infoData.member_id = this.getMemberId
      this.infoData.token = this.getToken
      modifyAccountInfo(this.infoData).then(res => {
        console.log(res)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
      })
    },
    onSaveUserTel() {
      // 此处还有待查证
      this.telData.member_id = this.getMemberId
      this.telData.token = this.getToken
      const sendData = {}
      const keys = Object.keys(this.telData)
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'vcode') {
          continue
        }
        sendData[keys[i]] = this.telData[keys[i]]
      }
      this.$refs.telWrap.validate(valid => {
        if (valid) {
          modifyAccountTel(sendData).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    onShowCertifiction() {
      this.dialogVisible = false
      this.certificationVisible = true
    },
    onHideCerModel() {
      this.certificationVisible = false
    }
  },
  filters: {
    filterCerStatus(num) {
      const map = {
        0: '未审核',
        1: '审核通过',
        2: '不通过'
      }
      return map[num]
    }
  },
  watch: {},
  components: {
    Certificate
  }
}
</script>

<style lang="scss">
@import '../assets/css/verify.css';
.my-account {
  max-width: 1240px;
  height: auto;
  background: #fff;
  margin: 40px auto;
  textarea {
    resize: none;
  }
  .detail {
    min-height: 540px;
    & > .navs {
      padding-left: 0;
      display: flex;
      height: 50px;
      width: 100%;
      background: #49444b;
      overflow: hidden;
      & > li {
        width: 220px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        &.active {
          background: #fe7271;
        }
      }
    }
    .form-list {
      padding: 34px 70px 0;
      .form {
        display: flex;
      }
      .left {
        flex: 1;
        .el-form-item {
          display: flex;
          .el-form-item__label {
            font-size: 18px;
            color: #495060ff;
          }
        }
        .el-form-item__content {
          display: flex;
          align-items: center;
        }
        .el-input__inner {
          width: 380px;
          border-radius: 0;
        }
        .authentication {
          display: block;
          font-size: 16px;
          line-height: 40px;
          margin-left: 14px;
          color: #9fa3b0ff;
          white-space: nowrap;
        }
        .gender {
          .el-radio__input {
            display: none;
          }
          .el-radio {
            margin-right: 40px;
            &.is-checked {
              .el-radio__label {
                border-color: #ff7272ff;
                background-color: #ffebebff;
                color: #ff7272ff;
              }
            }
          }
          .el-radio__label {
            display: block;
            padding-left: 0;
            width: 170px;
            font-size: 18px;
            line-height: 40px;
            text-align: center;
            color: #9fa3b0ff;
            border: 1px solid #e3e7edff;
          }
        }
        & > .title {
          font-size: 18px;
          line-height: 78px;
          color: #495060ff;
          text-align: left;
          & > .note {
            font-size: 14px;
            line-height: 78px;
            color: #d8dadbff;
          }
        }
        .words-list {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: -4px;
            width: 30px;
            height: 4px;
            background: #dcdcdcff;
          }
          .words-item {
            padding-top: 34px;
            display: flex;
            align-items: flex-start;
            .static,
            .ediotr-static {
              display: flex;
              align-items: flex-start;
              .el-textarea__inner {
                padding: 10px;
              }
            }
            .point {
              margin-right: 14px;
              margin-top: 4px;
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 8px;
              background-color: #dcdcdcff;
            }
            .el-textarea {
              width: 684px;
              height: 48px;
              text-align: left;
            }
            .el-textarea__inner {
              padding: 0;
            }
            .btns-group {
              display: flex;
              font-size: 16px;
              line-height: 24px;
              color: #9fa3b0ff;
              & > span {
                display: block;
                margin-left: 22px;
                white-space: nowrap;
                cursor: pointer;
              }
              .save {
                color: #677ddaff;
              }
            }
          }
        }
        .create-btn {
          position: relative;
          text-align: left;
          padding-left: 22px;
          margin-top: 12px;
          font-size: 16px;
          line-height: 40px;
          color: #677ddaff;
          cursor: pointer;
          &::before {
            content: '';
            position: absolute;
            top: 16px;
            left: 0;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background-color: #dcdcdcff;
          }
          &.disabled {
            color: #d8dadbff;
            cursor: default;
          }
        }
      }
      .right {
        .el-upload {
          width: 176px;
        }
        .img-wrap {
          margin: 0 auto;
          width: 150px;
          height: 150px;
          background: url(../assets/img/upload_bg.png) no-repeat center center;
          background-size: 150px 150px;
          & > img {
            display: block;
            width: 150px;
            height: 150px;
          }
        }
        .subtitle {
          font-size: 16px;
          line-height: 36px;
          color: #9fa3b0ff;
          white-space: nowrap;
        }
        .el-upload__input {
          display: none;
        }
      }
      .action {
        padding-top: 20px;
        padding-bottom: 30px;
        display: flex;
        justify-content: flex-end;
        & > .save-btn {
          display: block;
          width: 200px;
          height: 40px;
          font-size: 18px;
          line-height: 40px;
          background-color: #ff7272ff;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }
      .tel-form {
        .el-form-item__content {
          width: 350px;
          text-align: left;
          .el-input__inner {
            border-radius: 0;
          }
          .tel {
            color: #9fa3b0ff;
          }
          .el-input-group__append {
            border-radius: 0;
            background: none;
            color: #ff7272ff;
            cursor: pointer;
          }
          .wrap {
            display: flex;
            & > .avatar {
              margin-right: 8px;
              margin-top: 6px;
              display: block;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #e6e8e8ff;
            }
            & > .name {
              flex: 1;
              font-size: 16px;
              line-height: 40px;
              color: #9fa3b0ff;
            }
            & > .untying {
              display: block;
              font-size: 16px;
              line-height: 40px;
              color: #414a60ff;
              cursor: pointer;
            }
          }
          .vcode {
            width: 110px;
            height: 110px;
            border: 1px solid #e3e7edff;
            background: #e6e8e8ff;
            & > img {
              display: block;
              width: 110px;
              height: 110px;
            }
          }
        }
      }
    }
  }
  .tips-wrap {
    margin: 0 auto;
    width: 252px;
    & > h2 {
      font-size: 18px;
      line-height: 24px;
      color: #333;
      text-align: center;
    }
    .txt {
      font-size: 14px;
      line-height: 20px;
      color: #333;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  .footer-btns {
    display: flex;
    justify-content: center;
    .cancel-btn {
      margin: 0 15px;
      width: 100px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: #ccc;
      cursor: pointer;
    }
    .save-btn {
      @extend .cancel-btn;
      background: #ff7272;
    }
  }
  .cettification-wrap {
    .el-dialog {
      border-radius: 10px;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    .head {
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 16px;
      padding-bottom: 16px;
      display: flex;
      text-align: left;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: #f06359;
      & > .icon {
        width: 58px;
        height: 63px;
        background: url(../assets/img/shimingrenzhengmoren@2x.png) no-repeat 0 -5px;
        background-size: 62px 63px;
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
    .el-radio-group {
      .el-radio {
        margin-right: 0;
        .el-radio__input {
          display: none;
        }
        .el-radio__label {
          display: block;
          padding: 0;
          width: 90px;
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
    .upload-img-wrap {
      .img-wrap {
        width: 176px;
        height: 104px;
        background: url(../assets/img/q_pic.png) no-repeat 0 0;
        background-size: 176px 104px;
        cursor: pointer;
        & > img {
          display: block;
          width: 176px;
          height: 104px;
        }
      }
      &.down {
        .img-wrap {
          background: url(../assets/img/h_pic.png) no-repeat 0 0;
          background-size: 176px 104px;
        }
      }
      &.up {
        margin-right: 30px;
      }
    }
    .el-upload__input {
      display: none;
    }
    .el-input__inner {
      border-radius: 0;
    }
    .body {
      background: #f2f2f2;
      padding: 48px 40px 24px;
      .half {
        width: 50%;
        .el-radio-group {
          margin-bottom: 20px;
        }
      }
      .idcard-wrap {
        padding-top: 36px;
        display: flex;
      }
    }
    .el-dialog__footer {
      display: none;
    }
    .action-wrap {
      padding-top: 58px;
      display: flex;
      justify-content: flex-end;
      .certication-btn {
        display: block;
        width: 140px;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        color: #fff;
        background: #f06359;
        cursor: pointer;
      }
    }
    .el-form-item__error {
      display: none;
    }
  }
  .verify-move-block {
    & > i {
      display: none;
    }
  }
  .el-form-item__error {
    display: none;
  }
}
</style>