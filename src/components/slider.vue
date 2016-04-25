<template>
  <section class="slide-nav-wrap">
    <ul>
      <li v-for="item in items">
        {{item}}
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data(){
      return {
        items: [
          '全部',
          '精华',
          '问答',
          '招聘'
        ]
      }
    }
  }
</script>

<style lang="sass">
  .slide-nav-wrap{
    display: flex;
    width: 10rem;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 6;
    left: -10rem;
    transition: all 0.3s ease;
    background-color: #2CDAAA;

    ul{
      li{
        list-style:none;
        height: 38px;
        line-height: 38px;
        font-size: 17px;
      }
    }
  }
  .nav-show {
    transform: translateX(10rem);
  }
  .nav-hide {
    transform: translateX(0);
  }
</style>