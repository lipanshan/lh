<template>
  <div class="get-post">
    <div class="main-box">
      <div >
        <p>
          <span>热招职位</span>
          <span>关注职位1</span>
          <span>关注职位2</span>
          <span></span>
        </p>
        <div>
          <div>
            <div>北京</div>
            <img src="../assets/img/down.png" alt />
          </div>
          <div>
            <input type="text" />
          </div>
          <div>
            <div>职位类型</div>
            <img src="../assets/img/down.png" alt />
          </div>
          <div>
            <div>公司行业</div>
            <img src="../assets/img/down.png" alt />
          </div>
          <div>搜索</div>
        </div>
        <div>
          <ul>
            <li>
              <div>工作经验</div>
              <img src="../assets/img/down.png" alt />
            </li>
            <li>
              <div>学历要求</div>
              <img src="../assets/img/down.png" alt />
            </li>
            <li>
              <div>薪资要求</div>
              <img src="../assets/img/down.png" alt />
            </li>
            <li>
              <div>融资阶段</div>
              <img src="../assets/img/down.png" alt />
            </li>
            <li>
              <div>公司规模</div>
              <img src="../assets/img/down.png" alt />
            </li>
          </ul>
          <div>
            <div>
              <img src="../assets/img/cur9@.png" alt />
              <span>兼职</span>
            </div>
            <div>
              <img src="../assets/img/cur9.png" alt />
              <span>全职</span>
            </div>
          </div>
          <div>清空筛选条件</div>
        </div>
      </div>
      <div class="work-list">
        <ul>
          <li>
            <div>
              <img src="../assets/img/xcx.png" alt />
              <div>
                <p>职位名称</p>
                <p>北京 | 北京 | 北京</p>
              </div>
            </div>
            <div>
              <p>1.5-1.6K 13薪</p>
              <p>公司名称 | 规模 | 融资</p>
            </div>
            <div>
              <div>领取职位</div>
              <div>
                <img src="../assets/img/dengji.png" alt />
                猎头等级
              </div>
            </div>
          </li>
        </ul>
        <div>
          <img src="../assets/img/shang.png" alt />
          <ul>
            <li class="cur">1</li>
            <li>2</li>
            <li>3</li>
            <li>...</li>
          </ul>
          <img src="../assets/img/xia.png" alt />
        </div>
        <img class="no-data" src="../assets/img/no-data.png" alt />
        <p>暂无您查找的数据</p>
      </div>
      <div class="right-bar">
        <p>浏览记录</p>
        <div>09:20</div>
        <div>
          <div>
            <p>公司名称</p>
            <p>城市 城区 | 工龄 | 学历</p>
          </div>
          <div>
            <p>1.6-2.0K 13薪 奖金</p>
            <p>公司名称 | 规模 | 融资、资质</p>
          </div>
          <div>猎头名称</div>
        </div>

        <span>暂无已查看职位</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getPost'
}
</script>

<style lang="scss">
@import '../assets/css/position.css';
</style>