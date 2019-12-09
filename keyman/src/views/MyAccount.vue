<template>
  <div class="my-account">
    <div class="detail">
      <ul class="navs">
        <li :class="{'active': tag === 'info'}" @click="onTagChange('info')">个人信息</li>
        <li :class="{'active': tag === 'tel'}" @click="onTagChange('tel')">联系方式</li>
      </ul>
      <div class="form-list">
        <el-form v-show="tag === 'info'" class="info-form">
          <div class="form">
            <div class="left">
              <el-form-item label="姓名">
                <el-input v-model="infoData.name"></el-input>
                <span class="authentication">尚未实名认证</span>
              </el-form-item>
              <el-form-item label="性别" class="gender">
                <el-radio-group v-model="infoData.sex">
                  <el-radio label="男" value="1"></el-radio>
                  <el-radio label="女" value="2"></el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="title">
                常用语:
                <span class="note">最多3条</span>
              </div>
              <div class="words-list">
                <div class="words-item">
                  <span class="point"></span>
                  <el-input type="textarea"></el-input>
                  <span class="btns-group">
                    <span class="save">保存</span>
                  </span>
                </div>
                <div class="words-item">
                  <span class="point"></span>
                  <div class="el-textarea">sdfsadf</div>
                  <span class="btns-group">
                    <span class="edit">编辑</span>
                    <span class="delete">删除</span>
                  </span>
                </div>
              </div>
              <div class="create-btn">创建常用语</div>
            </div>
            <div class="right">
              <el-upload action="#">
                <div class="img-wrap">
                  <img src="../assets/img/upload_bg.png" alt />
                </div>
                <p class="subtitle">200k以内，正方形个人照片</p>
              </el-upload>
            </div>
          </div>
          <div class="action">
            <span class="save-btn">保存修改</span>
          </div>
        </el-form>
        <el-form v-show="tag === 'tel'" class="tel-form" label-width="148px">
          <el-form-item label="当前绑定手机号">
            <div class="tel">177****5120</div>
          </el-form-item>
          <el-form-item label="更改绑定手机号">
            <el-input v-model="telData.tel"></el-input>
          </el-form-item>
          <el-form-item label="图片验证码">
            <div class="verify-wrap" id="verify-wrap"></div>
          </el-form-item>
          <el-form-item label="短信验证码">
            <el-input>
              <span slot="append" class="get-vcode">获取验证码</span>
            </el-input>
          </el-form-item>
          <div class="split-line"></div>
          <el-form-item label="当前绑定微信号">
            <div class="wrap">
              <img src="" class="avatar" alt="">
              <div class="name">可爱的羞羞鬼</div>
              <span class="untying">解绑</span>
            </div>
          </el-form-item>
          <el-form-item label="请扫描二维码绑定">
            <div class="vcode">
              <img src alt />
            </div>
          </el-form-item>
          <el-form-item label="职聊发送微信号">
            <el-input v-model="telData.weixin"></el-input>
          </el-form-item>
          <div class="split-line"></div>
          <el-form-item label="邮箱">
            <el-input v-model="telData.email"></el-input>
          </el-form-item>
          <div class="action">
            <span class="save-btn">保存修改</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SlideVerify from '../assets/js/jq-slideVerify.js'
import { mapGetters } from 'vuex'
export default {
  name: 'MyAccount',
  data() {
    return {
      tag: 'info',
      infoData: {
        name: '',
        sex: 1,
        words: [],
        photo: ''
      },
      telData: {
        tel: '',
        vcode: false,
        phoneCode: '',
        weixin: '',
        email: ''
      },
      imgVcode: false
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getMemberId', 'getUserType'])
  },
  mounted () {
    this.tag === 'tel' && this.initImageVcode()
  },
  methods: {
    initImageVcode() {
      const slideVerify = new SlideVerify('#verify-wrap', {
        wrapWidth: '100%', //设置 容器的宽度 ，默认为 350 ，也可不用设，你自己css 定义好也可以，插件里面会取一次这个 容器的宽度
        initText: '按住滑块拖动到最右侧', //设置  初始的 显示文字
        sucessText: '验证通过', //设置 验证通过 显示的文字
        getSucessState: res => {
          this.imgVcode = res
          console.log(res)
        }
      })
    },
    onTagChange(val) {
      this.tag = val
      if (val === 'tel') {
        this.initImageVcode()
      }
    },
    sendMsg: function() {
      if (this.imgVcode) {
        $.ajax({
          url: url + 'api/apidate/send_phone_message',
          type: 'post',
          dataType: 'json',
          data: {
            phone_number: that.phone,
            templateCode: 'SMS_167370581',
            status: 1
          },
          success: function(res) {
            console.log(res)
          },
          error: function(err) {
            console.log(err)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #eff1f5ff;
}
.my-account {
  width: 1240px;
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
            align-items: top;
            & > .point {
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
            &>.avatar {
              margin-right: 8px;
              margin-top: 6px;
              display: block;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #E6E8E8FF;
            }
            &>.name {
              flex: 1;
              font-size: 16px;
              line-height: 40px;
              color:#9FA3B0FF;
            }
            &>.untying {
              display: block;
              font-size: 16px;
              line-height: 40px;
              color: #414A60FF;
              cursor: pointer;
            }

          }
          .vcode {
            width: 110px;
            height: 110px;
            border: 1px solid #E3E7EDFF;
            background: #E6E8E8FF;
            &>img {
              display: block;
              width: 110px;
              height: 110px;
            }
          }
        }
      }
    }
  }
}
</style>