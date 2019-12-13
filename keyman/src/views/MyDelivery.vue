<template>
  <div class="my-delivery">
    <div class="send-box">
      <div class="head">
        <div class="cur">全部投递</div>
        <div>置顶职位</div>
        <div>不感兴趣</div>
      </div>
      <div class="send-info">
        <ul>
          <li>
            <img src alt />
            <div>
              <p>
                名字 I HR
                <span class="stop" style="margin-left:20px ;">停止招聘</span>
                <span class="pass">不感兴趣</span>
              </p>
              <div>
                <div>
                  <p>
                    招聘职位
                    <span style="color: #FD877D;">5-6K</span>
                  </p>
                  <p>城市 城区 I 工龄 I 学历</p>
                </div>
                <div>
                  <p>公司名称</p>
                  <p>公司名称 规模 I 融资、资质</p>
                  <img src alt />
                </div>
                <span>进入沟通</span>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDelivery'
}
</script>

<style lang="scss">
@import '../assets/css/send-work.css';
</style>