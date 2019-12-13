<template>
  <div class="my-resume">
    <div class="main-box">
      <div>
        <ul>
          <li>全职简历</li>
          <li>兼职简历</li>
        </ul>
      </div>
      <div>
        <p>
          <img src="../assets/img/renzheng.png" alt />
          <span>已实名认证</span>
          <span>预览简历</span>
        </p>
        <div class="base-info">
          <div>
            <p>姓名</p>
            <p>
              <img src="../assets/img/jingyan.png" alt />
              <span>4年经验</span>
              <span class="gang">|</span>
              <img src="../assets/img/xueli.png" alt />
              <span>本科</span>
              <span class="gang">|</span>
              <img src="../assets/img/zhuangtai.png" alt />
              <span>离职</span>
            </p>
            <p>
              <img src="../assets/img/dianhua.png" alt />
              <span>13910000000</span>
            </p>
          </div>
          <div>
            <img src="../assets/img/3.png" alt />
            <p>
              <span>编辑</span>
              <img src="../assets/img/bianji.png" alt />
            </p>
          </div>
        </div>
        <div class="base-info-bj">
          <div>编辑个人信息</div>
          <div class="left-input">
            <div>
              <p>姓名</p>
              <input type="text" />
            </div>
            <div>
              <p>性别</p>
              <div>男</div>
              <div>女</div>
            </div>
            <div>
              <p>生日</p>
              <input type="text" disabled="false" />
            </div>
            <div>
              <p>电话</p>
              <input type="text" disabled="false" />
            </div>
          </div>
          <div class="right-input">
            <div>
              <p>当前求职状态</p>
              <input type="text" />
            </div>
            <div>
              <p>开始工作时间</p>
              <input type="text" />
            </div>
            <div>
              <p>微信号</p>
              <input type="text" />
            </div>
            <div>
              <p>邮箱</p>
              <input type="text" />
            </div>
          </div>
          <div>
            <div class="base-submit">完成</div>
            <div class="base-cancel">取消</div>
          </div>
        </div>
        <div class="youshi">
          <div>个人优势</div>
          <div>
            <div>个人优势说明</div>
            <div>
              <img src="../assets/img/bianji.png" alt />
              <span>编辑</span>
            </div>
          </div>
        </div>
        <div class="youshi-bj" style="padding: 0 54px">
          <p>编辑个人优势</p>
          <textarea name id cols="30" rows="10"></textarea>
          <div>
            <div class="ys-submit">完成</div>
            <div class="ys-cancel">取消</div>
          </div>
        </div>
        <div class="qiwang">
          <div>
            期望职位
            <span>
              <img src="../assets/img/add.png" alt />
              <span>添加</span>
            </span>
          </div>
          <div>
            <img src="../assets/img/zhiwei.png" alt />
            <span>工程师</span>
            <span>|</span>
            <img src="../assets/img/xinzi.png" alt />
            <span>1-9K</span>
            <span>|</span>
            <img src="../assets/img/hangye.png" alt />
            <span>O2O</span>
            <span>|</span>
            <img src="../assets/img/weizhi.png" alt />
            <span>北京</span>
          </div>
        </div>
        <div class="qiwang-bj" style="padding: 0 54px">
          <p>编辑工作经历</p>
          <div>
            <div>
              <p>期望职位</p>
              <input type="text" />
            </div>
            <div>
              <p>薪资要求</p>
              <input type="text" />
            </div>
            <div>
              <p>行业</p>
              <input type="text" />
            </div>
            <div>
              <p>城市</p>
              <input type="text" />
            </div>
          </div>
          <div>
            <div class="qw-submit">完成</div>
            <div class="qw-cancel">取消</div>
          </div>
        </div>
        <div class="zhiwei">
          <div>
            工作经历
            <span>
              <img src="../assets/img/add.png" alt />
              <span>添加</span>
            </span>
          </div>
          <div>
            <div>
              <span>公司名称</span>
              <span>至今</span>
              <span>
                <img src="../assets/img/bianji.png" alt />
                <span>编辑</span>
              </span>
            </div>
            <div>担任职位</div>
            <div>
              <div>内容:</div>
              <div></div>
            </div>
          </div>
          <ul>
            <li>标签</li>
            <li>标签</li>
            <li>标签</li>
          </ul>
        </div>
        <div class="zhiwei-bj" style="padding: 0 54px">
          <p>编辑工作经历</p>
          <div>
            <p>公司名称</p>
            <input type="text" />
          </div>
          <div>
            <p>所属行业</p>
            <input type="text" />
          </div>
          <div>
            <p>所属部门（选填）</p>
            <input type="text" />
          </div>
          <div>
            <p>在职时间</p>
            <div>
              <div style="width:132px">2013-3-3</div>
              <div style="width: 35px;text-align:center;">至</div>
              <div style="width:132px">2013-3-3</div>
            </div>
          </div>
          <div>
            <p>技能标签</p>
            <input type="text" />
          </div>
          <div>
            <p>工作内容</p>
            <textarea name id cols="30" rows="10"></textarea>
          </div>
          <div>
            <p>工作业绩（选填）</p>
            <textarea name id cols="30" rows="10"></textarea>
          </div>
          <div>
            <img src="../assets/img/cur3.png" alt />
            <span>对该公司隐藏我的简历</span>
          </div>
          <div>
            <div class="zw-submit">完成</div>
            <div class="zw-cancel">取消</div>
          </div>
        </div>
        <div class="jingli">
          <div>
            项目经历
            <span>
              <img src="../assets/img/add.png" alt />
              <span>添加</span>
            </span>
          </div>
        </div>
        <div class="jingli-bj" style="padding: 0 54px">
          <p>编辑项目经历</p>
          <div>
            <div>
              <p>项目名称</p>
              <input type="text" />
            </div>
            <div>
              <p>担任角色</p>
              <input type="text" />
            </div>
          </div>
          <div>
            <p>项目开始时间</p>
            <div style="overflow: hidden">
              <div style="width:132px">2013-3-3</div>
              <div style="width: 35px;text-align:center;">至</div>
              <div style="width:132px">2013-3-3</div>
            </div>
          </div>
          <div>
            <p>项目工作内容</p>
            <textarea name id cols="30" rows="10"></textarea>
          </div>
          <div>
            <div class="jl-submit">完成</div>
            <div class="jl-cancel">取消</div>
          </div>
        </div>
        <div class="jiaoyu">
          <div>
            教育经历
            <span>
              <img src="../assets/img/add.png" alt />
              <span>添加</span>
            </span>
          </div>
          <div>
            <div>
              <span>学校名称</span>
              <span>2018 -2022</span>
              <span>
                <img src="../assets/img/bianji.png" alt />
                <span>编辑</span>
              </span>
            </div>
            <div>
              <span>专业</span>
              <span>学历</span>
            </div>
            <div>
              <div>在校经历:</div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="jiaoyu-bj" style="padding: 0 54px">
          <p>编辑教育经历</p>
          <div>
            <p>学校名称</p>
            <input type="text" />
          </div>
          <div>
            <div>全日制</div>
            <div>非全日制</div>
          </div>
          <p>
            <img src="../assets/img/cur3.png" alt />
            <span>留学经历</span>
          </p>
          <div>
            <p>学历</p>
            <input type="text" />
          </div>
          <div style="padding-top: 0;">
            <p>专业</p>
            <input type="text" />
          </div>
          <div style="width: 100%;">
            <p>时间段</p>
            <div></div>
            <div>至</div>
            <div></div>
          </div>
          <div style="width: 100%;">
            <p>在校经历（选填）</p>
            <textarea name id cols="30" rows="10"></textarea>
          </div>
          <div>
            <div class="jy-submit">完成</div>
            <div class="jy-cancel">取消</div>
          </div>
        </div>
      </div>
      <div class="right-bar">
        <div>
          <p>上传简历</p>
          <div>上传简历</div>
        </div>
        <div>
          <div>
            <div>隐私设置</div>
            <div>开放设置</div>
            <div class="slider">
              <span></span>
            </div>
            <div>隐藏设置</div>
            <div class="slider">
              <span></span>
            </div>
          </div>
          <div>
            <div>接受邀请的职位性质</div>
            <div class="checkbox">
              <input type="checkbox" />
              <span>全职</span>
            </div>
            <div class="checkbox">
              <input type="checkbox" />
              <span>兼职</span>
            </div>
          </div>
          <div></div>
          <div>
            <div>添加屏蔽公司</div>
            <div>（最多3个）</div>
          </div>
          <div class="addgs">
            <img src="../assets/img/-.png" alt />
            <div>公司名称</div>
          </div>
        </div>
        <div>
          <p>更新简历</p>
          <div>更新简历</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyResume',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '../assets/css/resume.css';
</style>