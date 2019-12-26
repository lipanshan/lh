<template>
  <div class="company-info">
    <div class="company">
      <ul>
        <li @click="onTagSwitch('baseInfo')" :class="{'cur': tag === 'baseInfo'}">基本信息</li>
        <li @click="onTagSwitch('intro')" :class="{'cur': tag === 'intro'}">公司介绍</li>
        <li @click="onTagSwitch('welfare')" :class="{'cur': tag === 'welfare'}">公司福利</li>
        <li @click="onTagSwitch('album')" :class="{'cur': tag === 'album'}">公司相册</li>
      </ul>
      <div v-show="tag === 'baseInfo'" class="jb">
        <p>公司基本信息</p>
        <p>丰富的公司介绍，能获得更多求职者的青睐， 为你的职位带来更多查看与沟通</p>
        <div>
          <span>公司简称</span>
          <input type="text" v-model="company_name" />
          <span class="recertification" @click="onReCertification">重新认证</span>
        </div>
        <div>
          <span>公司logo</span>
          <input
            name="logo"
            type="file"
            id="file"
            class="filepath"
            accept="image/jpg, image/jpeg, image/png, image/PNG"
          />
          <img id="show" src="../assets/img/xcx.png" alt />
        </div>
        <div>
          <span>所在行业</span>
          <!-- <input type="text" v-model='company_trades' onfocus=this.blur()> -->
          <select id="tradesSelect" @click="get_trades">
            <option v-for="x in trades_list" :key="x.id" :data-id="x.id" :value="x.id">{{x.name}}</option>
          </select>
        </div>
        <div>
          <span>融资阶段</span>
          <select id="financeSelect" @click="get_finance">
            <option v-for="x in finance" :key="x" :data-id="x" :value="x">{{x|finance}}</option>
          </select>
        </div>
        <div>
          <span>人员规模</span>
          <select id="peopleSelect" @click="get_people">
            <option v-for="x in people" :key="x" :data-id="x" :value="x">{{x|people}}</option>
          </select>
        </div>
        <div>
          <span>公司官网</span>
          <input type="text" v-model="website" />
        </div>
        <div class="btn" @click="base_submit" style="cursor: pointer">保存修改</div>
      </div>
      <div v-show="tag === 'intro'" class="js">
        <p>公司介绍</p>
        <p>丰可以简单介绍一下公司发展状况、服务领域、主要产品等信息</p>
        <textarea name id cols="30" rows="10" v-model="company_production"></textarea>
        <div @click="product_submit">提交</div>
      </div>
      <div v-show="tag === 'welfare'" class="fl">
        <p>公司福利</p>
        <p>丰可以简单介绍一下公司发展状况、服务领域、主要产品等信息</p>
        <div>
          <span>福利名称</span>
          <input style="width: 128px;" type="text" v-model="fl_name" />
          <span style="font-size: 14px;color:#9FA3B0">6字之内</span>
        </div>
        <div>
          <span>福利说明</span>
          <input type="text" v-model="fl_info" />
          <span class="btn" @click="add_fl">确认添加</span>
        </div>
        <div v-if="flArr">
          <span v-for="(x, index) in flArr" :key="index" @click="remove_fl">{{x}} ×</span>
        </div>
        <div class="btn" @click="fl_submit">保存修改</div>
      </div>
      <div v-show="tag === 'album'" class="xc">
        <p>公司福利</p>
        <p>丰可以简单介绍一下公司发展状况、服务领域、主要产品等信息</p>
        <div class="pic-wrap">
          <div>
            <!-- ../assets/img/img_upLoad.png -->
            <img class="img1" :src="urlimg1" alt />
            <input type="file" id="img1" accept="image/jpg, image/jpeg, image/png, image/PNG" />
          </div>
          <div>
            <img class="img2" :src="urlimg2" alt />
            <input type="file" id="img2" accept="image/jpg, image/jpeg, image/png, image/PNG" />
          </div>
          <div>
            <img class="img3" :src="urlimg3" alt />
            <input type="file" id="img3" accept="image/jpg, image/jpeg, image/png, image/PNG" />
          </div>
          <div>
            <img class="img4" :src="urlimg4" alt />
            <input type="file" id="img4" accept="image/jpg, image/jpeg, image/png, image/PNG" />
          </div>
          <div>
            <img class="img5" :src="urlimg5" alt />
            <input type="file" id="img5" accept="image/jpg, image/jpeg, image/png, image/PNG" />
          </div>
          <div>
            <img class="img6" :src="urlimg6" alt />
            <input type="file" id="img6" accept="image/jpg, image/jpeg, image/png, image/PNG" />
          </div>
        </div>
        <span class="btn" @click="xc_submit">保存修改</span>
      </div>
    </div>
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
import axios from '../api/axios'
import { mapGetters } from 'vuex'
var url = process.env.VUE_APP_API_URL
export default {
  name: 'CompanyInfo',
  data() {
    return {
      tag: 'baseInfo',
      info: {},
      file: null,
      trades_list: {}, //行业
      company_name: null, //公司名称
      company_trades: null, //公司行业
      finance: [1, 2, 3, 4, 5, 6, 7, 8], //融资
      company_finance: null,
      website: null, //网站
      people: [1, 2, 3, 4, 5, 6], //人数
      company_people: null,
      hasImg: false,
      id: null,
      company_production: null,
      fl_name: '',
      fl_info: '',
      flArr: [],
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      img5: null,
      img6: null,
      urlimg1: '',
      urlimg2: '',
      urlimg3: '',
      urlimg4: '',
      urlimg5: '',
      urlimg6: '',
      baseLogo: '',
      certificationVisible: false
    }
  },
  computed: {
    ...mapGetters(['getMemberId', 'getToken'])
  },
  mounted: function() {
    var that = this
    $('.filepath').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('file').files[0]
      that.file = f

      reads.readAsDataURL(f)
      reads.onload = function(e) {
        document.getElementById('show').src = e.target.result
      }
      that.baseLogo = f
    })
    $('#img1').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('img1').files[0]
      reads.readAsDataURL(f)
      reads.onload = function(e) {
        that.urlimg1 = e.target.result
      }
      that.img1 = f
    })
    $('#img2').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('img2').files[0]
      reads.readAsDataURL(f)
      reads.onload = function(e) {
        that.urlimg2 = e.target.result
      }
      that.img2 = f
    })
    $('#img3').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('img3').files[0]
      reads.readAsDataURL(f)
      reads.onload = function(e) {
        that.urlimg3 = e.target.result
      }
      that.img3 = f
    })
    $('#img4').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('img4').files[0]
      reads.readAsDataURL(f)
      reads.onload = function(e) {
        that.urlimg4 = e.target.result
      }
      that.img4 = f
    })
    $('#img5').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('img5').files[0]
      reads.readAsDataURL(f)
      reads.onload = function(e) {
        that.urlimg5 = e.target.result
      }
      that.img5 = f
    })
    $('#img6').change(function() {
      var reads = new FileReader()
      var f = document.getElementById('img6').files[0]
      reads.readAsDataURL(f)
      reads.onload = function(e) {
        that.urlimg6 = e.target.result
      }
      that.img6 = f
    })
    axios
      .post(url + 'api/apidate/industry_list', {
        member_id: this.getMemberId,
        token: this.getToken
      })
      .then(res => {
        return Promise.resolve(JSON.parse(res))
      })
      .then(function(res) {
        if (res.code == 200) {
          that.trades_list = res.data
          that.get_data()
        }
      })
  },
  methods: {
    onTagSwitch(val) {
      this.tag = val
    },
    get_data: function() {
      var that = this
      axios
        .post(url + 'api/apidate/company_list', {
          member_id: this.getMemberId,
          token: this.getToken
        })
        .then(res => {
          return Promise.resolve(JSON.parse(res))
        })
        .then(function(res) {
          console.log(res)
          if (res.code == 200) {
            that.info = res.data
            that.id = res.data.id
            that.company_name = res.data.company_name
            $('#show').attr('src', res.data.logo)
            that.cur_trades = res.data.industry
            that.company_finance = res.data.comkind
            that.company_people = res.data.employee_num
            that.website = res.data.website
            that.company_production = res.data.profile
            that.flArr = res.data.temptation.split(',')
            that.baseLogo = res.data.logo
            if (res.data.imgurl1) {
              $('.img1').attr('src', 'res.data.imgurl1')
            } else if (res.data.imgurl2) {
              $('.img2').attr('src', 'res.data.imgurl2')
            } else if (res.data.imgurl3) {
              $('.img3').attr('src', 'res.data.imgurl3')
            } else if (res.data.imgurl4) {
              $('.img4').attr('src', 'res.data.imgurl4')
            } else if (res.data.imgurl5) {
              $('.img5').attr('src', 'res.data.imgurl5')
            } else if (res.data.imgurl6) {
              $('.img6').attr('src', 'res.data.imgurl6')
            }
            that.img1 = res.data.imgurl1
            that.img2 = res.data.imgurl2
            that.img3 = res.data.imgurl3
            that.img4 = res.data.imgurl4
            that.img5 = res.data.imgurl5
            that.img6 = res.data.imgurl6
            that.urlimg1 = res.data.imgurl1
            that.urlimg2 = res.data.imgurl2
            that.urlimg3 = res.data.imgurl3
            that.urlimg4 = res.data.imgurl4
            that.urlimg5 = res.data.imgurl5
            that.urlimg6 = res.data.imgurl6
          }
        })
    },
    base_submit: function(e) {
      var that = this
      // var formData = new FormData();
      // formData.append('status',1);
      // formData.append("member_id",47);
      // formData.append("token","8ed3a7ac4a8abaf8fc577f4154345b16");
      // formData.append("id",that.id);
      // formData.append("company_name",that.company_name);
      // formData.append("industry",that.company_trades);
      // formData.append("comkind",that.company_finance);
      // formData.append("employee_num",that.company_people);
      // formData.append("website",that.website);
      // formData.append('logo',that.file);
      // console.log(formData.get('logo'))

      axios
        .post(url + 'api/apidate/edit_company', {
          member_id: this.getMemberId,
          token: this.getToken,
          id: that.id,
          company_name: that.company_name,
          industry: that.company_trades,
          comkind: that.company_finance,
          employee_num: that.company_people,
          website: that.website,
          logo: that.baseLogo,
          uploadFileSign: ['logo'] // 记录不进行加密的字段
        })
        .then(res => {
          return Promise.resolve(JSON.parse(res))
        })
        .then(function(res) {
          // console.log(res)
          if (res.code == 200) {
            that.$message(res.message)
            that.get_data()
            that.tag = 'intro'
            // $('.js')
            //   .show()
            //   .siblings('div')
            //   .hide()
            // $('.company>ul>li:nth-child(2)')
            //   .addClass('cur')
            //   .siblings('li')
            //   .removeClass('cur')
          } else {
            that.$message.error(res.message)
          }
        })
      // $.ajax({
      //   url: url + 'api/apidate/edit_company',
      //   dataType: 'json',
      //   type: 'post',
      //   data: {
      //     status: 1,
      //     member_id: 47,
      //     token: '8ed3a7ac4a8abaf8fc577f4154345b16',
      //     id: that.id,
      //     company_name: that.company_name,
      //     industry: that.company_trades,
      //     comkind: that.company_finance,
      //     employee_num: that.company_people,
      //     website: that.website,
      //     logo: that.file
      //   },
      //   success: function(res) {
      //     // console.log(res)
      //     if (res.code == 200) {
      //       alert('修改成功')
      //       that.get_data()
      //       $('.js')
      //         .show()
      //         .siblings('div')
      //         .hide()
      //       $('.company>ul>li:nth-child(2)')
      //         .addClass('cur')
      //         .siblings('li')
      //         .removeClass('cur')
      //     }
      //   }
      // })
    },
    product_submit: function(e) {
      var that = this
      axios
        .post(url + 'api/apidate/edit_company_profile', {
          member_id: this.getMemberId,
          token: this.getToken,
          id: that.id,
          profile: that.company_production
        })
        .then(res => {
          return Promise.resolve(JSON.parse(res))
        })
        .then(function(res) {
          console.log(res)
          if (res.code == 200) {
            that.$message(res.message)
            that.get_data()
            that.tag = 'welfare'
            // $('.fl')
            //   .show()
            //   .siblings('div')
            //   .hide()
            // $('.company>ul>li:nth-child(3)')
            //   .addClass('cur')
            //   .siblings('li')
            //   .removeClass('cur')
          } else {
            that.$message.error(res.message)
          }
        })
      // $.ajax({
      //   url: url + 'api/apidate/edit_company_profile',
      //   dataType: 'json',
      //   type: 'post',
      //   data: {
      //     status: 1,
      //     member_id: 47,
      //     token: '8ed3a7ac4a8abaf8fc577f4154345b16',
      //     id: that.id,
      //     profile: that.company_production
      //   },
      //   success: function(res) {
      //     // console.log(res)
      //     if (res.code == 200) {
      //       alert('修改成功')
      //       that.get_data()
      //       $('.fl')
      //         .show()
      //         .siblings('div')
      //         .hide()
      //       $('.company>ul>li:nth-child(3)')
      //         .addClass('cur')
      //         .siblings('li')
      //         .removeClass('cur')
      //     }
      //   }
      // })
    },
    add_fl: function(e) {
      if (this.fl_name) {
        this.flArr.push(this.fl_name)
        this.fl_name = ''
      } else {
        // alert('请填写福利名称')
        this.$message.error('请填写福利名称')
      }
    },
    remove_fl: function(e) {
      this.flArr.splice($(e.target).index(), 1)
    },
    fl_submit: function(e) {
      var that = this
      axios
        .post(url + 'api/apidate/edit_company_temptation', {
          member_id: this.getMemberId,
          token: this.getToken,
          id: that.id,
          temptation: that.flArr.toString()
        })
        .then(res => {
          return Promise.resolve(JSON.parse(res))
        })
        .then(function(res) {
          // console.log(res)
          if (res.code == 200) {
            // alert('修改成功')
            that.$message(res.message)
            that.get_data()
            that.tag = 'album'
            // $('.xc')
            //   .show()
            //   .siblings('div')
            //   .hide()
            // $('.company>ul>li:nth-child(4)')
            //   .addClass('cur')
            //   .siblings('li')
            //   .removeClass('cur')
          }
        })
      // $.ajax({
      //   url: url + 'api/apidate/edit_company_temptation',
      //   dataType: 'json',
      //   type: 'post',
      //   data: {
      //     status: 1,
      //     member_id: 47,
      //     token: '8ed3a7ac4a8abaf8fc577f4154345b16',
      //     id: that.id,
      //     temptation: that.flArr.toString()
      //   },
      //   success: function(res) {
      //     // console.log(res)
      //     if (res.code == 200) {
      //       alert('修改成功')
      //       that.get_data()
      //       $('.xc')
      //         .show()
      //         .siblings('div')
      //         .hide()
      //       $('.company>ul>li:nth-child(4)')
      //         .addClass('cur')
      //         .siblings('li')
      //         .removeClass('cur')
      //     }
      //   }
      // })
    },
    xc_submit: function(e) {
      var that = this
      axios
        .post(url + 'api/apidate/edit_company_imgur', {
          member_id: this.getMemberId,
          token: this.getToken,
          id: that.id,
          imgurl1: that.img1,
          imgurl2: that.img2,
          imgurl3: that.img3,
          imgurl4: that.img4,
          imgurl5: that.img5,
          imgurl6: that.img6,
          uploadFileSign: [
            'imgurl1',
            'imgurl2',
            'imgurl3',
            'imgurl4',
            'imgurl5',
            'imgurl6'
          ]
        })
        .then(res => {
          return Promise.resolve(JSON.parse(res))
        })
        .then(function(res) {
          console.log(res)
          if (res.code == 200) {
            // alert('保存成功')
            that.$message(res.message)
            that.get_data()
            that.tag = 'baseInfo'
          }
        })
    },
    get_trades: function(e) {
      this.company_trades = $('#tradesSelect')
        .find('option:selected')
        .val()
    },
    get_finance: function(e) {
      this.company_finance = $('#financeSelect')
        .find('option:selected')
        .val()
    },
    get_people: function() {
      this.company_people = $('#peopleSelect')
        .find('option:selected')
        .val()
    },
    onReCertification() {
      this.certificationVisible = true
    },
    onHideCerModel() {
      this.certificationVisible = true
    }
  },
  filters: {
    education: function(e) {
      switch (e) {
        case 0:
          return '不限'
        case 1:
          return '初中'
        case 2:
          return '中专、技校'
        case 3:
          return '高中'
        case 4:
          return '大专'
        case 5:
          return '本科'
        case 6:
          return '研究生'
        case 7:
          return '博士'
      }
    },
    year: function(e) {
      switch (e) {
        case 0:
          return '不限'
        case 1:
          return '在校生'
        case 2:
          return '应届生'
        case 3:
          return '一年以下'
        case 4:
          return '1-3年'
        case 5:
          return '3-5年'
        case 6:
          return '5-10年'
        case 7:
          return '10年以上'
      }
    },
    finance: function(e) {
      switch (e) {
        case 1:
          return '未融资'
        case 2:
          return '天使轮'
        case 3:
          return 'A轮'
        case 4:
          return 'B轮'
        case 5:
          return 'C轮'
        case 6:
          return 'D轮以上'
        case 7:
          return '上市公司'
        case 8:
          return '不需要融资'
      }
    },
    people: function(e) {
      switch (e) {
        case 1:
          return '0-20人'
        case 2:
          return '20-99人'
        case 3:
          return '100-499人'
        case 4:
          return '500-999人'
        case 5:
          return '1000-9999人'
        case 6:
          return '10000以上'
      }
    }
  },
  components: {
    Certificate
  }
}
</script>

