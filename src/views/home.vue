<template>
  <slider v-if="isShow" class="test nav-show"></slider>
  <div class="content" v-bind:class="{'nav-show': !show, 'nav-hide':show}">
    <header class="header header-flex">
      <div class="side-btn-wrap" v-on:click="toggle">
        <div class="side-btn">菜单图标</div>
      </div>
      <h1 class="title" v-text="tagText"></h1>
      <a class="post-btn" v-link="{path: '/post'}">发表</a>
    </header>
    <ul>
      <li v-for="topic in topics" class="item">
        <img v-bind:src="topic.author.avatar_url">
        <span>{{topic.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import slider from '../components/slider.vue';

  import {getList} from '../api.js';

  export default {
  components: {slider},
    data(){
      return {
        msg: 'Hello Vue',
        isShow: true,
        topics: null
      }
    },
    methods: {
      toggle(e) {
        this.isShow = !this.isShow
      },

      featchData() {
        let self = this;
        getList(1, 'good').then(function (data){
          console.log(data);
          self.topics = data.data;
        })
      }
    },

    created() {
      this.featchData()
    }
  }
</script>

<style lang="sass">
    .content {
      background-color: #fff;
      >ul{
        li{
          list-style:none;
          border-bottom: 1px solid #ccc;
        }
      }
    }
</style>