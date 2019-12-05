<template>
  <div class="my-post">
    <div class="operation">
      <span class="create-resume">创建职位</span>
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
    <div class="post-list">
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
    <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
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
      order: ''
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
}
</style>