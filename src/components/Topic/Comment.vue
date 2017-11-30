<template>
  <div class="comment">
    <div class="profile">
      <img class="comment-author" :src="author.avatar_url" @click="avatarHandler"/>
      <div class="message">
        <span class="name">{{author.loginname}}</span>
        <span class="time">发布于:{{create_time}}</span>
      </div>
      <div class="operator">
        <div @click.stop="goodHandler">
          <icon name="good" type="class" :class="{icon: true, active: is_uped}"/>
          <span :style="{'font-size': '14px'}">{{goodNumber}}</span>
        </div>
        <div @click.stop="commentHandler">
          <icon name="comment" type="class" class="icon"/>
        </div>
      </div>
    </div>
    <div class="comment-content">
      <div class="markdown-body" v-html="content">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import moment from 'moment';
  import 'github-markdown-css';
  import {Toast} from 'mint-ui';

  export default {
    name: 'Comment',
    props: {
      author: Object,
      content: String,
      create_at: String,
      id: String,
      is_uped: Boolean,
      reply_id: String,
      ups: Array,
      topic_id: String
    },
    computed: {
      create_time() {
        return moment(this.create_at).fromNow();
      },
      goodNumber() {
        return this.ups.length;
      }
    },
    methods: {
      verityLogin() {
        if (this.login === false) {
          this.$router.push({
            name: 'login'
          });
          return false;
        }
        return true;
      },
      avatarHandler(event) {
        event.stopPropagation();
        this.$router.push({name: 'user', params: {loginname: this.author.loginname}})
      },
      goodHandler() {
        this.$emit('good', this.id);
      },
      commentHandler(){
        if(this.verityLogin()){
          this.$router.push({
            name: 'replyComment',
            params: {
              topic_id: this.topic_id,
              reply_id: this.id
            }
          })
        }
      }
    }
  }
</script>

<style>
  .comment {
    border-bottom: 1px solid #d5dbdb;
    margin-top: 10px;
  }

  .comment > .profile {
    display: flex;
    margin-bottom: 10px;
  }

  .profile > .comment-author {
    flex-basis: 45px;
    margin-right: 10px;
    width: 45px;
    height: 45px;
  }

  .profile > .message {
    flex-grow: 1;
  }

  .profile > .operator {
    flex-basis: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .message > span {
    display: block;
  }

  .message > span :first-child {
    height: 20px;
  }

  .message > span :last-child {
    height: 25px;
  }

  .operator > .icon {
    font-size: 18px;
  }

  .operator .active {
    color: red
  }


</style>
