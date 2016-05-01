<template>
  <section class="slide-nav-wrap">
    <ul class="nav-menu">
      <li v-for="item in items" v-on:click="switchTag(item, $event)">
        {{item.val}}
      </li>
    </ul>
    <ul class="nav-bottmo">
      <li>消息</li>
      <li>关于</li>
    </l>
  </section>
</template>

<script>
  export default {
    data(){
      return {
        items: [
          {
            tag: 'all',
            val: '全部'
          },
          {
            tag: 'good',
            val: '精华'
          },
          {
            tag: 'share',
            val: '分享'
          },
          {
            tag: 'ask',
            val: '问答'
          },
          {
            tag: 'job',
            val: '招聘'
          }
        ]
      }
    },
    methods: {
      switchTag(item, e) {
        this.$dispatch('change-tag', item);
      }
    }
  }
</script>

<style lang="sass">
  .slide-nav-wrap{
    display: flex;
    flex-direction: column;
    width: 10rem;
    height: 100%;
    position: fixed;
    top: 0;
    padding-top: 0.5rem;
    background: url("../assets/images/bg.png") 100%;
    z-index: 6;
    left: -10rem;
    transition: all 0.3s ease;
    ul{
      color: #fff;
      border-bottom: 1px solid #626262;
      margin: 0;
      padding: 0;
      margin-left: 1rem;
      margin-top: 1rem;
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
    transform: translateX(0rem);
  }
</style>