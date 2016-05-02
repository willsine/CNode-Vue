<template>
  <header class="header header-flex topic-header">
    <a class="back-btn-wrap" v-link="{path: '/'}">
      <i class="back-btn"></i>
    </a>
    <h3 class="title">帖子正文</h2>
  </header>
  <div class="content topic-content">
    <div class="topic-title-wrap">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <div class="author-wrap">
        <img class="avatar" :src="topic.author.avatar_url">
        <span class="author" v-text="topic.author.loginname"></span>
        <span> · </span>
        <span class="time" v-text="topic.create_at | formatPublishTime"></span>
      </div>
    </div>
    <div class="topic-detail" v-html="topic.content"></div>
    <load :show-loading="showLoading" :load-msg="loadMsg"></load>
  </div>
  <div class="reply-wrap">
    <ul class="replies">
      <li class="reply" v-for="reply in topic.replies">
        <div class="avatar">
          <img :src="reply.author.avatar_url">
        </div>
        <div class="reply-content">
          <div class="author" v-text="reply.author.loginname"></div>
          <div class="comment" v-html="reply.content"></div>
          <div class="reply-bottom">
            <span class="comment-time" v-text="reply.create_at | formatPublishTime"></span>
            <span class="like"></span>
            <span class="like-cont" v-text="reply.ups.length + '赞'"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <top :is-page-too-long="isPageTooLong"><top>
</template>

<script>
  import top from '../components/top.vue';
  import load from '../components/loading.vue';
  import {formatPublishTime} from '../filter';
  import {getTopic} from '../api.js';

  export default {
    components: {top, load},

    data(){
      return {
        topic: null,
        isPageTooLong: false,
        showLoading: true,
        loadMsg: '加载中...'
      }
    },

    methods: {
      getTopicData(id) {
        let self = this;
        getTopic(id).then(function (data){
          self.topic = data.data;
          self.showLoading = false;

        })
        .catch(function (err){
          self.showLoading = false;
          self.topic = null;
          if (isNewTag) self.loadMsg = '载入失败啦...'
          console.error('获取数据异常', err);
        });
      },

      scroll() {
        if (document.body.scrollTop > window.innerHeight) {
          this.isPageTooLong = true;
        } else {
          this.isPageTooLong = false;
        }
      }
    },

    created() {
      this.getTopicData(this.$route.params.topicId);
      window.addEventListener("scroll", this.scroll, false)
    },

    filters: {
      formatPublishTime(value) {
        return formatPublishTime(value)
      }
    }
  }
</script>

<style lang="sass">
  .topic-header{
    .back-btn-wrap{
      position: absolute;
      left: 0;
      top: 0;
      width: 2rem;
      height: 2rem;
      background: url("../assets/images/back.svg") no-repeat 0.3rem center;
      background-size: 26px 26px;
    }
    h3{
      flex: 1;
      margin: 0;
      padding: 0;
      text-align: center;
      font-size: 1rem;
      font-weight: 500;
    }
  }
  .topic-content{
    background-color: #fff;
    border-bottom: 1px solid #f1f1f3;
    .topic-title-wrap{
      >h2{
        margin: 0.5rem 0;
        font-size: 1.1rem;
        color: #333;
        padding: 3px 12px;
      }
      .author-wrap{
        padding-left: 12px;
        >img{
          width: 3rem;
          height: 3rem;
          border-radius: 2rem;
          display: inline-block;
          vertical-align: middle;
        }
        >span{
          color: #999;
          font-size: 0.8rem;
        }
      }
    }
    .topic-detail{
      padding: .5rem .8rem;
      font-size: 15px;
      p{
        margin: .8rem auto;
      }
      h1, h2, h3, h4, h5{
        color: #666;
        margin: .5rem auto .5rem;
      }
      img{
        width: 100%;
        margin: 1rem auto .5rem;
      }
      .markdown-text{
        a {
          color: #225d99;
          word-break: break-word;
        }
      }
    }
  }
  .reply-wrap {
    ul.replies{
      padding-top: 1rem;
      padding-bottom: 2rem;
      >li{
        display: flex;
        justify-content: space-between;
        padding: 1rem 0.8rem 0px;
        border-bottom: 1px solid #f1f2f3;
        .avatar{
          img{
            width: 2rem;
            border-radius: 2rem;
          }
        }
        .reply-content {
          flex: 1;
          padding-left: 1rem;
          font-size: 14px;
          color: #333;
          .comment{
            padding: 10px 0;
            .markdown-text{
              img{
                width: 100%;
              }
            }
          }
          .reply-bottom{
            color: #888;
            padding-bottom: 10px;
            padding-right: 1rem;
            display: flex;
            justify-content: space-between;
            .like{
              display: inline-block;
              width: 1.2rem;
              height: 1.2rem;
              background: url("../assets/images/like.svg") no-repeat 0.3rem center;
              background-size: 16px 16px;
            }
          }
          blockquote {
            padding-left: 8px;
            border-left: 4px solid #e2e3e4;
          }
        }
      }
    }
  }
</style>