<style lang="scss">
.company-info {
  .company {
    max-width: 1240px;
    height: auto;
    background: #fff;
    margin: 40px auto;
  }

  .company > ul {
    height: 50px;
    width: 100%;
    background: #49444b;
    overflow: hidden;
  }

  .company > ul li {
    width: 220px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    float: left;
    color: #fff;
    cursor: pointer;
  }

  .company > ul li.cur {
    background: #fe7271;
  }

  .company > .jb {
    padding: 30px 70px;
  }

  .company > .jb > p:first-child {
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 9px;
    color: #24272e;
  }

  .company > .jb > p:nth-child(2) {
    font-size: 12px;
    line-height: 14px;
    color: #9fa3b0;
    margin-bottom: 18px;
  }

  .company > .jb > div {
    height: 40px;
    width: 100%;
    margin-bottom: 14px;
  }

  .company > .jb > div > span {
    float: left;
    line-height: 40px;
    font-size: 16px;
  }

  .company > .jb > div:nth-child(4) {
    height: 84px;
    position: relative;
  }

  .company > .jb > div:nth-child(4) > img {
    float: left;
    height: 84px;
    width: 84px;
    margin-left: 16px;
  }

  .company > .jb > div:nth-child(4) > input {
    position: absolute;
    top: 0;
    left: 67px;
    height: 84px;
    width: 84px;
    opacity: 0;
  }

  .company > .jb > div > span:nth-child(3) {
    padding-left: 32px;
    font-size: 14px;
    color: #fe7271;
    text-decoration: underline;
  }

  .company > .jb > div > span:nth-child(3):hover {
    cursor: pointer;
  }

  .company > .jb > div > input,
  .company > .jb > div > select {
    border: 1px solid #e3e7ed;
    float: left;
    height: 40px;
    width: 570px;
    margin-left: 16px;
    cursor: pointer;
  }

  .company > .jb > .btn {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    width: 197px;
    color: #fff;
    background: #fe7271;
    margin-left: 80px;
  }

  .company > .js {
    height: 358px;
    width: 100%;
    padding: 30px 70px;
  }

  .company > .js p:first-child,
  .company > .xc p:first-child,
  .company > .fl p:first-child {
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 9px;
    color: #24272e;
  }

  .company > .js p:nth-child(2),
  .company > .xc p:nth-child(2),
  .company > .fl p:nth-child(2) {
    font-size: 12px;
    line-height: 14px;
    color: #9fa3b0;
    margin-bottom: 18px;
  }

  .company > .js textarea {
    height: 170px;
    width: 100%;
    resize: none;
    outline: none;
    border: 1px solid #e3e7ed;
    margin-bottom: 20px;
  }

  .company > .js div {
    float: right;
    width: 100px;
    height: 40px;
    text-align: center;
    background: #fe7271;
    color: #fff;
    line-height: 40px;
    cursor: pointer;
  }

  .company > .fl {
    height: 462px;
    width: 100%;
    padding: 30px 70px;
  }

  .company > .fl > div {
    height: 40px;
    width: 100%;
    margin-bottom: 14px;
  }

  .company > .fl > div span {
    line-height: 40px;
    font-size: 16px;
    margin-right: 16px;
    float: left;
  }

  .company > .fl > div input {
    height: 40px;
    border: 1px solid #e3e7ed;
    width: 400px;
    float: left;
    margin-right: 11px;
  }

  .company > .fl > div .btn {
    cursor: pointer;
    font-size: 14px;
    height: 30px;
    width: 100px;
    text-align: center;
    line-height: 30px;
    margin-top: 5px;
    background: #fe7271;
    color: #fff;
    float: left;
  }

  .company > .fl > div:nth-child(5) {
    height: 170px;
    width: 100%;
    padding: 18px 20px;
    border: 1px solid #e3e7ed;
  }

  .company > .fl > div:nth-child(5) span {
    padding: 0 20px;
    line-height: 30px;
    height: 30px;
    background: #fe7271;
    width: auto;
    color: #fff;
    border-radius: 15px;
    cursor: pointer;
  }

  .company > .fl > .btn {
    float: right;
    width: 100px;
    height: 40px;
    text-align: center;
    background: #fe7271;
    color: #fff;
    line-height: 40px;
    cursor: pointer;
  }

  .company > .xc {
    height: 522px;
    width: 100%;
    padding: 30px 27px;
    position: relative;
  }

  .company > .xc > div > div {
    width: 270px;
    height: 167px;
    float: left;
    margin-right: 34px;
    margin-bottom: 30px;
    position: relative;
  }

  .company > .xc > div img,
  .company > .xc > div input {
    height: 100%;
    width: 100%;
  }

  .company > .xc > div input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  .company > .xc img:nth-child(4),
  .company > .xc img:nth-child(8) {
    margin-right: 0;
  }

  .company > .xc .btn {
    width: 100px;
    height: 40px;
    text-align: center;
    background: #fe7271;
    color: #fff;
    line-height: 40px;
    cursor: pointer;
    position: absolute;
    right: 70px;
    bottom: 33px;
  }
  .recertification,
  .company > ul > li {
    cursor: pointer;
  }
  .company {
    .btn {
      padding: 0 !important;
    }
    .pic-wrap {
      & > div {
        background: url(../assets/img/img_upLoad.png) no-repeat 0 0;
      }
    }
  }
}
</style>