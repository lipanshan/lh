<template>
  <div class="certificate">
    <el-form :model="certificationData" :rules="certificationRules" ref="certificationWrap">
      <div class="head">
        <div class="icon"></div>
        <div class="info">
          <p class="title">请完成实名认证</p>
          <p class="subtitle">根据工信部、公安部相关文件执行,信息发布需要实名认证</p>
        </div>
      </div>
      <div class="body">
        <div class="half">
          <el-form-item prop="truename">
            <el-input v-model="certificationData.truename" placeholder="*输入姓名"></el-input>
          </el-form-item>
          <el-radio-group v-model="certificationData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </div>
        <el-form-item prop="number">
          <el-input v-model="certificationData.number" maxlength="18" placeholder="*输入身份证号"></el-input>
        </el-form-item>
        <div class="idcard-wrap">
          <div class="upload-img-wrap up">
            <el-upload action="#" :show-file-list="false" :before-upload="onBeforeUploadIdcardUp">
              <div class="img-wrap">
                <img :src="idcardUp" alt />
              </div>
            </el-upload>
          </div>
          <div class="upload-img-wrap down">
            <el-upload action="#" :show-file-list="false" :before-upload="onBeforeUploadIdcardDown">
              <div class="img-wrap">
                <img :src="idcardDown" alt />
              </div>
            </el-upload>
          </div>
        </div>
        <div class="action-wrap">
          <span class="certication-btn" @click="onCertifiction">开始认证</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { certificationUser } from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'certificate',
  data() {
    return {
      idcardUp: '',
      idcardDown: '',
      certificationData: {
        member_id: '',
        truename: '',
        token: '',
        sex: '',
        q_pic: '',
        h_pic: '',
        uploadFileSign: ['q_pic', 'h_pic']
      },
      certificationRules: {
        truename: [
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
        number: [
          {
            required: true,
            message: ''
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getMemberId', 'getUserType'])
  },
  methods: {
    onPreviewImg(file, key) {
      const fs = new FileReader()
      fs.readAsDataURL(file)
      fs.addEventListener('load', e => {
        this[`${key}`] = e.target.result
      })
    },
    onCertifiction() {
      this.certificationData.member_id = this.getMemberId
      this.certificationData.token = this.getToken
      this.$refs.certificationWrap.validate(valid => {
        if (valid) {
          certificationUser(this.certificationData).then(res => {
            if (res.code === 200) {
              this.$message(res.message)
              this.$emit('onhide')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('请检查表单是否填写完成')
        }
      })
    },
    onBeforeUploadIdcardUp(file) {
      this.onPreviewImg(file, 'idcardUp')
      this.certificationData.q_pic = file
      return false
    },
    onBeforeUploadIdcardDown(file) {
      this.onPreviewImg(file, 'idcardDown')
      this.certificationData.h_pic = file
      return false
    }
  }
}
</script>

<style lang="scss">
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
</style>