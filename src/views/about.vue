<template>
  <header class="header about-header topic-header">
    <a class="back-btn-wrap" v-link="{path: '/'}">
      <i class="back-btn"></i>
    </a>
    <h1 class="title">关于</h2>
  </header>
  <div class="content about-content">
    <div class="about-list">
      <div>
        <h3>项目说明:</h3>
        <p>
          本项目的数据来源于
          <a class="source" href='https://cnodejs.org/'>cnode.org </a>
          社区API
        </p>
        <p>使用Vue.js + webpack + ES2015 构建而成。</p>
      </div>
      <div>
        <h3>项目地址:</h3>
        <p>
          <a href='https://github.com/willsine/CNode-Vue'>https://github.com/willsine/CNode-Vue</a>
          <br>
          欢迎star (●'ω'●)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="sass">
  .about-content{
    background-color: #fff;
    padding: 2rem 1rem;
    .about-list{
      a{
        color: #22c37b;
        &.source{
          font-size: 1rem;
        }
      }
    }
  }

</style>
