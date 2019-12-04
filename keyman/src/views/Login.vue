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
      <!-- <div>
                    <div>
                        <img src="../../img/check.png" alt="">
                    </div>
                    按住滑块拖动到最右侧
      </div>-->
      <div class="verify-wrap" id="verify-wrap"></div>
      <div>
        <img src="../assets/img/safe.png" alt />
        <input type="text" />
        <div>获取验证码</div>
      </div>
      <div>登录/注册</div>
      <p>
        <input type="checkbox" />
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
  </div>
</template>

<script>
import SlideVerify from '../assets/js/jq-slideVerify.js'
const url = 'http://www.wzgwebsite.top/'
export default {
  name: 'Login',
  data() {
    return {
      phone: null,
      code: null
    }
  },
  mounted: function() {
    var that = this
    // var SlideVerifyPlug = window.slideVerifyPlug
    var slideVerify = new SlideVerify('#verify-wrap', {
      wrapWidth: '100%', //设置 容器的宽度 ，默认为 350 ，也可不用设，你自己css 定义好也可以，插件里面会取一次这个 容器的宽度
      initText: '按住滑块拖动到最右侧', //设置  初始的 显示文字
      sucessText: '验证通过' //设置 验证通过 显示的文字
      // getSucessState: function (res) {
      //     //当验证完成的时候 会 返回 res 值 true，只留了这个应该够用了
      // }
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
    sendMsg: function() {
      if (res) {
        $.ajax({
          url: url + 'api/apidate/send_phone_message',
          // async: false,
          type: 'post',
          dataType: 'json',
          // jsonp: 'jsonpCallback',
          // scriptCharset: 'utf-8',
          // contentType: "application/json",
          // jsonpCallback: "jsonpCallback",
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

<style lang="scss" scoped>
@import '../assets/css/login.css';
</style>