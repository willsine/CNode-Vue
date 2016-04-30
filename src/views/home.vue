<template>
  <slider :show.sync="isShow" class="test" v-bind:class="{'nav-show': isShow, 'nav-hide':!isShow}"></slider>
  <header class="header header-flex" :class="{'nav-show': isShow, 'nav-hide':!isShow}">
    <div class="side-btn-wrap" v-on:click="toggle">
      <div class="side-btn"></div>
    </div>
    <h1 class="title" v-text="tagText"></h1>
    <a class="post-btn" v-link="{path: '/post'}">发表</a>
  </header>
  <div class="content" :class="{'nav-show': isShow, 'nav-hide':!isShow}">
    <ul>
      <li v-for="topic in topics" class="item">
        <div class="topic-header">
          <div class="user-avatar">
            <img class="avatar" v-bind:src="topic.author.avatar_url">
          </div>
          <div class="author">
            <span class="loginname">{{topic.author.loginname}}</span>
            <span class="label" v-if="topic.top">置顶</span>
            <span class="label" v-if="topic.good">精华</span>
            <!-- <span class="label">分享</span> -->
            <p class="time" v-text="topic.create_at | formatPublishTime"></p>
          </div>
        </div>
        <p class="topic-content">{{topic.title}}</p>
        <div class="topic-bottom">
          <div class="pv">
            <span class="icon pv">
              {{topic.visit_count}}
            </span>
          </div>
          <div class="comment">
            <a v-link="{path: '/topic/' + topic.id}">
              <span class="icon comment">
                {{topic.reply_count}}
              </span>
            </a>
          </div>
          <div class="share">
            <span class="icon share">分享</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading" v-if="isLoading">(´・ω・｀)加载中...</div>
  </div>
  <top :is-page-too-long="isPageTooLong"><top>
</template>

<script>
  import slider from '../components/slider.vue';
  import top from '../components/top.vue';
  import {formatPublishTime} from '../filter';
  import {getList} from '../api.js';

  export default {
    components: {slider, top},

    data(){
      return {
        msg: 'Hello Vue',
        isShow: false,
        topics: null,
        tagText: '首页',
        pageNo: 1,
        isLoading: false,
        isPageTooLong: false
      }
    },

    methods: {
      toggle(e) {
        this.isShow = !this.isShow
      },

      featchData(tag, isNewTag) {
        if (!tag) tag = 'all'
        let self = this;
        self.isLoading = true;
        getList(this.pageNo, tag).then(function (data){
          if (isNewTag) {
            self.topics = data.data;
            document.body.scrollTop = 0;
          } else{
            self.topics = self.topics?self.topics.concat((data.data)):data.data;
          }
          self.isLoading = false;
        })
        .catch(function (err){
          self.isLoading = false;
          self.topics = null;
          console.error('获取数据异常', err);
        });
      },

      scroll() {
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.body.scrollTop;
        if((scrollHeight - scrollTop - window.innerHeight) < 60 && !this.isLoading) {
          this.pageNo++;
          this.featchData();
        }

        if (scrollTop > window.innerHeight) {
          this.isPageTooLong = true;
        } else {
          this.isPageTooLong = false;
        }
      },

      backToTop() {
        document.body.scrollTop = 0;
      }
    },

    created() {
      this.featchData();
      window.addEventListener("scroll", this.scroll, false)
    },

    events: {
      'change-tag': function (item) {
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        this.isShow = false;
        this.featchData(item.tag, true);
      }
    },

    filters: {
      formatPublishTime(value) {
        return formatPublishTime(value)
      }
    }
  }
</script>

<style lang="sass">
    @mixin common-slide-btn($height: 2px, $color: #333){
      width: 1.1rem;
      height: $height;
      margin: auto;
      position: relative;
      border-radius: 5px;
      background-color: $color;
    }
    body{
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      font-family: Microsoft YaHei,sans-serif;
      a{
        color: #333;
        text-decoration: none;
        font-size: 14px;
      }
      p{
        margin:0;
        padding:0;
      }
      ul{
        margin: 0;
        padding: 0;
      }
    }
    header{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      height: 2rem;
      line-height: 2rem;
      background-color: #fff;
      transition: all 0.3s ease;
      box-shadow: 0 0 8px rgba(0,0,0,.2);
      .side-btn-wrap {
        display: flex;
        width: 2rem;
        .side-btn {
          @include common-slide-btn;
          &:before {
            @include common-slide-btn;
            content:"";
            display: flex;
            top: -0.35rem;
          };
          &:after {
            @include common-slide-btn;
            content:"";
            display: flex;
            top: 0.25rem;
          }
        }
      }
      h1.title{
        margin: 0;
        padding: 0;
        font-size: 1rem;
        font-weight: 700;
        flex: 1;
        text-align: center;
        color: #333;
      }
      >a{
        width: 2.5rem;
      }
    }
    .content {
      background-color: #f2f2f2;
      padding-top: 2rem;
      transition: all 0.3s ease;
      >ul{
        padding-top: 0.8rem;
        li{
          padding-top: 1rem;
          padding-bottom: 0.5rem;
          list-style:none;
          border-bottom: 1px solid #ccc;
          margin-bottom: 0.8rem;
          background-color: #fff;
          color: rgb(51, 51, 51);
          &.item{
            .topic-header{
              display: flex;
              padding-left: 0.6rem;
              .user-avatar{
                img.avatar{
                  width: 3rem;
                  height: 3rem;
                  border-radius: 2rem;
                }
              }
              .author{
                padding-left: 1rem;
                font-size: 0.9rem;
                span{
                  margin-left: 5px;
                  &.loginname{
                    color: #f68030;
                  }
                  &.label{
                    padding: 1px 5px;
                    color: #1abc9c;
                    font-size: 12px;
                    border: 1px solid #1abc9c;
                  }
                }
                p.time{
                  margin-top: 6px;
                  color: #999;
                  font-size: 13px;
                  padding-left: 5px;
                }
              }
            }
            .topic-content{
              margin: 0.6rem 0;
              padding: 0 0.6rem;
            }
            .topic-bottom{
              display: flex;
              justify-content: space-around;
              border-top: 1px solid #e6e6e6;
              padding-top: 0.5rem;
              .icon{
                display: inline-block;
                padding-left: 1.1rem;
                &.pv{
                  background: url("../assets/images/visit.svg") no-repeat left center;
                  background-size: 15px 15px;
                }
                &.comment{
                  background: url("../assets/images/comment.svg") no-repeat left center;;
                  background-size: 15px 15px;
                }
                &.share{
                  background: url("../assets/images/share.svg") no-repeat left center;;
                  background-size: 15px 15px;
                }
              }
            }
          }
        }
      }
      .loading{
        text-align: center;
        padding: 1rem 0;
      }
    }

</style>